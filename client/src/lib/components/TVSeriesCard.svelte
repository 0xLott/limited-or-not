<script lang="ts">
  import { goto } from "$app/navigation";

  export let series;

  function getReleaseYear(date: string) {
    return date.slice(0, 4);
  }
</script>

<div id="tv-series-card">
  <div id="tv-series-poster">
    <img src={series.posterPath} alt="Poster" />
  </div>

  <h2 id="tv-series-title">{series.title}</h2>
  <span>{getReleaseYear(series.firstAirDate)} </span>

  <button
    on:click={() => goto(`/series/${encodeURIComponent(series.id)}`)}
    aria-label={`View details for ${series.title}`}
  >
    ▶
  </button>
</div>
