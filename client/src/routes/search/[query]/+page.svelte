<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import TvSeriesCard from "$lib/components/TVSeriesCard.svelte";
  let { data } = $props();
</script>

<section class="px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 max-w-screen-2xl mx-auto">
  <div id="search-results-page" class="space-y-8">
    <a id="back-link" href="/" class="inline-block mb-4">Back</a>

    <div class="flex gap-2.5 flex-wrap">
      <h1 id="search-results-title" class="font-light">Showing results for</h1>
      <h1 id="search-results-title">"{data.query}"</h1>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10" id="search-results-list">
      {#each data.searchResults as result}
        <TvSeriesCard series={result} />
      {/each}
    </div>
  </div>
</section>
