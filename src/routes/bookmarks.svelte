<script>
  import InformationPage from "../lib/Information_page.svelte";
  import PostWiget from './altfeed/_postWiget.svelte';
  import { onMount } from "svelte";

  import { cockpitOrgin } from "$lib/shared/host.js";
  let bookmarks = [];



  onMount(() => {
    const localstorage = localStorage.getItem("bookmarks");
    if (localstorage) {
      bookmarks = JSON.parse(localstorage);
      console.log(bookmarks);
    }
  });

</script>


{#each bookmarks as bookmark}
  <PostWiget post={{title: bookmark.title, coverpicurl: bookmark.poster ? cockpitOrgin + bookmark.poster : undefined}} />

{/each}

<InformationPage pagetitle={"Booksmars"}>
  <div style="text-align: center;"><h1>WIP</h1></div>
</InformationPage>