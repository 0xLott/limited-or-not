<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    let { data } = $props();
</script>

<div>
    <a href="/">Back</a>

    <div class="series-info">
        <img src={data.series.poster_path} alt="Poster">
        <h1>{data.series.title}</h1>

        {#if data.series.isMiniseries}
            <p>✅ is a miniseries</p>
        {:else}
            <p>❌ is not a miniseries</p>
        {/if}
        
        <span>id: {data.series.id}</span>
        <span>Status: {data.series.status}</span>
        <span>Number of seasons:</span>
    </div>

    <div class="series-overview">
        <h2>Overview</h2>
        <p>{data.series.overview}</p>
    </div>

    <Footer />
</div>