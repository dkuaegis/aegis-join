export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Department {
  SOFTWARE_ENGINEERING = "SOFTWARE_ENGINEERING",
  COMPUTER_ENGINEERING = "COMPUTER_ENGINEERING",
  MOBILE_SYSTEM_ENGINEERING = "MOBILE_SYSTEM_ENGINEERING",
  STATISTICS_DATA_SCIENCE = "STATISTICS_DATA_SCIENCE",
  CYBER_SECURITY = "CYBER_SECURITY",
  SW_CONVERGENCE_DIVISION = "SW_CONVERGENCE_DIVISION",
}

export enum AcademicStatus {
  ENROLLED = "ENROLLED",
  LEAVE_OF_ABSENCE = "LEAVE_OF_ABSENCE",
  GRADUATED = "GRADUATED",
}

export enum Grade {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
}

export enum Semester {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export enum Role {
  ROLE_GUEST = "ROLE_GUEST",
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export interface Member {
  birth_date: string;
  gender: Gender;
  student_id: string;
  phone_number: string;
  department: Department;
  academic_status: AcademicStatus;
  grade: Grade;
  semester: Semester;
}

export interface GetMemberResponse extends Member {
  // GET /member
  id: number;
  email: string;
  name: string;
}

export interface CreateMemberRequest extends Member {
  // POST /member
}
