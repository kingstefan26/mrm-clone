<script>
  import PostWiget from "./_postWiget.svelte";

  import Spiner from "../../lib/spiner.svelte";

  import { cockpitOrgin } from "$lib/shared/host.js";

  import { onMount } from "svelte";

  const BASE_URL = cockpitOrgin;
  const BASE_IMAGE_URL = `${BASE_URL}/storage/uploads`;

  let iserrror = false;

  const fetchcocks = async () => {

    console.log('featching cocks');

    const res = await fetch("/altfeed/altfeed.json");

    if(res.status !== 200) {
      iserrror = true;
      return [];
    }

    const json = await res.json();

    const posts = [];

    json.entries.forEach(post => {
      let obj = {
        id: post._id,
        author: undefined,
        lang: undefined,
        title: post.title,
        coverpicurl: BASE_IMAGE_URL + "/2022/03/24/placeholder.png"
      };

      if (post.author) {
        obj.author = post.author.shortname;
      }
      if (post.lang) {
        obj.lang = post.lang;
      }
      if (post.poster) {
        obj.coverpicurl = `/asset${post.poster.path}?q=2`;
      }
      posts.push(obj);

    });

    return posts;
  };

  onMount(async () => {
    if (window) {
      const sessionfeed = sessionStorage.getItem("feed");
      if (sessionfeed) {
        const json = JSON.parse(sessionfeed);
        if(!json.length){
          iserrror = true;
          return;
        }
        feed = json;
      } else {
        const freshfeed = await fetchcocks();
        feed = freshfeed;
        sessionStorage.setItem("feed", JSON.stringify(freshfeed));
      }
    } else {
      feed = await fetchcocks();
    }


  });

  let feed = [];

</script>

<style>

    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        max-width: 100%;
    }

    .error {
        text-align: center;
    }

    #refresh {
        color: black;
    }

</style>


<svelte:head>
  <title>AltFeed</title>
</svelte:head>

<section>
  <button id="refresh" on:click={() => {location.reload(); sessionStorage.removeItem("feed");}}>
    Refresh cache
  </button>
</section>

{#if iserrror}
  <div class="error">
      <h1>Error</h1>
      <p>
        Something went wrong.
      </p>
    </div>
{/if}


{#if !feed}
  <div style="display: flex; justify-content: center; align-content: center; height: 100%">
    <Spiner />
  </div>
{:else }
  <div class="content">
    {#each feed as item}
      <div style="flex-basis: min-content; margin: 5px">
        <PostWiget post={item} />
      </div>
    {/each}
  </div>
{/if}


