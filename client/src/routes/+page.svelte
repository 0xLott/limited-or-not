<script lang="ts">
  import { goto } from "$app/navigation";
  import TrendingCard from "$lib/components/TrendingCard.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let searchQuery = "";
</script>

<div>
  <div class="title">
    <h1 class="text-8xl">Limited or Not?</h1>
    <h1 class="font-light">Is this show a miniseries?</h1>
  </div>

  <div class="search">
    <input type="text" id="search-input" placeholder="Search for a TV Show" bind:value={searchQuery}/>
    <button id="submit-search-btn" on:click={() => goto(`/search/${encodeURIComponent(searchQuery)}`)}>🔎</button>
  </div>

  <!-- <div class="trending">
    <h2>🚧 Trending miniseries 🚧</h2>
    <TrendingCard />
    <TrendingCard />
  </div> -->

  <Footer />
</div>
