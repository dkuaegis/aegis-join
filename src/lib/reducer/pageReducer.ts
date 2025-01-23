export interface pageState {
  length: number;
  currentPageIndex: number;
}
export enum PageActions {
  NEXT = "NEXT",
  PREV = "PREV",
  GOTO = "GOTO",
}

interface NextAction {
  type: PageActions.NEXT;
}

interface PrevAction {
  type: PageActions.PREV;
}

type PageActionType = NextAction | PrevAction;

// 4. 리듀서 함수 정의
export const pageReducer = (
  state: pageState,
  action: PageActionType
): pageState => {
  switch (action.type) {
    case PageActions.NEXT:
      if (state.currentPageIndex < state.length) {
        return {
          ...state,
          currentPageIndex: state.currentPageIndex + 1,
        };
      }
      return state;

    case PageActions.PREV:
      if (state.currentPageIndex > 0) {
        return {
          ...state,
          currentPageIndex: state.currentPageIndex - 1,
        };
      }
      return state;

    default:
      return state;
  }
};
