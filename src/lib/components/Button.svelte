<script>
  /** @type {'primary' | 'secondary'} */
  export let variant = 'primary';
  /** @type {string | undefined} */
  export let href = undefined;
  /** @type {string | undefined} */
  export let type = undefined;
</script>

{#if href}
  <a class="btn {variant}" {href}>
    <slot />
    <span class="arrow" aria-hidden="true">→</span>
  </a>
{:else}
  <button class="btn {variant}" {type} on:click>
    <slot />
    <span class="arrow" aria-hidden="true">→</span>
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.8rem 1.1rem;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.35s ease, transform 0.35s ease;
    border: 1px solid transparent;
  }
  .btn:hover { opacity: 0.85; }
  .btn:active { transform: translateY(1px); }
  .btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .primary {
    background: var(--accent);
    color: var(--primary);
  }
  /* Secondary is a bare text link with an arrow, as in the lab-site pattern. */
  .secondary {
    background: transparent;
    color: var(--text);
    padding-inline: 0.5rem;
  }
  .secondary:hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; }

  .arrow {
    display: inline-block;
    transition: transform 0.35s ease;
  }
  .btn:hover .arrow {
    transform: translateX(3px);
  }
</style>
