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
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

// 데이터 타입 정의
interface CouponData {
  id: number;
  name: string;
  discountAmount: number;
}

// 샘플 데이터
const data: CouponData[] = [
  { id: 1, name: "대충 쿠폰", discountAmount: 100 },
  { id: 2, name: "ㅇㅇ", discountAmount: 1000 },
  { id: 3, name: "Bob Johnson", discountAmount: 2000 },
];

// 컬럼 정의
export const columns: ColumnDef<CouponData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()} // 전체 행 선택 상태 확인
        onCheckedChange={
          () => table.toggleAllRowsSelected(!table.getIsAllRowsSelected()) // 전체 선택/해제
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()} // 개별 행 선택 상태
        onCheckedChange={() => row.toggleSelected()} // 개별 행 선택/해제
      />
    ),
    enableSorting: false, // 체크박스는 정렬 불필요
    enableHiding: false, // 체크박스 열 숨기지 않음
  },
  {
    accessorKey: "name",
    header: "쿠폰명",
    cell: ({ row }) => row.getValue("name"),
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
  },
];

export default function Coupon() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
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

  // 선택된 행들의 할인 총액 계산
  const selectedRows = table.getSelectedRowModel().rows;
  const totalDiscountPrice = selectedRows.reduce(
    (total, row) => total + row.original.discountAmount,
    0
  );

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
                <TableCell className="font-medium text-lg" colSpan={2}>
                  총 할인 금액: {totalDiscountPrice.toLocaleString()}원
                </TableCell>
                <TableCell className="text-right">
                  <Button>쿠폰 적용하기</Button>
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
    </div>
  );
}
