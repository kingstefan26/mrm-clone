<script context="module">
  export async function load({ params }) {
    // const res = await fetch(`http://192.168.1.38:1337/api/posts?filters[title][$eq]=${params.slug}&populate=*`);
    let res
    try {
      res = await fetch(`http://192.168.1.38:3000/altfeed/post/${params.slug}.json`);
    } catch (e) {
      console.log(e);
    }


    if (res.ok && res.status === 200) {
      let data = await res.json();

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
    }else {
      const data = JSON.parse('{"entries":[{"_id":"62426f66aad26860dd2b9182","title":"test","author":"test","chapters":[{"_id":"62426f4377b2de1b8f62a652","name":"test","chapter_media":[{"meta":{"title":"","asset":"62426f38bb7e4767a6400222"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/index.png?v=1648708320976"},{"meta":{"title":"","asset":"62426f38c0488a43543d8b72"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"},{"meta":{"title":"","asset":"62426f38cede4a53cb211d82"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/horisontal.png?v=1648708321328"}],"_mby":"623f7bda63ec7431f5343042","_by":"623f7bda63ec7431f5343042","_modified":1648521027,"_created":1648521027,"_link":"chapters"},{"_id":"62426f50625b7b3d560d9a02","name":"test2","chapter_media":[{"meta":{"title":"","asset":"62426f38bb7e4767a6400222"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/index.png?v=1648708320976"},{"meta":{"title":"","asset":"62426f38c0488a43543d8b72"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"},{"meta":{"title":"","asset":"62426f38cede4a53cb211d82"},"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/horisontal.png?v=1648708321328"}],"_mby":"623f7bda63ec7431f5343042","_by":"623f7bda63ec7431f5343042","_modified":1648521040,"_created":1648521040,"_link":"chapters"}],"poster":{"path":"https://cdn.glitch.global/17cc8f98-08bf-484d-a833-5a8e854d7d9f/vertical.png?v=1648708320939"},"_mby":"623f7bda63ec7431f5343042","_by":"623f7bda63ec7431f5343042","_modified":1648521062,"_created":1648521062}],"total":1}')
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

    console.log(post);


    post.chapters.forEach(chapter => {
      let allmedia = [];

      chapter.chapter_media.forEach(media => {
        allmedia.push({
          url: media.path.startsWith('http') ? media.path : '/asset' + media.path + (savedata ? '?q=1' : ''),
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
