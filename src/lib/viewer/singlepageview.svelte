<script>
  export let fetchchapter;
  export let post = undefined;
  export let doublePageview;

  import Layout from "$lib/_classiclayout.svelte";
  import Lazy from "$lib/Lazy.svelte";
</script>

<Layout>
  <div class="singlepage-wrapper">
    <div class="content singlepage-content">
      {#if !post}
        <h1>Post not Fount</h1>
      {:else}
        <button class="switchvieverstylebtn" on:click={() => { $doublePageview = !$doublePageview; }}>Reader mode</button>
        <h2>{post.title}</h2>


        {#await fetchchapter}
          <p>...waiting</p>
        {:then chapters}

          {#each chapters as chapter}
            <div>
              {#each chapter as image}
                <div class="image-wrapper">
                  <Lazy height={image.height} offset="300" placeholder="{image.name}">
                    <img style="margin-left: auto; margin-right: auto; display: block"
                         src="{image.url}"
                         alt="{image.name}">
                  </Lazy>
                </div>

              {/each}
            </div>


          {/each}

        {:catch error}
          <p>An error occurred!</p>
        {/await}
      {/if}
    </div>

  </div>
</Layout>


<style>
    .switchvieverstylebtn {
        color: #ababab;
        border-radius: 0;
        background-color: #2c2c2c;
        border: 0;
        padding: 2px;
        margin: 2px
    }
    .image-wrapper {
        margin-bottom: 2px;
    }

    img {
        max-width: 100%;
        object-fit: scale-down;
    }

    .content {
        padding: 20px 10px 10px;
        box-shadow: 0 1px 3px 0 #141414;
        border-top: 2px solid #999;
        margin-top: 20px;
    }


    .singlepage-wrapper {
        display: flex;
        justify-content: center;
    }

    .singlepage-content {
        width: 70%;
    }


    @media screen and (max-width: 500px) {
        .content {
            width: 100%;
            padding: 10px 0 0 0;
            margin: 0;
        }
    }
</style>