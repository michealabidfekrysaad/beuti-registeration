export const isEmail = (value) => {
    // const pattern = /^\w+(?:\.\w+)*@\w+(?:\.\w+)+$/;
    const pattern = /^\w+(?:\.?|\-??\w+)*@\w+(?:\.?|\-??\w+)*(?:\.\w+)+$/;
    return pattern.test(value);
}