
export const isMatched = (value) => {
  const pattern1 = /^(?=.*\d)(?=.*[a-z]|.*[A-Z])[\w~@#$%^&£¬*+=`|{}:;!.?\"()\[\]-\s?]{8,}$/;
  const pattern2 = /((?=.*[\u0600-\u06FF])(?=.*\d))|(^(?=.*\d)(?=.*[a-z]))/
  // /^(?=.\d)(?=.*[a-z])([^\u0000-\u007F]){0,}[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-\s?]{8,}$/
  return pattern1.test(value) || (pattern2.test(value) && value.length >= 8);
}