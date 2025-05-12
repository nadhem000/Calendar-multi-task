
export function convertToCoptic(year, month, day, returnObject = false) {
    // Coptic calendar starts on August 29, 284 AD (Julian)
    const copticEpoch = new Date(284, 7, 29);
    const gregorianDate = new Date(year, month - 1, day);
    
    // Difference in days
    const diffDays = Math.floor((gregorianDate - copticEpoch) / (1000 * 60 * 60 * 24));
    
    // Coptic years (365 days, leap years every 4 years)
    const copticYear = Math.floor(diffDays / 365) + 1;
    const remainingDays = diffDays % 365;
    
    let copticMonth, copticDay;
    if (remainingDays < 30 * 12) {
        copticMonth = Math.floor(remainingDays / 30) + 1;
        copticDay = (remainingDays % 30) + 1;
    } else {
        copticMonth = 13; // Epagomenal days
        copticDay = remainingDays - 30 * 12 + 1;
    }
    
    if (returnObject) {
        return {
            day: copticDay,
            month: copticMonth,
            year: copticYear,
            daysInMonth: copticMonth <= 12 ? 30 : (copticYear % 4 === 3 ? 6 : 5),
            gregorianDate: gregorianDate.toISOString(),
            monthName: copticMonth <= 12 ? copticMonths[copticMonth - 1] : 'Epagomenal'
        };
    }
    
    return `${copticDay} ${copticMonth <= 12 ? copticMonths[copticMonth - 1] : 'Epagomenal'} ${copticYear} AM`;
}