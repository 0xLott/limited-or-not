<script lang="ts">
  import { goto } from "$app/navigation";
  import banner from "$lib/assets/Banner.svg";

  let searchQuery = "";
</script>

<section>
  <!-- -mb: pulls the element below upward, causing overlap with the banner -->
  <!-- Responsiveness allow the overlap distance to scales proportionally with the banner size -->
  <div class="flex flex-col items-center z-1 -mb-4 :sm-mb-8 md:-mb-16 lg:-mb-16 xl:-mb-24">
    <header>
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-nowrap">Limited or Not?</h1>
    </header>
  </div>

  <div class="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] z-0">
    <img class="w-full object-cover" src={banner} alt="Banner" />
  </div>

  <div
    class="flex flex-col items-center justify-center gap-4 z-1 -mt-4 :sm-mb-6 md:-mt-12 lt:-mb-16"
  >
    <h1 class="font-light text-center">Is this show a miniseries?</h1>

    <form
      class="flex flex-col items-center justify-center"
      on:submit|preventDefault={() =>
        goto(`/search/${encodeURIComponent(searchQuery)}`)}
    >
      <div class="relative w-full">
        <input
          id="search-input"
          type="text"
          placeholder="Search for a TV show"
          bind:value={searchQuery}
          class="pr-12"
        />

        <button
          class="text-accent-primary absolute right-3.5 top-1/2 -translate-y-1/2"
          type="submit"
        >
          🔎︎
        </button>
      </div>
    </form>
  </div>
</section>
