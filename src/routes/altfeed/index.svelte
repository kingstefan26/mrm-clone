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

    // if(res.status !== 200) {
    //   iserrror = true;
    //   return [];
    // }

    let json = await res.json();

    if(!json) {
      json = JSON.parse('{\n' +
        '  "entries": [\n' +
        '    {\n' +
        '      "_id": "62426f66aad26860dd2b9182",\n' +
        '      "title": "test",\n' +
        '      "author": "test",\n' +
        '      "chapters": [\n' +
        '        {\n' +
        '          "_id": "62426f4377b2de1b8f62a652",\n' +
        '          "name": "test",\n' +
        '          "chapter_media": [\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38bb7e4767a6400222"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/index.png?v=1648708320976"\n' +
        '            },\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38c0488a43543d8b72"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"\n' +
        '            },\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38cede4a53cb211d82"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/horisontal.png?v=1648708321328"\n' +
        '            }\n' +
        '          ],\n' +
        '          "_mby": "623f7bda63ec7431f5343042",\n' +
        '          "_by": "623f7bda63ec7431f5343042",\n' +
        '          "_modified": 1648521027,\n' +
        '          "_created": 1648521027,\n' +
        '          "_link": "chapters"\n' +
        '        },\n' +
        '        {\n' +
        '          "_id": "62426f50625b7b3d560d9a02",\n' +
        '          "name": "test2",\n' +
        '          "chapter_media": [\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38bb7e4767a6400222"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/index.png?v=1648708320976"\n' +
        '            },\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38c0488a43543d8b72"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"\n' +
        '            },\n' +
        '            {\n' +
        '              "meta": {\n' +
        '                "title": "",\n' +
        '                "asset": "62426f38cede4a53cb211d82"\n' +
        '              },\n' +
        '              "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/horisontal.png?v=1648708321328"\n' +
        '            }\n' +
        '          ],\n' +
        '          "_mby": "623f7bda63ec7431f5343042",\n' +
        '          "_by": "623f7bda63ec7431f5343042",\n' +
        '          "_modified": 1648521040,\n' +
        '          "_created": 1648521040,\n' +
        '          "_link": "chapters"\n' +
        '        }\n' +
        '      ],\n' +
        '      "poster": {\n' +
        '        "path": "https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"\n' +
        '      },\n' +
        '      "_mby": "623f7bda63ec7431f5343042",\n' +
        '      "_by": "623f7bda63ec7431f5343042",\n' +
        '      "_modified": 1648521062,\n' +
        '      "_created": 1648521062\n' +
        '    }\n' +
        '  ],\n' +
        '  "total": 1\n' +
        '}\n')
    }

    const posts = [];

    json.entries.forEach(post => {
      let obj = {
        id: post._id,
        author: undefined,
        lang: undefined,
        title: post.title,
        coverpicurl: undefined
      };

      if (post.author) {
        obj.author = post.author.shortname;
      }
      if (post.lang) {
        obj.lang = post.lang;
      }
      if (post.poster) {
        if(post.poster.path.startsWith('http')){
          obj.coverpicurl = post.poster.path
        }else {
          obj.coverpicurl = `/asset${post.poster.path}?q=2`;
        }
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


