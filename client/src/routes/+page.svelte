<script lang="ts">
  import { goto } from "$app/navigation";
  import banner from "$lib/assets/Banner.svg";

  let searchQuery = "";
</script>

<section
  class="h-screen flex flex-col justify-center items-center overflow-hidden"
>
  <!-- Responsiveness allow the overlap distance to scales proportionally with the banner size -->
  <!-- -mb: pulls the element below upward, causing overlap with the banner -->
  <div>
    <div class="flex flex-col items-center w-full max-w-screen-xl">
      <header class="z-10 -mb-[3%]">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center px-4"
        >
          Limited or Not?
        </h1>
      </header>

      <div class="w-full max-w-full">
        <img class="w-full h-auto" src={banner} alt="Banner" />
      </div>

      <div class="flex flex-col items-center w-[60%] gap-4 z-10 -mt-[3%] px-4">
        <h1
          class="font-light text-center text-xs sm:text-base md:text-2xl lg:text-3xl"
        >
          Is this show a miniseries?
        </h1>

        <form
          on:submit|preventDefault={() =>
            goto(`/search/${encodeURIComponent(searchQuery)}`)}
          class="w-full"
        >
          <div class="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search for a TV show"
              bind:value={searchQuery}
              class="pr-12 w-full"
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
    </div>
  </div>
</section>