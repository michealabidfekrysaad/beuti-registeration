export const minLength = (value , length) => {
 return value.length < length ? true : false;
};

export const maxLength = (value , length) => {
  return value.length > length ? true : false;
 };

export const isRequired = (value , length) => {
  return value.trim().length < length ? true : false;
};