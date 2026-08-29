<script>
  import { page } from '$app/stores';
  import { t } from '$lib/i18n.js';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$page.status} — {$t('brand.name')}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="section section-lg">
  <div class="container container-md error-page">
    <span class="eyebrow">{$page.status === 404 ? $t('notFound.eyebrow') : `Error ${$page.status}`}</span>
    <h1>{$page.status === 404 ? $t('notFound.title') : $page.error?.message}</h1>
    <p class="lede">{$t('notFound.lede')}</p>

    <div class="error-actions">
      <Button href="/">{$t('notFound.home')}</Button>
      <Button href="/writing" variant="secondary">{$t('notFound.writing')}</Button>
    </div>
  </div>
</section>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .error-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
  }
</style>
