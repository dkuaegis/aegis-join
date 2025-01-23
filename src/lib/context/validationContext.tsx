import { ValidState } from "@/types/state/valid";
import { type ReactNode, useContext, useReducer } from "react";
import { createContext } from "react";
import {
  type ValidationActionType,
  type ValidationState,
  validationReducer,
} from "../reducer/validationReducer";

interface ValidationContextType {
  validationState: ValidationState;
  validationDispatch: React.Dispatch<ValidationActionType>;
}

const initialValidationState: ValidationState = {
  personalInfo: ValidState.INVALID,
  survey: ValidState.INVALID,
  everytime: ValidState.INVALID,
  discord: ValidState.INVALID,
  coupon: ValidState.INVALID,
  payment: ValidState.INVALID,
};

export const ValidationContext = createContext<
  ValidationContextType | undefined
>(undefined);

export const ValidationProvider = ({ children }: { children: ReactNode }) => {
  const [validationState, validationDispatch] = useReducer(
    validationReducer,
    initialValidationState
  );
  return (
    <ValidationContext.Provider value={{ validationState, validationDispatch }}>
      {children}
    </ValidationContext.Provider>
  );
};

// 커스텀 훅으로 Context 사용
export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};

export const checkPageValidation = (state: ValidationState, page: number) => {
  const pageValidationMap: Record<number, boolean> = {
    1: state.personalInfo === ValidState.VALID,
    2: state.survey === ValidState.VALID,
    3: state.everytime === ValidState.VALID,
    4: state.discord === ValidState.VALID,
    5: state.coupon === ValidState.VALID,
    6: state.payment === ValidState.VALID,
  };

  return pageValidationMap[page] ?? false;
};
