import { ReactNode, useReducer, useContext } from "react";
import { createContext } from "react";
import { ValidationState, ValidationActionType, validationReducer } from "../reducer/validationReducer";
import { ValidState } from "@/types/state/valid";

interface ValidationContextType {
   validationState: ValidationState; 
   validationDispatch: React.Dispatch<ValidationActionType>;
}

const initialValidationState: ValidationState = {
    PersonalInfo: ValidState.INVALID,
    Survey: ValidState.INVALID,
    Everytime: ValidState.INVALID,
    Discord: ValidState.INVALID,
    Coupon: ValidState.INVALID,
    Payment: ValidState.INVALID,
}

export const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider = ({ children }: { children: ReactNode }) => {
    const [validationState, validationDispatch] = useReducer(validationReducer, initialValidationState);
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