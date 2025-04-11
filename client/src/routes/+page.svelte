<script lang="ts">
	import TrendingCard from '$lib/components/TrendingCard.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<div>
    <div class="title">
        <h1>Limited or Not?</h1>
        <span>Is this show a miniseries?</span>
    </div>

    <div class="search">
        <input type="text" id="search-input">
        <button id="submit-search-btn">🔎</button>
    </div>

    <div class="trending">
        <h2>🚧 Trending miniseries 🚧</h2>
        <TrendingCard />
        <TrendingCard />
    </div>

    <Footer />
</div>