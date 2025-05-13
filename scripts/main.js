// --- Declare currentLanguage at the top ---
let currentLanguage = 'en';
// --- Translations ---
const translations = {
	en: {
		calendar: {
			"Calendar": "Calendar",
			"Year": "Year",
			"Month": "Month",
			"Gregorian": "Gregorian",
			"Islamic": "Islamic",
			"Coptic": "Coptic",
			"Notes": "Notes",
			"Type your note here...": "Type your note here...",
			"Save": "Save",
			"Close": "Close",
			"Select Calendar": "Select Calendar",
			"Select Year": "Select Year",
			"Select Month": "Select Month",
			"Select Language": "Select Language"
		},
		daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	},
	ar: {
		calendar: {
			"Calendar": "التقويم",
			"Year": "السنة",
			"Month": "الشهر",
			"Gregorian": "ميلادي",
			"Islamic": "هجري",
			"Coptic": "قبطي",
			"Notes": "ملاحظات",
			"Type your note here...": "اكتب ملاحظتك هنا...",
			"Save": "حفظ",
			"Close": "إغلاق",
			"Select Calendar": "اختر التقويم",
			"Select Year": "اختر السنة",
			"Select Month": "اختر الشهر",
			"Select Language": "اختر اللغة"
		},
		daysOfWeek: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]
	},
	amz: {
		calendar: {
			"Calendar": "Aγmar",
			"Year": "Asaru",
			"Month": "Abrid",
			"Gregorian": "ⴰⵎⵉⵍⴰⴷ",
			"Islamic": "Amazigh",
			"Coptic": "Ⲥⲁⲕⲁⲣⲱⲥ",
			"Notes": "ⴰⵣⵔⵉⵙ",
			"Type your note here...": "Sɣiɣ asirem-inu...",
			"Save": "Sefṛeɣ",
			"Close": "Sefṛeɣ",
			"Select Calendar": "Fɣeɣ Aγmar",
			"Select Year": "Fɣeɣ Asaru",
			"Select Month": "Fɣeɣ Abrid",
			"Select Language": "Aγmar n Tmazight"
		},
		daysOfWeek: ["Aseggas", "Aneɣres", "Aneɣres", "Aneɣres", "Aneɣres", "Aneɣres", "Aneɣres"]
	},
	cop: {
		calendar: {
			"Calendar": "Ⲑⲟⲣⲙⲓⲁ",
			"Year": "Ⲙⲁⲣⲓⲁⲧ",
			"Month": "Ⲧⲉⲣⲙⲉⲧ",
			"Gregorian": "Ⲙⲉⲉⲧⲉⲣⲓⲁⲛ",
			"Islamic": "Ⲛⲟⲩⲧⲉⲣⲓⲁⲛ",
			"Coptic": "Ⲥⲁⲕⲁⲣⲱⲥ",
			"Notes": "Ⲛⲟⲧⲉⲥ",
			"Type your note here...": "Ⲛⲟⲧⲉⲥ ⲙⲙⲟⲩⲧⲉⲣⲓⲁⲛ...",
			"Save": "Ⲥⲉⲫⲟⲣⲉ",
			"Close": "Ⲛⲟⲧⲉⲥ",
			"Select Calendar": "Ⲥⲉⲧⲉⲣⲙⲉⲧ ⲙⲉⲓⲣⲉⲓⲧ",
			"Select Year": "Ⲥⲉⲧⲉⲣⲙⲉⲧ ⲙⲉⲓⲣⲉⲓⲧ",
			"Select Month": "Ⲥⲉⲧⲉⲣⲙⲉⲧ ⲙⲉⲓⲣⲉⲓⲧ",
			"Select Language": "ⲟⲩⲱⲧⲉⲣⲉⲧ"
		},
		daysOfWeek: ["Ⲱⲙⲁⲣⲧⲓⲁ", "Ⲫⲣⲁⲣⲧⲉ", "ⲣⲁⲃⲓⲁ", "ⲙⲁⲣⲓⲁ", "ⲧⲁⲃⲣⲓⲁ", "ⲙⲏⲧⲣⲓ", "ⲧⲁⲡⲧ"]
	}
};
// --- DOM Elements ---
const calendarElement = document.getElementById('calendar');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const calendarTypeSelect = document.getElementById('calendarType');
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const languageSelect = document.getElementById('languageSelect');
// --- Data ---
const gregorianMonths = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];
const islamicMonths = [
	'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
	'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaaban',
	'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
];
const copticMonths = [
	'Thout', 'Paopi', 'Hathor', 'Koiak', 'Tobi', 'Meshir',
	'Paremhat', 'Parmouti', 'Pashons', 'Paoni', 'Epip', 'Mesori'
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Note colors
const noteColors = [
	'#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', 
	'#ff9800', '#f44336', '#607d8b'
];
// Store notes in localStorage
let notes = JSON.parse(localStorage.getItem('calendarNotes')) || {};
let currentView = 'gregorian';
let currentYear, currentMonth;
let selectedLanguage = 'en';
// Initialize with current date
const currentDate = new Date();
const today = new Date();
currentYear = today.getFullYear();
currentMonth = today.getMonth();
// Main function to generate calendar
function generateCalendar(year, month) {
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
function getDateKey(year, month, day) {
	return `${year}-${month}-${day}`;
}
function showPopup(year, month, day) {
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
function closePopup() {
	popup.classList.remove('show');
	// Regenerate calendar to update any changes
	updateCalendarView();
}
// Close popup when clicking outside
document.addEventListener('click', (event) => {
	if (popup.classList.contains('show') && 
		!popupContent.contains(event.target) &&
		!event.target.classList.contains('day') &&
		!event.target.closest('.day')) {
		closePopup();
	}
});
// Date conversion functions
function convertToIslamic(year, month, day, returnObject = false) {
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
function convertToCoptic(year, month, day, returnObject = false) {
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
function populateYearMonthSelectors() {
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
function updateCalendarView() {
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
// Event listeners
yearSelect.addEventListener('change', updateCalendarView);
monthSelect.addEventListener('change', updateCalendarView);
calendarType.addEventListener('change', updateCalendarView);
// Initialize
updateCalendarView();
// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
	if (popup.classList.contains('show')) {
		if (e.key === 'Escape') closePopup();
		if (e.key === 'Enter' && e.ctrlKey) {
			document.getElementById('saveNote').click();
		}
	}
});
// Language switcher
// Consolidated updateLanguage function
function updateLanguage(lang = currentLanguage) {
	currentLanguage = lang;
	const t = translations[lang];
	// Update static texts
	document.querySelectorAll('[data-translate]').forEach(elem => {
		const key = elem.getAttribute('data-translate');
		const category = elem.getAttribute('data-category');
		if (t?.[category]?.[key]) {
			elem.textContent = t[category][key];
		}
	});
	// Update day headers
	document.querySelectorAll('.day-header').forEach((header, index) => {
		header.textContent = t?.daysOfWeek?.[index] || daysOfWeek[index];
	});
	// Update popup elements if they exist
	const saveBtn = document.getElementById('saveNote');
	const closeBtn = document.getElementById('closePopup');
	const noteInput = document.getElementById('noteInput');
	if (saveBtn) saveBtn.textContent = t?.calendar?.Save || 'Save';
	if (closeBtn) closeBtn.textContent = t?.calendar?.Close || 'Close';
	if (noteInput) noteInput.placeholder = t?.calendar?.['Type your note here...'] || 'Type your note here...';
	// Regenerate calendar to update day names
	updateCalendarView();
}
// Initialize language
updateLanguage('en');
// Event listener for language select
document.getElementById('languageSelect').addEventListener('change', (e) => {
	currentLanguage = e.target.value;
	updateLanguage();
});