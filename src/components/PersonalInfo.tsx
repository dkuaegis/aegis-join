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
import { useValidation } from "@/lib/context/validationContext";
import { ValidationActions } from "@/lib/reducer/validationReducer";
import { ValidState } from "@/types/state/valid";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

//전화번호 입력 포맷팅 함수
function formatPhoneNumber(rawValue: string): string {
  const sanitizedValue = rawValue.replace(/[^0-9]/g, ""); // 숫자 외의 문자 제거

  if (sanitizedValue.length <= 3) {
    return sanitizedValue;
  }
  if (sanitizedValue.length <= 7) {
    return `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3)}`;
  }
  return `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3, 7)}-${sanitizedValue.slice(7, 11)}`;
}

function phoneNumberCheck(number: string): boolean {
  const result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return result.test(number);
}

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
}: {
  setSenderName: Dispatch<SetStateAction<string>>;
}) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<string>("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [academicStatus, setAcademicStatus] = useState("");
  const [grade, setGrade] = useState("");
  const [academicSemester, setAcademicSemester] = useState("");

  const { validationState, validationDispatch } = useValidation();
  // const valid = validationState.personalInfo;
  const setValid = useCallback(
    () =>
      validationDispatch({
        type: ValidationActions.SET_VALID,
        field: "personalInfo",
      }),
    [validationDispatch]
  );
  const setInvalid = useCallback(
    () =>
      validationDispatch({
        type: ValidationActions.SET_INVALID,
        field: "personalInfo",
      }),
    [validationDispatch]
  );

  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

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

  const showErrors = validationState.personalInfo === ValidState.SHOW_ERROR;
  const [errors, setErrors] = useState({
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
    const isGenderValid = gender === "MALE" || gender === "FEMALE";
    const isPhoneNumberValid = phoneNumberCheck(phoneNumber);
    const isValid: boolean =
      !!name &&
      !!birthDate &&
      isGenderValid &&
      !!studentId &&
      !!phoneNumber &&
      isPhoneNumberValid &&
      !!department &&
      !!academicStatus &&
      !!grade &&
      !!academicSemester;

    if (isValid) setValid();

    if (validationState.personalInfo === ValidState.SHOW_ERROR) {
      setErrors({
        name: !name,
        birthDate: !birthDate,
        gender: !isGenderValid,
        studentId: !studentId,
        phoneNumber: !phoneNumber || !isPhoneNumberValid,
        department: !department,
        academicStatus: !academicStatus,
        grade: !grade,
        academicSemester: !academicSemester,
      });
    }
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
    validationState.personalInfo,
    setValid,
  ]);

  useEffect(() => {
    if (phoneNumber) {
      const isValidPhoneNumber = phoneNumberCheck(phoneNumber);
      if (!isValidPhoneNumber) {
        setPhoneNumberError("양식에 맞게 입력해주세요. ex) 010-1234-5678");
      } else {
        setPhoneNumberError(null);
      }
    }
  }, [phoneNumber]);

  // 컴포넌트 마운트 시 fetch
  useEffect(() => {
    console.log("MOUNTED!");
    setInvalid(); // 마운트 시 invalid 로 초기화

    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/member`
        );
        if (response.ok) {
          const data = await response.json();
          // Assuming the response data has the structure needed
          setName(data.name);
          setBirthDate(data.birthDate);
          setGender(data.gender);
          setStudentId(data.studentId);
          setPhoneNumber(data.phoneNumber);
          setDepartment(data.department);
          setAcademicStatus(data.academicStatus);
          setGrade(data.grade);
          setAcademicSemester(data.academicSemester);
        } else {
          console.error("Failed to fetch member data");
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();

    return () => {
      // Cleanup, useRef ensures the latest values are posted
      const postMemberData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/member`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formValuesRef.current), // Use formValuesRef
            }
          );

          if (!response.ok) {
            console.error("Failed to post member data");
          }
        } catch (error) {
          console.error("Error posting member data:", error);
        }
      };
      postMemberData();
      console.log("UNMOUNTED");
    };
  }, [setInvalid]);

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
          className={errors.name && showErrors ? "border-red-500" : ""}
        />
        {errors.name && showErrors && (
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
          className={errors.birthDate && showErrors ? "border-red-500" : ""}
        />
        {errors.birthDate && showErrors && (
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
        {errors.gender && showErrors && (
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
          className={errors.studentId && showErrors ? "border-red-500" : ""}
        />
        {errors.studentId && showErrors && (
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
          className={errors.phoneNumber && showErrors ? "border-red-500" : ""}
        />
        {phoneNumberError && showErrors && (
          <p className="text-red-500 text-xs">{phoneNumberError}</p>
        )}
        {errors.phoneNumber && showErrors && !phoneNumberError && (
          <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
        )}
      </div>

      {/* 소속 선택 */}
      <div className="space-y-2">
        <Label htmlFor="department">소속</Label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger
            className={errors.department && showErrors ? "border-red-500" : ""}
          >
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
        {errors.department && showErrors && (
          <p className="text-red-500 text-xs">학과를 선택해주세요</p>
        )}
      </div>

      {/* 학적 상태 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select value={academicStatus} onValueChange={setAcademicStatus}>
          <SelectTrigger
            className={errors.academicStatus && showErrors ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ENROLLED">재학</SelectItem>
            <SelectItem value="LEAVE_OF_ABSENCE">휴학</SelectItem>
            <SelectItem value="GRADUATED">졸업</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicStatus && showErrors && (
          <p className="text-red-500 text-xs">학적을 선택해주세요</p>
        )}
      </div>

      {/* 학년 선택 */}
      <div className="space-y-2">
        <Label htmlFor="grade">모집 학기 기준 학년</Label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger
            className={errors.grade && showErrors ? "border-red-500" : ""}
          >
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
        {errors.grade && showErrors && (
          <p className="text-red-500 text-xs">학년을 선택해주세요</p>
        )}
      </div>

      {/* 학기 선택 */}
      <div className="space-y-2">
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select value={academicSemester} onValueChange={setAcademicSemester}>
          <SelectTrigger
            className={errors.academicSemester && showErrors ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIRST">1학기</SelectItem>
            <SelectItem value="SECOND">2학기</SelectItem>
          </SelectContent>
        </Select>
        {errors.academicSemester && showErrors && (
          <p className="text-red-500 text-xs">학기를 선택해주세요</p>
        )}
      </div>
    </div>
  );
}

export default PersonalInfo;
