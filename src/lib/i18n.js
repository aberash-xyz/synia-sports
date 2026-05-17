import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import en from './translations/en.js';
import am from './translations/am.js';

const dicts = { en, am };
const STORAGE_KEY = 'synia.locale';

function initialLocale() {
  if (!browser) return 'en';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'am') return stored;
  return 'en';
}

export const locale = writable(initialLocale());

if (browser) {
  locale.subscribe((value) => {
    localStorage.setItem(STORAGE_KEY, value);
    document.documentElement.setAttribute('lang', value);
  });
}

/** Reactive translator: usage in markup as `$t('home.title')` */
export const t = derived(locale, ($locale) => {
  return (key) => lookup(dicts[$locale] || dicts.en, key) ?? key;
});

/** Imperative helper for non-reactive contexts. */
export function tNow(key) {
  const $locale = get(locale);
  return lookup(dicts[$locale] || dicts.en, key) ?? key;
}

export function setLocale(next) {
  if (next !== 'en' && next !== 'am') return;
  locale.set(next);
}

export function toggleLocale() {
  locale.update((v) => (v === 'en' ? 'am' : 'en'));
}

function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict);
}
