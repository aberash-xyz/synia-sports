// Weekly Telegram Visibility Index. One JSON per week (named by its Monday, EAT),
// committed by the synia-data bot (bot/weekly.ts); chart SVGs live in static/weekly/.
const files = import.meta.glob('./weekly/*.json', { eager: true, import: 'default' });

/** Newest first. */
export const weeks = Object.values(files).sort((a, b) => b.week.localeCompare(a.week));
