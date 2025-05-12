
import { calendarType, yearSelect, monthSelect } from '../../dom-elements.js';
import { currentView } from '../../state.js';
import { generateCalendar } from './generateCalendar.js';
import { populateYearMonthSelectors } from './populateSelectors.js';

export function updateCalendarView() {
    currentView = calendarType.value;
    populateYearMonthSelectors();
    
    if (currentView === 'gregorian') {
        generateCalendar(
            parseInt(yearSelect.value),
            parseInt(monthSelect.value)
        );
    } else if (currentView === 'islamic') {
        // For Islamic calendar, we need to convert back to Gregorian to generate the calendar
        const islamicYear = parseInt(yearSelect.value);
        const islamicMonth = parseInt(monthSelect.value) + 1;
        
        // Get approximate Gregorian date for the 1st of the Islamic month
        const approxGregorianDate = new Date(
            Math.floor(islamicYear * (32/33) + 622),
            islamicMonth * (32/33),
            1
        );
        
        generateCalendar(
            approxGregorianDate.getFullYear(),
            approxGregorianDate.getMonth()
        );
    } else if (currentView === 'coptic') {
        const copticYear = parseInt(yearSelect.value);
        const gregorianYear = copticYear + 284;
        generateCalendar(gregorianYear, 7); // Start with August
    }
}