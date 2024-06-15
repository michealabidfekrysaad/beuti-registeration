import { VALIDATE_REFERAL_CODE_FAILURE, VALIDATE_PROMO_CODE_FAILURE, SET_REFERAL_CODE, SET_PROMO_CODE } from "./../actions/types";

export const validateReferalCodeFailureReducer = (codeError = '', action) => {
  if (action.type === VALIDATE_REFERAL_CODE_FAILURE) {
    return action.payload;
  }
  return codeError;
};

export const validatePromoCodeFailureReducer = (codeError = '', action) => {
  if (action.type === VALIDATE_PROMO_CODE_FAILURE) {
    return action.payload;
  }
  return codeError;
};

export const setReferralCodeReducer = (referralCode = "", action) => {
  if (action.type === SET_REFERAL_CODE) {
    return action.payload;
  }
  return referralCode;
}

export const setPromocodeReducer = (promoCode = "", action) => {
  if (action.type === SET_PROMO_CODE) {
    return action.payload;
  }
  return promoCode;
}