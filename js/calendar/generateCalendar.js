
import { calendarElement, popup } from '../dom-elements.js';
import { daysOfWeek, noteColors } from '../constants.js';
import { notes, currentView, currentDate } from '../state.js';
import { convertToIslamic } from '../converters/islamicConverter.js';
import { convertToCoptic } from '../converters/copticConverter.js';
import { getDateKey } from './dateKey.js';
import { showPopup } from '../notes/showPopup.js';

export function generateCalendar(year, month) {
    calendarElement.innerHTML = '';
    
    // Create day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarElement.appendChild(dayHeader);
    });
    
    let firstDay, daysInMonth;
    
    if (currentView === 'gregorian') {
        firstDay = new Date(year, month, 1).getDay();
        daysInMonth = new Date(year, month + 1, 0).getDate();
    } else if (currentView === 'islamic') {
        const islamicDate = convertToIslamic(year, month + 1, 1, true);
        firstDay = new Date(islamicDate.gregorianDate).getDay();
        daysInMonth = islamicDate.daysInMonth;
        year = islamicDate.year;
        month = islamicDate.month - 1;
    } else if (currentView === 'coptic') {
        const copticDate = convertToCoptic(year, month + 1, 1, true);
        firstDay = new Date(copticDate.gregorianDate).getDay();
        daysInMonth = copticDate.daysInMonth;
        year = copticDate.year;
        month = copticDate.month - 1;
    }
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendarElement.appendChild(emptyDay);
    }
    
    // Add days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Highlight current day (Gregorian only for simplicity)
        if (currentView === 'gregorian' && 
            year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Add note previews if exists
        const dateKey = getDateKey(year, month, day);
        if (notes[dateKey] && notes[dateKey].length > 0) {
            const noteIndicator = document.createElement('span');
            noteIndicator.className = 'note-indicator';
            noteIndicator.textContent = '📝';
            dayElement.appendChild(noteIndicator);
            
            // Show first 2 notes as preview
            notes[dateKey].slice(0, 2).forEach(note => {
                const notePreview = document.createElement('div');
                notePreview.className = 'note-preview';
                notePreview.textContent = note.text;
                notePreview.style.backgroundColor = note.color;
                dayElement.appendChild(notePreview);
            });
            
            if (notes[dateKey].length > 2) {
                const moreNotes = document.createElement('div');
                moreNotes.className = 'note-preview';
                moreNotes.textContent = `+${notes[dateKey].length - 2} more`;
                dayElement.appendChild(moreNotes);
            }
        }
        
        // Add click event
        dayElement.addEventListener('click', () => {
            showPopup(year, month, day);
        });
        
        calendarElement.appendChild(dayElement);
    }
}