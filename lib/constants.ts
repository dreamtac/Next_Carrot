export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).+$/);
export const ERROR_PASSWORD_TOO_SHORT = `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상입니다.`;
export const ERROR_PASSWORD_TOO_BIG = `비밀번호는 최대 ${PASSWORD_MAX_LENGTH}자를 넘길 수 없습니다.`;
export const ERROR_PASSWORD_REGEX = '비밀번호는 영어, 숫자, 특수문자가 꼭 포함되어야합니다.';
export const ERROR_REQUIRED = '필수로 입력해야합니다.';
