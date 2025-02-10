import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CouponData } from "@/types/api/coupon";
import { LoadingState } from "@/types/state/loading";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import NavigationButtons from "../../ui/custom/navigationButton";

// 컬럼 정의
export const columns: ColumnDef<CouponData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={() =>
          table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "couponName",
    header: "쿠폰명",
    cell: ({ row }) => row.getValue("couponName"),
    meta: {
      style: { width: "150px" },
    },
  },
  {
    accessorKey: "discountAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        할인되는 금액 <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue<number>("discountAmount").toLocaleString(),
    meta: {
      style: {
        minWidth: "150px",
        maxWidth: "150px",
        minHeight: "150px",
        maxHeight: "150px",
      }, // 최소 및 최대 너비 설정
    },
  },
];

export default function Coupon({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [coupons] = useState<CouponData[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  console.log(onNext, onPrev);

  //쿠폰이 없으면 validate true.

  const table = useReactTable({
    data: coupons,
    columns,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  });

  const postCoupon = async () => {
    if (loading === LoadingState.LOADING) return;

    setLoading(LoadingState.LOADING);

    const payload = selectedCoupons;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments`,
        {
          // credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("에러남");
      }
      setLoading(LoadingState.SUCCESS);
    } catch (err: unknown) {
      setLoading(LoadingState.ERROR);
    }

    setTimeout(() => setLoading(LoadingState.IDLE), 1500);
  };

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection) // 선택된 행 ID 가져오기
      .filter((key) => rowSelection[key]) // 선택된 행 필터링
      .map((key) => {
        const row = table.getRowModel().rows.find((r) => r.id === key); // 행 데이터 찾기
        return row?.original.issuedCouponId; // 해당 행의 `issuedCouponId` 반환
      })
      .filter((id): id is number => id !== undefined); // 유효한 값만 필터링

    setSelectedCoupons(selectedRowIds);
  }, [rowSelection, table]);

  const totalDiscountPrice = selectedCoupons.reduce((total, couponID) => {
    const coupon = coupons.find((c) => c.issuedCouponId === couponID);
    return total + (coupon?.discountAmount || 0);
  }, 0);

  const hasRows = table.getRowModel().rows.length > 0; // 데이터 존재 여부 확인

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">쿠폰함</h3>
      <Table>
        {hasRows && ( // 데이터가 있을 때만 헤더 렌더링
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {hasRows ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => row.toggleSelected()} // 클릭 시 선택 토글
                  className="cursor-pointer"
                  style={{ height: "40px" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* 총 할인 금액과 버튼 추가 */}
              <TableRow>
                <TableCell
                  className="font-medium text-lg"
                  colSpan={2}
                  style={{ overflow: "hidden", width: "100%", height: "100%" }}
                >
                  총 할인 금액: {totalDiscountPrice.toLocaleString()}원
                </TableCell>
                <TableCell className="text-right">
                  {coupons.length > 0 && (
                    <Button onClick={postCoupon}>쿠폰 사용하기</Button>
                  )}
                </TableCell>
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-xl"
              >
                쿠폰이 없습니다. 다음 버튼을 눌러주세요.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="items-center text-2xl">{CouponMessage(loading)}</p>
      <NavigationButtons prev={onPrev} next={onNext} />
    </div>
  );
}

const CouponMessage = (loading: LoadingState) => {
  switch (loading) {
    case LoadingState.SUCCESS:
      return "쿠폰이 적용되었습니다!";
    case LoadingState.ERROR:
      return "쿠폰 적용이 실패하였습니다.";
    default:
      return null;
  }
};
