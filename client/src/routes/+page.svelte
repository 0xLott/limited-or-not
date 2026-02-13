<script lang="ts">
  import { goto } from "$app/navigation";
  import TrendingCard from "$lib/components/TrendingCard.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let searchQuery = "";
</script>

<div>
  <div class="title">
    <h1>Limited or Not?</h1>
    <p>Is this show a miniseries?</p>
  </div>

  <div class="search">
    <input type="text" id="search-input" bind:value={searchQuery} />
    <button id="submit-search-btn" on:click={() => goto(`/search/${encodeURIComponent(searchQuery)}`)}>🔎</button>
  </div>

  <!-- <div class="trending">
    <h2>🚧 Trending miniseries 🚧</h2>
    <TrendingCard />
    <TrendingCard />
  </div> -->

  <Footer />
</div>
