
import { calendarType, yearSelect, monthSelect } from './dom-elements.js';
import { updateCalendarView } from './calendar/updateView.js';
import { closePopup } from './notes/closePopup.js';

// Initialize
updateCalendarView();

// Event listeners
yearSelect.addEventListener('change', updateCalendarView);
monthSelect.addEventListener('change', updateCalendarView);
calendarType.addEventListener('change', updateCalendarView);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (popup.classList.contains('show')) {
        if (e.key === 'Escape') closePopup();
        if (e.key === 'Enter' && e.ctrlKey) {
            document.getElementById('saveNote').click();
        }
    }
});