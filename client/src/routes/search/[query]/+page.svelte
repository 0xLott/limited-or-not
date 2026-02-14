<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import TvSeriesCard from "$lib/components/TVSeriesCard.svelte";
  let { data } = $props();
</script>

<div id="search-results-page">
  <a id="back-link" href="/">Back</a>

  <div class="flex gap-2.5">
    <h1 id="search-results-title" class="font-light">Showing results for</h1>
    <h1 id="search-results-title">"{data.query}"</h1>
  </div>

  <div id="search-results-list">
    {#each data.searchResults as result}
      <TvSeriesCard series={result} />
    {/each}
  </div>
</div>
