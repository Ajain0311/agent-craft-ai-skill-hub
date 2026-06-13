import { format, parseISO } from 'date-fns';

/**
 * Formats a date string or Date object into a consistent, readable format.
 * @param dateInput The date string (e.g., ISO 8601) or Date object to format.
 * @returns A formatted date string (e.g., "Jan 01, 2023").
 */
export function formatSkillDate(dateInput: string | Date): string {
  if (!dateInput) {
    return 'N/A';
  }

  let date: Date;
  if (typeof dateInput === 'string') {
    date = parseISO(dateInput);
  } else {
    date = dateInput;
  }

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date input provided to formatSkillDate:', dateInput);
    return 'Invalid Date';
  }

  return format(date, 'MMM dd, yyyy');
}

/**
 * Formats a date string or Date object into a more detailed format, including time.
 * @param dateInput The date string (e.g., ISO 8601) or Date object to format.
 * @returns A formatted date string (e.g., "Jan 01, 2023 at 10:30 AM").
 */
export function formatDetailedSkillDate(dateInput: string | Date): string {
  if (!dateInput) {
    return 'N/A';
  }

  let date: Date;
  if (typeof dateInput === 'string') {
    date = parseISO(dateInput);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) {
    console.error('Invalid date input provided to formatDetailedSkillDate:', dateInput);
    return 'Invalid Date';
  }

  return format(date, 'MMM dd, yyyy \'at\' hh:mm a');
}
