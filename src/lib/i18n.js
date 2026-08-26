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
  return (key) => resolve($locale, key);
});

/** Imperative helper for non-reactive contexts. */
export function tNow(key) {
  return resolve(get(locale), key);
}

export function setLocale(next) {
  if (next !== 'en' && next !== 'am') return;
  locale.set(next);
}

export function toggleLocale() {
  locale.update((v) => (v === 'en' ? 'am' : 'en'));
}

/**
 * Resolve a key in the active locale, falling back to English.
 * Long-form pages are authored in English only; without this fallback a
 * missing key renders as the raw key string.
 */
function resolve($locale, key) {
  const value = lookup(dicts[$locale] || dicts.en, key);
  if (value != null) return value;
  return lookup(dicts.en, key) ?? key;
}

function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? obj : obj[part]), dict);
}
