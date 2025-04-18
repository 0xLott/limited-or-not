<script lang="ts">
  export let series;
</script>

<div id="tv-series-card">
  <div id="tv-series-poster">
    <img src={series.posterPath} alt="Poster" />
  </div>
  <h2 id="tv-series-title">{series.title}</h2>
  <p id="tv-series-test">test</p>
</div>
