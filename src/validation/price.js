export const isAcceptedPrice = (value) => {
    const pattern = /^[0-9]+\.?[0-9]*$/;
    return pattern.test(value);
}
export const isNegative  = (value) => {
    return value < 0 ? true : false
}