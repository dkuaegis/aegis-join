import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { formatPhoneNumber } from "../utils/PersonalInfo.helper";

//학과 필드 배열
const departments = [
  { value: "SOFTWARE_ENGINEERING", label: "SW융합대학 소프트웨어학과" },
  { value: "COMPUTER_ENGINEERING", label: "SW융합대학 컴퓨터공학과" },
  {
    value: "MOBILE_SYSTEM_ENGINEERING",
    label: "SW융합대학 모바일시스템공학과",
  },
  { value: "CYBER_SECURITY", label: "SW융합대학 사이버보안학과" },
  {
    value: "STATISTICS_DATA_SCIENCE",
    label: "SW융합대학 통계데이터사이언스학과",
  },
  { value: "SW_CONVERGENCE_DIVISION", label: "SW융합대학 SW융합학부" },
];

//학년 필드 배열
const grades = [
  { value: "ONE", label: "1학년" },
  { value: "TWO", label: "2학년" },
  { value: "THREE", label: "3학년" },
  { value: "FOUR", label: "4학년" },
  { value: "FIVE", label: "5학년" },
];

function PersonalInfo({
  setSenderName,
  onNext,
  onPrev,
}: {
  setSenderName: Dispatch<SetStateAction<string>>;
  onNext: () => void;
  onPrev: () => void;
}) {
  console.log(onNext, onPrev);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<string>("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [academicStatus, setAcademicStatus] = useState("");
  const [grade, setGrade] = useState("");
  const [academicSemester, setAcademicSemester] = useState("");

  const [phoneNumberError] = useState<string | null>(null);

  const formValuesRef = useRef({
    name,
    birthDate,
    gender,
    studentId,
    phoneNumber,
    department,
    academicStatus,
    grade,
    academicSemester,
  });

  const [errors] = useState({
    name: false,
    birthDate: false,
    gender: false,
    studentId: false,
    phoneNumber: false,
    department: false,
    academicStatus: false,
    grade: false,
    academicSemester: false,
  });

  useEffect(() => {
    setSenderName(`${name}${studentId.slice(-6)}`);
  }, [name, studentId, setSenderName]);

  useEffect(() => {
    // Update the formValuesRef whenever the state changes
    formValuesRef.current = {
      name,
      birthDate,
      gender,
      studentId,
      phoneNumber,
      department,
      academicStatus,
      grade,
      academicSemester,
    };
  }, [
    name,
    birthDate,
    gender,
    studentId,
    phoneNumber,
    department,
    academicStatus,
    grade,
    academicSemester,
  ]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">기본 인적사항</h3>

      {/* 이름 필드 */}

      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
      </div>

      {/* 생년월일 필드 */}
      <div className="space-y-2">
        <Label htmlFor="birthDate">생년월일</Label>
        <Input
          id="birthDate"
          value={birthDate}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
            setBirthDate(rawValue);
          }}
          placeholder="020101"
          className={errors.birthDate ? "border-red-500" : ""}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-xs">생년월일을 입력해주세요</p>
        )}
      </div>

      {/* 성별 라디오 버튼 */}
      <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup value={gender} onValueChange={setGender}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MALE" id="MALE" />
            <Label htmlFor="MALE">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FEMALE" id="FEMALE" />
            <Label htmlFor="FEMALE">여자</Label>
          </div>
        </RadioGroup>
        {errors.gender && (
          <p className="text-red-500 text-xs">성별을 선택해주세요</p>
        )}
      </div>

      {/* 학번 필드 */}
      <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input
          id="studentId"
          value={studentId}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
            setStudentId(rawValue);
          }}
          placeholder="32000000"
          className={errors.studentId ? "border-red-500" : ""}
        />
        {errors.studentId && (
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>

      {/* 전화번호 필드 */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          placeholder="010-1234-5678"
          className={errors.phoneNumber ? "border-red-500" : ""}
        />
        {phoneNumberError && (
          <p className="text-red-500 text-xs">{phoneNumberError}</p>
        )}
        {errors.phoneNumber && !phoneNumberError && (
          <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
        )}
      </div>

      {/* 소속 선택 */}
      <div className="space-y-2">
        <Label htmlFor="department">소속</Label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className={errors.department ? "border-red-500" : ""}>
            <SelectValue placeholder="학과 선택" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-red-500 text-xs">학과를 선택해주세요</p>
        )}
      </div>

      {/* 학적 상태 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select value={academicStatus} onValueChange={setAcademicStatus}>
          <SelectTrigger
            className={errors.academicStatus ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ENROLLED">재학</SelectItem>
            <SelectItem value="LEAVE_OF_ABSENCE">휴학</SelectItem>
            <SelectItem value="GRADUATED">졸업</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicStatus && (
          <p className="text-red-500 text-xs">학적을 선택해주세요</p>
        )}
      </div>

      {/* 학년 선택 */}
      <div className="space-y-2">
        <Label htmlFor="grade">모집 학기 기준 학년</Label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className={errors.grade ? "border-red-500" : ""}>
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade.value} value={grade.value}>
                {grade.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.grade && (
          <p className="text-red-500 text-xs">학년을 선택해주세요</p>
        )}
      </div>

      {/* 학기 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select value={academicSemester} onValueChange={setAcademicSemester}>
          <SelectTrigger
            className={errors.academicSemester ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIRST">1학기</SelectItem>
            <SelectItem value="SECOND">2학기</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicSemester && (
          <p className="text-red-500 text-xs">학기를 선택해주세요</p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
