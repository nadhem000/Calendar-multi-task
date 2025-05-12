
import { noteColors } from './constants.js';

// Store notes in localStorage
export let notes = JSON.parse(localStorage.getItem('calendarNotes')) || {};
export let currentView = 'gregorian';
export let selectedColor = noteColors[0];
export const currentDate = new Date();