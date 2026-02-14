<script lang="ts">
  import { goto } from "$app/navigation";
  let searchQuery = "";
</script>

<div class="min-h-[calc(100vh-10rem)] flex items-center justify-center">
  <div class="w-full max-w-4xl px-6 text-center flex flex-col gap-3">
    
    <header class="flex flex-col gap-2">
      <h1 class="text-6xl md:text-8xl tracking-tight">
        Limited or Not?
      </h1>
      <h1 class="font-light">
        Is this show a miniseries?
      </h1>
    </header>

    <form
      class="relative w-full"
      on:submit={(e) => {
        e.preventDefault();
        goto(`/search/${encodeURIComponent(searchQuery)}`);
      }}    
    >
      <label for="search-input" class="sr-only">
        Search for a TV show
      </label>

      <input
        id="search-input"
        type="text"
        placeholder="Search for a TV show"
        bind:value={searchQuery}
        class="w-full h-14 px-3 pr-14 border bg-transparent focus:outline-none"
      />

      <button
        type="submit"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        🔎
      </button>
    </form>

  </div>
</div>

