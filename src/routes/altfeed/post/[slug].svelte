<script context="module">
  export async function load({ params }) {
    // const res = await fetch(`http://192.168.1.38:1337/api/posts?filters[title][$eq]=${params.slug}&populate=*`);

    const res = await fetch(`http://192.168.1.38:3000/altfeed/post/${params.slug}.json`);



    const data = await res.json();

    if (res.status === 200) {

      const post = data.entries[0];

      let metadata = {
        description: undefined,
        author_long: undefined,
        lang: undefined
      };

      // if (post.lang) {
      //   metadata.lang = post.lang;
      // }

      if (post.author) {
        metadata.author = post.author.shortname;
      }

      return {
        props: { post, metadata }
      };
    }
  }
</script>


<!-- http://localhost:1337/api/posts?filters[title][$eq]=City%20Boy%20to%20Seto%20no%20Shima%203&populate=chapters,localizations,chapter_media-->
<script>
  import Dobulepage from "$lib/viewer/dobulepage.svelte";
  import Singlepage from "$lib/viewer/singlepageview.svelte";
  import doublePageview from '$lib/shared/stores/doublepageview.js';
  import { cockpitOrgin } from "$lib/shared/host.js";

  export let post;
  export let metadata;

  const BASE_URL = cockpitOrgin;

  let savedata;

  const fetchchapter = (async () => {
    if (!post) return [];

    const chapters = [];



    if(navigator){
      if ("connection" in navigator) {
        if (navigator.connection.saveData === true) {
          savedata = true;
        }
      }
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      savedata = true;
    }



    post.chapters.forEach(chapter => {
      let allmedia = [];

      chapter.chapter_media.forEach(media => {
        allmedia.push({
          url: '/asset' + media.path + (savedata ? '?q=1' : ''),
          height: 200,
          witdh: 200,
          name: "hehe"
        });
      });


      chapters.push(allmedia);
    });

    return chapters;
  })();

  // import images from '$lib/shared/stores/images.js';


  async function getImage(url) {
    // console.log(url);
    // if ($images.has(url)) {
    //   return $images.get(url);
    // } else {
    //
    //   const response = await fetch(url);
    //   const blob = await response.blob();
    //   const image = URL.createObjectURL(blob);
    //
    //   $images.set(url, image);
    //   return image;
    //
    // }

    // if you ask why am i going to all that trouble to get the url,
    // well in case i do make the app offline i can have a centalied control of the urls
    return url;
  }


</script>


<svelte:head>
  {#if post}
    <title>{post.title} - Mrm-clone</title>
  {/if}

  <meta name="title" content="{post.title}, read now on Mrm-clone">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{post.title}, read now on Mrm-clone">

  <meta property="twitter:title" content="{post.title}, read now on Mrm-clone">

  <meta property="twitter:url" content="https://mrm-clone.vercel.app/">

  {#if post.description}
    <meta name="description" content="{post.description}">
    <meta property="og:description" content="{post.description}">
    <meta property="twitter:description" content="{post.description}">
  {/if}
  {#if post.poster.path}
    <meta property="twitter:image" content="{BASE_URL + post.poster.path}">
    <meta property="og:image" content="{BASE_URL + post.poster.path}">
    <meta property="twitter:card" content="{BASE_URL + post.poster.path}">
  {/if}


</svelte:head>



{#if $doublePageview}

  <Dobulepage {doublePageview} {fetchchapter} {post} {getImage} {metadata} />

{:else }

  <Singlepage {doublePageview} {fetchchapter} {post} {getImage} />

{/if}
