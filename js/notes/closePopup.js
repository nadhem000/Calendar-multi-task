
import { popup } from '../../dom-elements.js';
import { updateCalendarView } from '../calendar/updateView.js';

export function closePopup() {
    popup.classList.remove('show');
    // Regenerate calendar to update any changes
    updateCalendarView();
}