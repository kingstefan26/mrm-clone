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

      if (post.lang) {
        metadata.lang = post.lang;
      }

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

  export let post;
  export let metadata;



  const BASE_URL = "http://192.168.1.38";


  const fetchchapter = (async () => {
    if (!post) return [];

    const chapters = [];


    post.chapterss.forEach(chapter => {
      let allmedia = [];

      chapter.chaptermedia.forEach(media => {
        allmedia.push({
          url: BASE_URL + media.path,
          height: 200,
          witdh: 200,
          name: "chapter name here"
        });
      });


      chapters.push(allmedia);
    });

    return chapters;
  })();

</script>


<!--<svelte:head>-->
<!--  {#if post}-->
<!--    <title>{post.title}</title>-->
<!--  {/if}-->
<!--</svelte:head>-->


{#if $doublePageview}

  <Dobulepage {doublePageview} {fetchchapter} {post} {metadata} />

{:else }

  <Singlepage {doublePageview} {fetchchapter} {post} />

{/if}
