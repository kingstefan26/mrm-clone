<script>
  import PostWiget from "./_postWiget.svelte";

  import Spiner from "../../lib/spiner.svelte";

  import { onMount } from "svelte";

  const BASE_URL = "http://192.168.1.38";
  const BASE_API_URL = `${BASE_URL}/api`;
  const BASE_IMAGE_URL = `${BASE_URL}/storage/uploads`;

  const fetchcocks = async () => {

    const res = await fetch('/altfeed/altfeed.json');
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
        obj.coverpicurl = BASE_URL + '/' + post.poster.path;
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


<style>

    .wrapper {
        display: grid;
        grid-template-columns: 70%;
        place-items: center;
        padding: 0 10% 0 10%;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        max-width: 100%;
    }

</style>
