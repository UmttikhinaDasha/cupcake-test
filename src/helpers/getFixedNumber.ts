export const getFixedNumber = (number: number, digits: number = 3) => {
    const fixedNumber = Number(number.toFixed(digits))

    return Number.isNaN(fixedNumber) ? 0 : fixedNumber
}
