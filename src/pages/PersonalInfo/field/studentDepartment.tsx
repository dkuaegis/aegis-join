import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Department } from "@/types/api/member";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface StudentDepartmentProps {
  name: string; // name prop 추가
}

export const StudentDepartment = forwardRef<
  HTMLDivElement,
  StudentDepartmentProps
>(({ name, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const { field, error, isValid } = useControllerField({ name });

  const defaultDepartmentLabel =
    departments.find((dept) => dept.value === field.value)?.label ||
    "학과 선택";

  // CommandItem 스타일(검색창)
  const commandItemStyle = {
    whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
    overflow: "hidden", // 넘치는 텍스트 숨김
    textOverflow: "ellipsis", // 말줄임표 표시
  };

  return (
    <div className="space-y-2" {...props} ref={ref}>
      <Label htmlFor="department">소속</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <button
              type="button"
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error && !isValid ? "border-red-500" : "",
                open && "ring-2 ring-ring ring-offset-2"
              )}
            >
              {defaultDepartmentLabel}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="학과를 검색해주세요." />
            <CommandList>
              <CommandEmpty>존재하지 않는 학과입니다.</CommandEmpty>
              <CommandGroup>
                {departments.map((departmentItem) => (
                  <CommandItem
                    key={departmentItem.value}
                    value={departmentItem.value}
                    onSelect={(currentValue) => {
                      field.onChange(currentValue as Department);
                      setOpen(false);
                    }}
                    style={commandItemStyle}
                  >
                    {field.value === departmentItem.value ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <div className="mr-2 h-4 w-4" />
                    )}
                    {departmentItem.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && !isValid && (
        <p className="text-red-500 text-xs">학과를 선택해주세요</p>
      )}
    </div>
  );
});

StudentDepartment.displayName = "StudentDepartment";

// 학과 필드 배열
const departments = [
  {
    value: "SW융합대학_소프트웨어학과",
    label: "SW융합대학 소프트웨어학과",
  },
  {
    value: "SW융합대학_컴퓨터공학과",
    label: "SW융합대학 컴퓨터공학과",
  },
  {
    value: "SW융합대학_모바일시스템공학과",
    label: "SW융합대학 모바일시스템공학과",
  },
  {
    value: "SW융합대학_사이버보안학과",
    label: "SW융합대학 사이버보안학과",
  },
  {
    value: "SW융합대학_통계데이터사이언스학과",
    label: "SW융합대학 통계데이터사이언스학과",
  },
  {
    value: "SW융합대학_SW융합학부",
    label: "SW융합대학 SW융합학부",
  },
  {
    value: "퇴계혁신칼리지_SW융합계열광역",
    label: "퇴계혁신칼리지 SW융합계열광역",
  },
  {
    value: "퇴계혁신칼리지_광역",
    label: "퇴계혁신칼리지 광역",
  },
  {
    value: "퇴계혁신칼리지_공학계열광역",
    label: "퇴계혁신칼리지 공학계열광역",
  },
  {
    value: "퇴계혁신칼리지_인문계열광역",
    label: "퇴계혁신칼리지 인문계열광역",
  },
  {
    value: "퇴계혁신칼리지_사회계열광역",
    label: "퇴계혁신칼리지 사회계열광역",
  },
  {
    value: "공과대학_전자전기공학과",
    label: "공과대학 전자전기공학과",
  },
  {
    value: "공과대학_융합반도체공학과",
    label: "공과대학 융합반도체공학과",
  },
  {
    value: "공과대학_고분자시스템공학부_고분자공학전공",
    label: "공과대학 고분자시스템공학부 고분자공학전공",
  },
  {
    value: "공과대학_고분자시스템공학부_파이버융합소재공학전공",
    label: "공과대학 고분자시스템공학부 파이버융합소재공학전공",
  },
  {
    value: "공과대학_토목환경공학과",
    label: "공과대학 토목환경공학과",
  },
  {
    value: "공과대학_기계공학과",
    label: "공과대학 기계공학과",
  },
  {
    value: "공과대학_화학공학과",
    label: "공과대학 화학공학과",
  },
  {
    value: "공과대학_건축학부_건축학전공_5년제",
    label: "공과대학 건축학부 건축학전공(5년제)",
  },
  {
    value: "공과대학_건축학부_건축공학전공",
    label: "공과대학 건축학부 건축공학전공",
  },
  {
    value: "문과대학_국어국문학과",
    label: "문과대학 국어국문학과",
  },
  {
    value: "문과대학_사학과",
    label: "문과대학 사학과",
  },
  {
    value: "문과대학_철학과",
    label: "문과대학 철학과",
  },
  {
    value: "문과대학_영미인문학과",
    label: "문과대학 영미인문학과",
  },
  {
    value: "법과대학_법학과",
    label: "법과대학 법학과",
  },
  {
    value: "사회과학대학_정치외교학과",
    label: "사회과학대학 정치외교학과",
  },
  {
    value: "사회과학대학_행정학과",
    label: "사회과학대학 행정학과",
  },
  {
    value: "사회과학대학_도시계획부동산학부",
    label: "사회과학대학 도시계획·부동산학부",
  },
  {
    value: "사회과학대학_미디어커뮤니케이션학부",
    label: "사회과학대학 미디어커뮤니케이션학부",
  },
  {
    value: "사회과학대학_상담학과",
    label: "사회과학대학 상담학과",
  },
  {
    value: "경영경제대학_무역학과",
    label: "경영경제대학 무역학과",
  },
  {
    value: "경영경제대학_경영학부_경영학전공",
    label: "경영경제대학 경영학부 경영학전공",
  },
  {
    value: "경영경제대학_경영학부_회계학전공",
    label: "경영경제대학 경영학부 회계학전공",
  },
  {
    value: "경영경제대학_글로벌경영학과",
    label: "경영경제대학 글로벌경영학과",
  },
  {
    value: "경영경제대학_산업경영학과_야",
    label: "경영경제대학 산업경영학과(야)",
  },
  {
    value: "경영경제대학_경제학과",
    label: "경영경제대학 경제학과",
  },
  {
    value: "사범대학_한문교육과",
    label: "사범대학 한문교육과",
  },
  {
    value: "사범대학_특수교육과",
    label: "사범대학 특수교육과",
  },
  {
    value: "사범대학_수학교육과",
    label: "사범대학 수학교육과",
  },
  {
    value: "사범대학_과학교육과",
    label: "사범대학 과학교육과",
  },
  {
    value: "사범대학_체육교육과",
    label: "사범대학 체육교육과",
  },
  {
    value: "음악예술대학_공연영화학부_영화전공",
    label: "음악예술대학 공연영화학부 영화전공",
  },
  {
    value: "음악예술대학_공연영화학부_연극전공",
    label: "음악예술대학 공연영화학부 연극전공",
  },
  {
    value: "음악예술대학_공연영화학부_뮤지컬전공",
    label: "음악예술대학 공연영화학부 뮤지컬전공",
  },
  {
    value: "음악예술대학_도예과",
    label: "음악예술대학 도예과",
  },
  {
    value: "음악예술대학_디자인학부_커뮤니케이션디자인전공",
    label: "음악예술대학 디자인학부 커뮤니케이션디자인전공",
  },
  {
    value: "음악예술대학_디자인학부_패션산업디자인전공",
    label: "음악예술대학 디자인학부 패션산업디자인전공",
  },
  {
    value: "음악예술대학_무용과",
    label: "음악예술대학 무용과",
  },
  {
    value: "음악예술대학_음악학부_피아노전공",
    label: "음악예술대학 음악학부 피아노전공",
  },
  {
    value: "음악예술대학_음악학부_관현악전공",
    label: "음악예술대학 음악학부 관현악전공",
  },
  {
    value: "음악예술대학_음악학부_성악전공",
    label: "음악예술대학 음악학부 성악전공",
  },
  {
    value: "음악예술대학_음악학부_작곡전공",
    label: "음악예술대학 음악학부 작곡전공",
  },
  {
    value: "음악예술대학_음악학부_국악전공",
    label: "음악예술대학 음악학부 국악전공",
  },
  {
    value: "외국어대학_아시아중동학부_중국학전공",
    label: "외국어대학 아시아중동학부 중국학전공",
  },
  {
    value: "외국어대학_아시아중동학부_일본학전공",
    label: "외국어대학 아시아중동학부 일본학전공",
  },
  {
    value: "외국어대학_아시아중동학부_몽골학전공",
    label: "외국어대학 아시아중동학부 몽골학전공",
  },
  {
    value: "외국어대학_아시아중동학부_중동학전공",
    label: "외국어대학 아시아중동학부 중동학전공",
  },
  {
    value: "외국어대학_아시아중동학부_베트남학전공",
    label: "외국어대학 아시아중동학부 베트남학전공",
  },
  {
    value: "외국어대학_유럽중남미학부_독일학전공",
    label: "외국어대학 유럽중남미학부 독일학전공",
  },
  {
    value: "외국어대학_유럽중남미학부_프랑스학전공",
    label: "외국어대학 유럽중남미학부 프랑스학전공",
  },
  {
    value: "외국어대학_유럽중남미학부_스페인중남미학전공",
    label: "외국어대학 유럽중남미학부 스페인중남미학전공",
  },
  {
    value: "외국어대학_유럽중남미학부_러시아학전공",
    label: "외국어대학 유럽중남미학부 러시아학전공",
  },
  {
    value: "외국어대학_유럽중남미학부_포르투갈브라질학전공",
    label: "외국어대학 유럽중남미학부 포르투갈브라질학전공",
  },
  {
    value: "외국어대학_영어과",
    label: "외국어대학 영어과",
  },
  {
    value: "외국어대학_글로벌한국어과",
    label: "외국어대학 글로벌한국어과",
  },
  {
    value: "공공인재대학_공공정책학과",
    label: "공공인재대학 공공정책학과",
  },
  {
    value: "공공인재대학_공공정책학과_야",
    label: "공공인재대학 공공정책학과(야)",
  },
  {
    value: "공공인재대학_해병대군사학과",
    label: "공공인재대학 해병대군사학과",
  },
  {
    value: "공공인재대학_식품자원경제학과",
    label: "공공인재대학 식품자원경제학과",
  },
  {
    value: "공공인재대학_사회복지학과",
    label: "공공인재대학 사회복지학과",
  },
  {
    value: "보건과학대학_보건행정학과",
    label: "보건과학대학 보건행정학과",
  },
  {
    value: "과학기술대학_수학과",
    label: "과학기술대학 수학과",
  },
  {
    value: "과학기술대학_물리학과",
    label: "과학기술대학 물리학과",
  },
  {
    value: "과학기술대학_화학과",
    label: "과학기술대학 화학과",
  },
  {
    value: "과학기술대학_식품영양학과",
    label: "과학기술대학 식품영양학과",
  },
  {
    value: "과학기술대학_신소재공학과",
    label: "과학기술대학 신소재공학과",
  },
  {
    value: "과학기술대학_에너지공학과",
    label: "과학기술대학 에너지공학과",
  },
  {
    value: "과학기술대학_경영공학과",
    label: "과학기술대학 경영공학과",
  },
  {
    value: "과학기술대학_제약공학과",
    label: "과학기술대학 제약공학과",
  },
  {
    value: "간호대학_간호학과",
    label: "간호대학 간호학과",
  },
  {
    value: "바이오융합대학_생명자원학부_식량생명공학전공",
    label: "바이오융합대학 생명자원학부 식량생명공학전공",
  },
  {
    value: "바이오융합대학_생명자원학부_동물생명공학전공",
    label: "바이오융합대학 생명자원학부 동물생명공학전공",
  },
  {
    value: "바이오융합대학_생명자원학부_환경원예학전공",
    label: "바이오융합대학 생명자원학부 환경원예학전공",
  },
  {
    value: "바이오융합대학_생명자원학부_녹지조경학전공",
    label: "바이오융합대학 생명자원학부 녹지조경학전공",
  },
  {
    value: "바이오융합대학_의생명과학부_의생명시스템학전공",
    label: "바이오융합대학 의생명과학부 의생명시스템학전공",
  },
  {
    value: "바이오융합대학_의생명과학부_생명과학전공",
    label: "바이오융합대학 의생명과학부 생명과학전공",
  },
  {
    value: "바이오융합대학_의생명과학부_미생물학전공",
    label: "바이오융합대학 의생명과학부 미생물학전공",
  },
  {
    value: "바이오융합대학_식품공학과",
    label: "바이오융합대학 식품공학과",
  },
  {
    value: "바이오융합대학_코스메디컬소재학과",
    label: "바이오융합대학 코스메디컬소재학과",
  },
  {
    value: "보건과학대학_임상병리학과",
    label: "보건과학대학 임상병리학과",
  },
  {
    value: "보건과학대학_물리치료학과",
    label: "보건과학대학 물리치료학과",
  },
  {
    value: "보건과학대학_치위생학과",
    label: "보건과학대학 치위생학과",
  },
  {
    value: "보건과학대학_심리치료학과",
    label: "보건과학대학 심리치료학과",
  },
  {
    value: "예술대학_미술학부_공예금속섬유전공",
    label: "예술대학 미술학부 공예(금속·섬유)전공",
  },
  {
    value: "예술대학_미술학부_동양화전공",
    label: "예술대학 미술학부 동양화전공",
  },
  {
    value: "예술대학_미술학부_서양화전공",
    label: "예술대학 미술학부 서양화전공",
  },
  {
    value: "예술대학_미술학부_조소전공",
    label: "예술대학 미술학부 조소전공",
  },
  {
    value: "예술대학_문예창작과",
    label: "예술대학 문예창작과",
  },
  {
    value: "예술대학_뉴뮤직학부",
    label: "예술대학 뉴뮤직학부",
  },
  {
    value: "스포츠과학대학_생활체육학과",
    label: "스포츠과학대학 생활체육학과",
  },
  {
    value: "스포츠과학대학_스포츠경영학과",
    label: "스포츠과학대학 스포츠경영학과",
  },
  {
    value: "스포츠과학대학_국제스포츠학부_국제스포츠전공",
    label: "스포츠과학대학 국제스포츠학부 국제스포츠전공",
  },
  {
    value: "스포츠과학대학_국제스포츠학부_태권도전공",
    label: "스포츠과학대학 국제스포츠학부 태권도전공",
  },
  {
    value: "스포츠과학대학_국제스포츠학부_운동처방재활전공",
    label: "스포츠과학대학 국제스포츠학부 운동처방재활전공",
  },
  {
    value: "스포츠과학대학_국제스포츠학부_골프전공",
    label: "스포츠과학대학 국제스포츠학부 골프전공",
  },
  {
    value: "의과대학_의예과",
    label: "의과대학 의예과",
  },
  {
    value: "치과대학_치의예과",
    label: "치과대학 치의예과",
  },
  {
    value: "약학대학_약학과",
    label: "약학대학 약학과",
  },
];
