import { create } from "zustand";

interface PersonalInfoState {
  name: string;
  birthDate: string;
  gender: string;
  studentId: string;
  phoneNumber: string;
  department: string;
  academicStatus: string;
  grade: string;
  academicSemester: string;
  setField: (field: keyof PersonalInfoState, value: string) => void;
}

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
  name: "",
  birthDate: "",
  gender: "",
  studentId: "",
  phoneNumber: "",
  department: "",
  academicStatus: "",
  grade: "",
  academicSemester: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));
