
export const isStartWith05 = (value) => {
  return value.toString().startsWith('05')
}

export const isLengthValid = (value) => {
  return value.toString().length !== 10
}

export const isNumbersOnly = (value) => {
  const pattern = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
  return pattern.test(value);
}

