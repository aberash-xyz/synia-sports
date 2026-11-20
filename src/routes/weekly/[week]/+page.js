import { error } from '@sveltejs/kit';
import { weeks } from '$lib/weekly.js';

export const entries = () => weeks.map((w) => ({ week: w.week }));

export function load({ params }) {
  const week = weeks.find((w) => w.week === params.week);
  if (!week) error(404, 'Not found');
  return { week };
}
