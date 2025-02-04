import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Gender } from "@/types/api/member";
import { formatPhoneNumber } from "@/utils/PersonalInfo.helper";
import { StudentName } from "./field/studentName";
import { StudentBirthDate } from "./field/studentBirthDate";
import { StudentGender } from "./field/studentGender";
import { StudentId } from "./field/studentId";
import { StudentPhoneNumber } from "./field/studentPhoneNumber";
import { StudentDepartment } from "./field/studentDepartment";
import { StudentAcademicStatus } from "./field/studentAcademicStatus";
import { StudentGrade } from "./field/studentGrade";
import { StudentAcademicSemester } from "./field/studentAcademicSemester";

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
  const [gender, setGender] = useState<Gender>(Gender.MALE);
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
      <StudentName
        name={name}
        setName={setName}
        errors={errors.name}
        // showErrors={showErrors}
      />

      {/* 생년월일 필드 */}
      <StudentBirthDate
        birthDate={birthDate}
        setBirthDate={setBirthDate}
        errors={errors.birthDate}
        // showErrors={showErrors}
      />

      {/* 성별 라디오 버튼 */}
      <StudentGender
        gender={gender}
        setGender={setGender}
        errors={errors.gender}
        // showErrors={showErrors}
      />

      {/* 학번 필드 */}
      <StudentId 
        studentId={studentId}
        setStudentId={setStudentId}
        errors={errors.studentId}
        // showErrors={showErrors}
      />

      {/* 전화번호 필드 */}
      <StudentPhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        formatPhoneNumber={formatPhoneNumber}
        phoneNumberError={phoneNumberError}
        errors={errors.phoneNumber}
        // showErrors={showErrors}
      />

      {/* 소속 선택 */}
      <StudentDepartment
        department={department}
        setDepartment={setDepartment}
        errors={errors.department}
        // showErrors={showErrors}
      />

      {/* 학적 상태 선택 */}
      <StudentAcademicStatus
        academicStatus={academicStatus}
        setAcademicStatus={setAcademicStatus}
        errors={errors.academicStatus}
        // showErrors={showErrors}
      />

      {/* 학년 선택 */}
      <StudentGrade
        grade={grade}
        setGrade={setGrade}
        errors={errors.grade}
        // showErrors={showErrors}
      />

      {/* 학기 선택 */}
      <StudentAcademicSemester
        academicSemester={academicSemester}
        setAcademicSemester={setAcademicSemester}
        errors={errors.academicSemester}
        // showErrors={showErrors}
      />
    </div>
  );
}

export default PersonalInfo;
