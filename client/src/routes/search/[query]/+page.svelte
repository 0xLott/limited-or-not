<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import TvSeriesCard from "$lib/components/TVSeriesCard.svelte";
  let { data } = $props();
</script>

<div id="search-results-page">
  <a id="back-link" href="/">Back</a>

  <h1 id="search-results-title">Search results for "{data.query}"</h1>

  <div id="search-results-list">
    {#each data.searchResults as result}
      <TvSeriesCard series={result} />
    {/each}
  </div>
</div>
