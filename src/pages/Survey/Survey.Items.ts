import { InterestField } from "@/types/api/survey";

export interface InterestItem {
  id: InterestField;
  description: string;
}

// 보안 항목들
const securityList: InterestItem[] = [
  { id: InterestField.SECURITY_WEB_HACKING, description: "웹해킹" },
  { id: InterestField.SECURITY_SYSTEM_HACKING, description: "시스템해킹" },
  { id: InterestField.SECURITY_REVERSING, description: "리버싱" },
  { id: InterestField.SECURITY_FORENSIC, description: "포렌식" },
  { id: InterestField.SECURITY_MALWARE, description: "악성코드분석" },
  { id: InterestField.SECURITY_CRYPTOGRAPHY, description: "암호학" },
  {
    id: InterestField.SECURITY_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
  },
  { id: InterestField.SECURITY_ETC, description: "기타" },
];

// 웹 항목들
const webList: InterestItem[] = [
  { id: InterestField.WEB_FRONTEND, description: "프론트엔드" },
  { id: InterestField.WEB_BACKEND, description: "백엔드" },
  {
    id: InterestField.WEB_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
  },
  { id: InterestField.WEB_ETC, description: "기타" },
];

// 게임 항목들
const gameList: InterestItem[] = [
  { id: InterestField.GAME_CLIENT, description: "클라이언트" },
  { id: InterestField.GAME_SERVER, description: "서버" },
  {
    id: InterestField.GAME_NOT_SURE,
    description: "분야를 아직 정하지 못 했어요",
  },
  { id: InterestField.GAME_ETC, description: "기타" },
];

// 기타 항목들
const etcList: InterestItem[] = [
  { id: InterestField.APP, description: "앱" },
  { id: InterestField.DEVOPS, description: "DevOps" },
  { id: InterestField.AI, description: "인공지능" },
  { id: InterestField.NOT_SURE, description: "아직 잘 모르겠어요" },
  { id: InterestField.ETC, description: "기타" },
];

export { securityList, gameList, webList, etcList };