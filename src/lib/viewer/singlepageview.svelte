<script>
  export let fetchchapter;
  export let getImage;
  export let post = undefined;
  export let doublePageview;

  import Layout from "$lib/_classiclayout.svelte";
  import Lazy from "$lib/Lazy.svelte";

  let currentChapter = 0;

</script>

<Layout>
  <div class="singlepage-wrapper">
    <div class="content singlepage-content">
      {#if !post}
        <h1>Post not Fount</h1>
      {:else}
        <button class="switchvieverstylebtn" on:click={() => {history.back();}}>Go Back</button>
        <button class="switchvieverstylebtn" on:click={() => { $doublePageview = !$doublePageview; }}>Reader mode
        </button>
        <h2>{post.title}</h2>


        {#await fetchchapter}
          <p>...waiting</p>
        {:then chapters}

          <h1 id="chaptertitle">Chapter: {currentChapter}</h1>
          {#each chapters as chapter, index}
            {#if currentChapter === index}
              {#each chapter as image, imgindex}
                <div class="image-wrapper">
                  <Lazy height={image.height} offset="300" placeholder="{image.name}">
                    {#await getImage(image.url)}
                      <p>loading image</p>
                    {:then imageurl}
                      <img style="margin-left: auto; margin-right: auto; display: block" src="{imageurl}"
                           alt="{image.name}">
                    {:catch _}
                      <p>error</p>
                    {/await}


                  </Lazy>


                </div>
              {/each}
            {/if}
          {/each}


          {#if chapters.length > 1}
            <div id="linkwrapper">

              {#if currentChapter - 1 >= 0}
                <a href="#{currentChapter - 1}" on:click={() => {currentChapter--;}}>« Previous</a>
              {/if}

              {#each chapters as chapter, index}
                <a class="{index === currentChapter ? 'iamselected' : ''}" href=""
                   on:click={() => {currentChapter = index;}}>{index}</a>
              {/each}

              {#if currentChapter + 1 < chapters.length}
                <a href="#{currentChapter + 1}" on:click={() => {currentChapter++;}}>Next »</a>
              {/if}

            </div>
          {/if}


        {:catch error}
          <p>An error occurred!</p>
        {/await}
      {/if}
    </div>

  </div>
</Layout>


<style>
    .iamselected {
        color: red;
    }

    #linkwrapper * {
        background-color: #333;
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        color: #70bce2;
        padding: 6px;
        font-weight: 400;
        margin: 0 4px;
        font-size: 1.6rem;
    }

    #linkwrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

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