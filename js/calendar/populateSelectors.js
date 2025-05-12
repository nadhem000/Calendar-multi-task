
import { yearSelect, monthSelect } from '../../dom-elements.js';
import { gregorianMonths, islamicMonths, copticMonths } from '../../constants.js';
import { currentView, currentDate } from '../../state.js';
import { convertToIslamic, convertToCoptic } from '../converters/';

export function populateYearMonthSelectors() {
    yearSelect.innerHTML = '';
    monthSelect.innerHTML = '';
    
    if (currentView === 'gregorian') {
        const currentYear = new Date().getFullYear();
        for (let y = currentYear - 10; y <= currentYear + 10; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
            if (y === currentYear) option.selected = true;
        }
        
        gregorianMonths.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            monthSelect.appendChild(option);
            if (index === currentDate.getMonth()) option.selected = true;
        });
    } else if (currentView === 'islamic') {
        const islamicDate = convertToIslamic(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            true
        );
        const currentIslamicYear = islamicDate.year;
        
        for (let y = currentIslamicYear - 10; y <= currentIslamicYear + 10; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
            if (y === currentIslamicYear) option.selected = true;
        }
        
        islamicMonths.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            monthSelect.appendChild(option);
        });
    } else if (currentView === 'coptic') {
        const copticDate = convertToCoptic(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            true
        );
        const currentCopticYear = copticDate.year;
        
        for (let y = currentCopticYear - 10; y <= currentCopticYear + 10; y++) {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelect.appendChild(option);
            if (y === currentCopticYear) option.selected = true;
        }
        
        copticMonths.forEach((name, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = name;
            monthSelect.appendChild(option);
        });
    }
}