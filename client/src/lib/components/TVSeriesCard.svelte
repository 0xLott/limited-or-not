<script lang="ts">
  import { goto } from "$app/navigation";

  export let series;

  function getReleaseYear(date: string) {
    return date.length != 0 ? date.slice(0, 4) : "Unknown";
  }
</script>

<button
  class="w-full bg-bg-surface text-left cursor-pointer hover:bg-bg-surface-elevated transition-colors p-4 flex flex-col gap-3"
  id="tv-series-card"
  on:click={() => goto(`/series/${encodeURIComponent(series.id)}`)}
  aria-label={`View details for ${series.title}`}
>
  <div class="w-full aspect-2/3 overflow-hidden" id="tv-series-poster">
    <img src={series.posterPath} alt="Poster" class="w-full h-full object-cover" />
  </div>

  <div class="flex flex-col gap-1">
    <h3 class="line-clamp-2" id="tv-series-title">{series.title}</h3>
    <span class="text-text-secondary" id="tv-series-year">({getReleaseYear(series.firstAirDate)})</span>
  </div>
</button>
