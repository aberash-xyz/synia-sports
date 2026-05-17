<script>
  import { t, toggleLocale } from '$lib/i18n.js';
</script>

<button class="lang-toggle" on:click={toggleLocale} aria-label={$t('lang.aria')}>
  {$t('lang.toggle')}
</button>

<style>
  .lang-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.75rem;
    height: 2.25rem;
    padding-inline: 0.75rem;
    border-radius: var(--radius-button);
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    font-family: var(--font-body);
    font-size: var(--fs-small);
    font-weight: var(--fw-semibold);
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  .lang-toggle:hover {
    background: var(--bg-invert);
    color: var(--text-invert);
  }
  .lang-toggle:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
