export const FONT_SIZE = {
  PX_10: '10px',
  PX_12: '12px',
  PX_13: '13px',
  PX_14: '14px',
  PX_15: '15px',
  PX_16: '16px',
  PX_17: '17px',
  PX_18: '18px',
  PX_20: '20px',
  PX_21: '21px',
  PX_22: '22px',
  PX_23: '23px',
  PX_24: '24px',
  PX_25: '25px',
  PX_28: '28px',
  PX_30: '30px',
  PX_32: '32px',
  PX_40: '40px',
  PX_45: "45px",
  PX_48: "48px",
  PX_54: "54px",
  PX_56: "56px",
  PX_60: "60px",
  PX_64: "64px",
  PX_70: "70px",
  PX_72: "72px",
};

export const SPECIAL_CHARACTER_VALIDATION = {
  FOR_NAMES: /[%<>\\$#!@%^&*()?+'"]/,
  FOR_SPACE: /\s/g,
  FOR_NBSP: /(&nbsp;)*/g,
  FOR_COMMA: /[,.]/g
};

export const COLORS = {
  RED: "#FF0000",
  BLUE: "#0096FF",
  BLUE500: "#06f",
  Blue600: "#027bff",
  WHITE: "#FFFFFF",
  DARK_GRAY: "#3A3A3A",
  ORANGE: "#FF6B01",
  BLACK: "#000000",
  GRAY: "#999999"
};

export const API_CODE = {
  STATUS_200: 200,
  STATUS_201: 201,
  STATUS_204: 204
};
export const API_ERROR_CODES = {
  STATUS_400: 400,
  STATUS_401: 401,
  STATUS_402: 402,
  STATUS_403: 403,
  STATUS_404: 404,
  STATUS_412: 412,
  STATUS_422: 422,
  STATUS_500: 500
};

export const REGEX = {
  UPPER_CASE_REGEX: /(?=.*[A-Z])/,
  LOWER_CASE_REGEX: /(?=.*[a-z])/,
  DIGIT_CASE_REGEX: /(?=.*\d)/,
  SPECIAL_CASE_REGEX: /(?=.*[-+_!@#$%^&*.,?])/,
  SPACE_REGEX: /(?=.*\s)/,
  EMAIL_REGEX: /^(?=[\w\s-+.])\s*[-+.'\w]+@[-.\w]+\.[-.\w]+\s*$/,
  HUBSPOT_COOKIE_REGEX: '(^|;)\\s*hubspotutk\\s*=\\s*([^;]+)',
  ONLY_STRING_REGEX: /([A-Za-z])$/,
  REPLACE_STRING_REGEX: /[^\d.-]/g,
  REPLACE_SLASH: /\//g,
  EXCEPT_SLASH_AND_QUOTES_REGEX: /^[^/\\'"]+$/,
  FIND_ALL_WHITESPACE: /\s/g,
  CARD_NUMBER_SPACE_REGEX: /\d{4}(?=.)/g,
  WATCH: /watch\?v=/,
  ONLY_ALPHABETS_AND_SPACE_ALLOWED: /^[A-Za-z\s]*$/
};
