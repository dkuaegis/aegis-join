// 각 가입 단계를 나타내는 문자열 배열
export const JOIN_STEPS: readonly string[] = [
  'personal-info',
  'survey',
  'coupon',
  'payment',
  'discord',
  'complete',
] as const;

// 각 단계의 타입을 추론
type JoinStep = typeof JOIN_STEPS[number];

// 각 단계별 한글 이름을 매핑하는 객체
export const JOIN_STEP_KOREAN_MAP: { [key in JoinStep]: string } = {
  'personal-info': '기본 인적사항',
  'survey': '가입 설문',
  'coupon': '쿠폰 사용',
  'payment': '가입비 결제',
  'discord': '디스코드 인증',
  'complete': '가입 완료',
};