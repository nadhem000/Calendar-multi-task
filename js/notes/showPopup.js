
import { popup, popupContent } from '../../dom-elements.js';
import { noteColors } from '../../constants.js';
import { notes, selectedColor } from '../../state.js';
import { getDateKey } from '../calendar/dateKey.js';
import { convertToIslamic } from '../converters/islamicConverter.js';
import { convertToCoptic } from '../converters/copticConverter.js';
import { closePopup } from './closePopup.js';
import { updateCalendarView } from '../calendar/updateView.js';

export function showPopup(year, month, day) {
    const dateKey = getDateKey(year, month, day);
    const dateNotes = notes[dateKey] || [];
    
    // Get date in all calendars
    let gregorianDate, islamicDate, copticDate;
    
    if (currentView === 'gregorian') {
        gregorianDate = `${day}/${month + 1}/${year}`;
        islamicDate = convertToIslamic(year, month + 1, day);
        copticDate = convertToCoptic(year, month + 1, day);
    } else if (currentView === 'islamic') {
        const converted = convertToIslamic(year, month + 1, day, true);
        const gDate = new Date(converted.gregorianDate);
        gregorianDate = `${gDate.getDate()}/${gDate.getMonth() + 1}/${gDate.getFullYear()}`;
        islamicDate = `${day}/${month + 1}/${year} AH`;
        copticDate = convertToCoptic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
        year = gDate.getFullYear();
        month = gDate.getMonth();
        day = gDate.getDate();
    } else if (currentView === 'coptic') {
        const converted = convertToCoptic(year, month + 1, day, true);
        const gDate = new Date(converted.gregorianDate);
        gregorianDate = `${gDate.getDate()}/${gDate.getMonth() + 1}/${gDate.getFullYear()}`;
        islamicDate = convertToIslamic(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
        copticDate = `${day} ${converted.monthName} ${year} AM`;
        year = gDate.getFullYear();
        month = gDate.getMonth();
        day = gDate.getDate();
    }
    
    popupContent.innerHTML = `
        <h3>${gregorianDate} (Gregorian)</h3>
        <div class="calendar-display">
            <div>Islamic:<br>${islamicDate}</div>
            <div>Coptic:<br>${copticDate}</div>
        </div>
        <div class="note-color-picker">
            ${noteColors.map((color, i) => `
                <div class="color-option ${i === 0 ? 'selected' : ''}" 
                     style="background-color: ${color}" 
                     data-color="${color}"></div>
            `).join('')}
        </div>
        <textarea id="noteInput" placeholder="Type your note here..."></textarea>
        <div class="notes-list" id="notesList">
            ${dateNotes.map(note => `
                <div class="note-item" style="background-color: ${note.color}">
                    <span>${note.text}</span>
                    <span class="delete-note" data-id="${note.id}">✕</span>
                </div>
            `).join('')}
        </div>
        <div class="popup-buttons">
            <button id="saveNote">Add Note</button>
            <button id="closePopup">Close</button>
        </div>
    `;
    
    popup.classList.add('show');
    
    // Focus the textarea
    document.getElementById('noteInput').focus();
    
    // Set up color picker
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(opt => 
                opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.dataset.color;
        });
    });
    
    // Set up delete note handlers
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const noteId = parseInt(btn.dataset.id);
            notes[dateKey] = notes[dateKey].filter(n => n.id !== noteId);
            if (notes[dateKey].length === 0) {
                delete notes[dateKey];
            }
            localStorage.setItem('calendarNotes', JSON.stringify(notes));
            showPopup(year, month, day);
        });
    });
    
    // Add event listeners to buttons
    document.getElementById('saveNote').addEventListener('click', () => {
        const noteText = document.getElementById('noteInput').value.trim();
        if (noteText) {
            if (!notes[dateKey]) notes[dateKey] = [];
            notes[dateKey].push({
                id: Date.now(),
                text: noteText,
                color: selectedColor
            });
            localStorage.setItem('calendarNotes', JSON.stringify(notes));
            document.getElementById('noteInput').value = '';
            showPopup(year, month, day);
        }
    });
    
    document.getElementById('closePopup').addEventListener('click', closePopup);
}