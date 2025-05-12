
export function convertToIslamic(year, month, day, returnObject = false) {
    // Using Intl API for conversion when available
    try {
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
            const date = new Date(year, month - 1, day);
            const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                timeZone: 'UTC'
            });
            
            const parts = formatter.formatToParts(date);
            let dayPart, monthPart, yearPart;
            
            for (const part of parts) {
                if (part.type === 'day') dayPart = part.value;
                if (part.type === 'month') monthPart = part.value;
                if (part.type === 'year') yearPart = part.value;
            }
            
            if (returnObject) {
                // For calendar generation, we need more info
                const nextMonth = new Date(year, month - 1, day + 28);
                const nextMonthParts = formatter.formatToParts(nextMonth);
                let nextMonthPart;
                for (const part of nextMonthParts) {
                    if (part.type === 'month') nextMonthPart = part.value;
                }
                
                const daysInMonth = nextMonthPart !== monthPart ? 30 : 29;
                
                return {
                    day: parseInt(dayPart),
                    month: parseInt(monthPart),
                    year: parseInt(yearPart),
                    daysInMonth: daysInMonth,
                    gregorianDate: date.toISOString()
                };
            }
            
            return `${dayPart}/${monthPart}/${yearPart} AH`;
        }
    } catch (e) {
        console.warn("Intl API failed, falling back to calculation");
    }
    
    // Fallback calculation (approximate)
    const gregorianDate = new Date(year, month - 1, day);
    const islamicEpoch = new Date(622, 6, 16); // July 16, 622 AD
    
    const diffDays = Math.floor((gregorianDate - islamicEpoch) / (1000 * 60 * 60 * 24));
    const islamicYear = Math.floor(diffDays / 354.367) + 1;
    const remainingDays = diffDays - Math.floor((islamicYear - 1) * 354.367);
    
    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let islamicMonth = 1;
    let islamicDay = remainingDays;
    
    for (let i = 0; i < monthLengths.length; i++) {
        if (islamicDay <= monthLengths[i]) {
            islamicMonth = i + 1;
            break;
        }
        islamicDay -= monthLengths[i];
    }
    
    if (returnObject) {
        return {
            day: Math.floor(islamicDay),
            month: islamicMonth,
            year: islamicYear,
            daysInMonth: monthLengths[islamicMonth - 1],
            gregorianDate: gregorianDate.toISOString()
        };
    }
    
    return `${Math.floor(islamicDay)}/${islamicMonth}/${islamicYear} AH`;
}