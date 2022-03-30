<script context="module">
  export async function load({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const data = await res.json();

    const postdata = data[params.slug];

    if (res.status === 200) {
      return {
        props: {
          post: postdata
        }
      };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>


<div class="content">
  <center>
    <h2>{post.title}</h2>
    <picture>
      <img src={post.url} alt="post" width="600" loading="lazy">
    </picture>
  </center>

</div>

<style>

    img {
        max-width: 100%;
        object-fit: scale-down;
    }

    .content :global(h2) {
        font-size: 1.4em;
        font-weight: 500;
    }

    .content :global(pre) {
        background-color: #f9f9f9;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        border-radius: 2px;
        overflow-x: auto;
    }

    .content :global(pre) :global(code) {
        background-color: transparent;
        padding: 0;
    }

    .content :global(ul) {
        line-height: 1.5;
    }

    .content :global(li) {
        margin: 0 0 0.5em 0;
    }
</style>