

export const pageInitialState = {
  pageLength: 6,
  currentPageIndex: 0,
  isPersonalInfoValid: false,
  isSurveyValid: false,
  isEverytimeValid: false,
  isDiscordValid: false,
  isCouponValid: false,
  isPaymentValid: false,
};

export enum PageActionType {
    NEXT="NEXT",
    PREV="PREV",
    GOTO="GOTO",
    SET_VALUE="SET_VALUE",
    POST="POST",
    SET_VALID="SET_VALID",
}

// 4. 리듀서 함수 정의
export const pageReducer = (state: typeof pageInitialState, action: { type: PageActionType; payload?: number }) => {
  switch (action.type) {
    case    PageActionType.NEXT:
      if (state.currentPageIndex < state.pageLength - 1) {
        return {
          currentPageIndex: state.currentPageIndex + 1,
        };
      }
      return state;

    case PageActionType.PREV:
      if (state.currentPageIndex > 0) {
        return {
          currentPageIndex: state.currentPageIndex - 1,
        };
      }
      return state;

    case PageActionType.GOTO:
      if (action.payload !== undefined && action.payload >= 0 && action.payload <  state.pageLength) {
        return {
          currentPageIndex: action.payload,
        };
      }
      return state;
    


    case PageActionType.POST:

      
    default:
      throw new Error("Unknown action type");
  }
};
