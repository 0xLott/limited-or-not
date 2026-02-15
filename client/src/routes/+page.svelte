<script lang="ts">
  import { goto } from "$app/navigation";
  import banner from "$lib/assets/Banner.svg";

  let searchQuery = "";
</script>

<section>
  <div class="flex flex-col items-center">
    <header>
      <h1 class="text-8xl">Limited or Not?</h1>
    </header>
  </div>

  <div class="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <img src={banner} class="w-full object-cover" alt="Banner" />
  </div>

  <div class="flex flex-col items-center justify-center">
    <h1 class="font-light">Is this show a miniseries?</h1>

    <form
      on:submit|preventDefault={() =>
        goto(`/search/${encodeURIComponent(searchQuery)}`)}
      class="flex flex-col items-center justify-center"
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
          type="submit"
          class="text-accent-primary absolute right-3.5 top-1/2 -translate-y-1/2"
        >
          🔎︎
        </button>
      </div>
    </form>
  </div>
</section>
