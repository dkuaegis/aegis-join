import { Label } from "@/components/ui/label";
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
import { Gender } from "@/types/api/member";
import { StudentName } from "./field/studentName";
import { StudentBirthDate } from "./field/studentBirthDate";
import { StudentGender } from "./field/studentGender";
import { StudentId } from "./field/studentId";
import { StudentPhoneNumber } from "./field/studentPhoneNumber";
import { StudentDepartment } from "./field/studentDepartment";

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
  const [gender, setGender] = useState<Gender>(Gender.MALE);
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
          `${import.meta.env.VITE_API_URL}/api/member`,
          {
            credentials: "include",
          }
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
              credentials: "include",
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
      <StudentName
        name={name}
        setName={setName}
        errors={errors.name}
        showErrors={showErrors}
      />

      {/* 생년월일 필드 */}
      <StudentBirthDate
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        errors={errors.birthDate}
        showErrors={showErrors}
      />

      {/* 성별 라디오 버튼 */}
      <StudentGender
        gender={gender}
        setGender={setGender}
        errors={errors.gender}
        showErrors={showErrors}
      />

      {/* 학번 필드 */}
      <StudentId 
        studentId={studentId}
        setStudentId={setStudentId}
        errors={errors.studentId}
        showErrors={showErrors}
      />

      {/* 전화번호 필드 */}
      <StudentPhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        formatPhoneNumber={formatPhoneNumber}
        phoneNumberError={phoneNumberError}
        errors={errors.phoneNumber}
        showErrors={showErrors}
      />

      {/* 소속 선택 */}
      <StudentDepartment
        department={department}
        setDepartment={setDepartment}
        errors={errors.department}
        showErrors={showErrors}
      />

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
