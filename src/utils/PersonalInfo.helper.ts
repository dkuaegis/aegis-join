export function formatPhoneNumber(rawValue: string): string {
  const sanitizedValue = rawValue.replace(/[^0-9]/g, ""); // 숫자 외의 문자 제거

  if (sanitizedValue.length <= 3) {
    return sanitizedValue;
  }
  if (sanitizedValue.length <= 7) {
    return `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3)}`;
  }
  return `${sanitizedValue.slice(0, 3)}-${sanitizedValue.slice(3, 7)}-${sanitizedValue.slice(7, 11)}`;
}

export function phoneNumberCheck(number: string): boolean {
  const result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return result.test(number);
}
