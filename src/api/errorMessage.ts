import type { ServerError } from "./types";

// URL + 상태코드 별 에러 메세지 정의
const messagesByUrl: Record<string, Record<number, string>> = {
  "/api/users/": {
    404: "사용자 정보를 찾을 수 없습니다.",
  },
  "/api/orders": {
    400: "주문 정보가 올바르지 않습니다. 입력 내용을 다시 확인해주세요.",
  },
};

const messagesByStatus: Record<number, string> = {
  400: "잘못된 요청입니다.",
  401: "인증이 필요합니다. 다시 로그인해주세요.",
  403: "접근 권한이 없습니다.",
  404: "요청하신 리소스를 찾을 수 없습니다.",
  500: "서버에 문제가 발생했습니다. 관리자에게 문의해주세요.",
};

// 기본 에러 메시지
const DEFAULT_ERROR_MESSAGE = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export default function getErrorMessage(error: ServerError): string {
  const { status, url } = error;

  // 1. URL 패턴에 맞는 특정 메시지가 있는지 먼저 확인
  for (const urlPattern in messagesByUrl) {
    if (url.startsWith(urlPattern)) {
      const specificMessage = messagesByUrl[urlPattern][status];
      if (specificMessage) {
        return specificMessage;
      }
    }
  }

  // 2. 특정 메시지가 없으면, 상태 코드에 맞는 기본 메시지를 반환
  return messagesByStatus[status] || DEFAULT_ERROR_MESSAGE;
}
