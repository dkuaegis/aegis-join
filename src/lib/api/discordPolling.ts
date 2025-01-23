import {
  type ValidationActionType,
  ValidationActions,
} from "../reducer/validationReducer";

export const startDiscordPolling = async (
  dispatch: React.Dispatch<ValidationActionType>
) => {
  const interval = 2000;
  let attempts = 0;

  const poll = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/discord/check`
      );
      if (!response.ok) {
        throw new Error("ERROR on polling");
      }

      if (response.status === 200) {
        dispatch({ type: ValidationActions.SET_VALID, field: "discord" });
        return; // 폴링 중단
      }

      attempts++;
      setTimeout(poll, interval); // 재귀 호출로 다음 폴링 수행
    } catch (err: unknown) {
      dispatch({ type: ValidationActions.SET_INVALID, field: "discord" });
    }
  };

  poll();
};
