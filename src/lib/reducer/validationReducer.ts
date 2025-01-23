import { ValidState } from "@/types/state/valid"




export interface ValidationState {
    PersonalInfo: ValidState;
    Survey: ValidState;
    Everytime: ValidState;
    Discord: ValidState;
    Coupon: ValidState;
    Payment: ValidState;
}

export enum ValidationActions {
    SET_VALID = "SET_VALID",
    SET_INVALID = "SET_INVALID",
    SHOW_ERROR = "SHOW_ERROR",
}

interface SetValidAction {
    type: ValidationActions.SET_VALID;
    field: keyof ValidationState; 
  }
  
  interface SetInvalidAction {
    type: ValidationActions.SET_INVALID;
    field: keyof ValidationState;
  }
  
  interface ShowErrorAction {
    type: ValidationActions.SHOW_ERROR;
    field: keyof ValidationState;
  }

export type ValidationActionType = SetValidAction | SetInvalidAction | ShowErrorAction;


export const validationReducer = (state: ValidationState, action: ValidationActionType): ValidationState => {
    switch (action.type) {
        case ValidationActions.SET_VALID:
            return {
                ...state,
                [action.field as keyof ValidationState]: ValidState.VALID,
            };
        
        case ValidationActions.SET_INVALID:
            return {
                ...state,
                [action.field as keyof ValidationState]: ValidState.INVALID,
            };

        case ValidationActions.SHOW_ERROR:
            return {
                ...state,
                [action.field as keyof ValidationState]: ValidState.SHOW_ERROR,
            };

        default:
            return state;
    }
} 
