<script>
  export let fetchchapter;
  export let post = undefined;
  export let metadata = undefined;
  export let doublePageview;

  import Spinner from "$lib/spiner.svelte";
  import ArrowControl from "$lib/viewer/arrowkeys.svelte";
  import { onMount } from "svelte";

  import Lazy from "$lib/Lazy.svelte";
  import logo from "$lib/logo-128.png";


  const getpreviosimage = (chapters) => {
    // if we are not at the start
    if (currentimage > 0) {
      return currentimage - 1;

    }
    // if we are at the start
    else {
      // check if current chapter is 0
      // if so return current image
      if (currentchapter > 0) {

        // if we go back a chapter is it null
        if (currentchapter - 1 >= 0) {
          // if the previuos chapter is the start or something after that
          // go back a chapter
          currentchapter -= 1;
          // and return the end of the previos (now current) chapter
          return chapters[currentchapter].length - 1;
        }
      } else {
        return currentimage;
      }

    }
  };

  const getnextimage = (chapters) => {
    // if current image + 1 exisist switch to it
    if (currentimage < chapters[currentchapter].length - 1) {
      return currentimage + 1;
    } else {
      if (currentchapter + 1 < chapters.length) {
        currentimage = 0;
        currentchapter += 1;
        return currentimage;
      } else {
        return currentimage;
      }
    }
  };

  let currentchapter = 0;


  let currentimage = 0;

  // ty for full screen stuff https://codechips.me/lets-build-a-svelte-fullscreen-component/

  let fullscreencontainer;
  let isFullScreen = false;

  function togglefullscreen() {

    const fullscreenSupport = !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled ||
      false
    );

    if (!fullscreenSupport) return;

    if (!isFullScreen) {
      const requestFS = (
        fullscreencontainer.requestFullscreen ||
        fullscreencontainer.mozRequestFullScreen ||
        fullscreencontainer.webkitRequestFullscreen ||
        fullscreencontainer.msRequestFullscreen
      ).bind(fullscreencontainer);

      requestFS();
    } else {
      const exitFullscreen = (
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen
      ).bind(document);
      exitFullscreen(fullscreencontainer);
    }

    isFullScreen = !isFullScreen;

  }

  onMount(() => {
    const bookmark = localStorage.getItem("bookmark" + post._id);
    if (bookmark) {
      let bookmarkobj = JSON.parse(bookmark);
      currentchapter = bookmarkobj.chapter;
      currentimage = bookmarkobj.image;
    }
  });

  let savebookmark = () => {
    let bookmark = {
      chapter: currentchapter,
      image: currentimage
    };
    localStorage.setItem("bookmark" + post._id, JSON.stringify(bookmark));
  };


</script>


<div id="container" bind:this={fullscreencontainer}>

  <div class="nav-wrapper">
    <div class="nav">
      <button class="backbtn" onclick="history.back()">Go Back</button>

      <button class="extraoptionbtn"
              on:click={() => { $doublePageview = !$doublePageview }}>
        Exit Reader Mode
      </button>

      <button class="extraoptionbtn" on:click={togglefullscreen}>
        {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>

      <button class="bookmark" on:click={savebookmark}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M16 2v17.582l-4-3.512-4 3.512v-17.582h8zm2-2h-12v24l6-5.269 6 5.269v-24z" />
        </svg>
      </button>


      <a href="/" class="logo">
        <img width="48" height="48" src="{logo}" alt="logo">
      </a>
    </div>
  </div>

  <div class="content">
    {#if !post}
      <h1>404</h1>
    {/if}


    {#if post}
      {#await fetchchapter}
        <div class="load-wrapper">
          <Spinner />
        </div>
      {:then chapters}

        <div class="head-wrapper">
          <div class="head">
            <h2>{post.title}</h2>
            {#if metadata.description}
              <p>{metadata.description}</p>
            {/if}

            <select class="chapter-picker" bind:value={currentchapter} id="chapter">
              {#each chapters as chapter, index}
                <option value="{index}">ch.{index}</option>
              {/each}
            </select>

            <select class="image-picker" bind:value={currentimage} id="image">
              {#each chapters[currentchapter] as image, index}
                <option value="{index}">{index}</option>
              {/each}
            </select>
          </div>


        </div>

        <div class="body">

          <Lazy fadeOption={ {delay: 10, duration: 1000} } offset={0}

                placeholder="{chapters[currentchapter][currentimage].name}">
            <img src="{chapters[currentchapter][currentimage].url}" alt="{chapters[currentchapter][currentimage].name}">
          </Lazy>

        </div>

        <div class="controls">

          <button class="arrows"
                  on:click={() => { currentimage = getpreviosimage(chapters); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
            </svg>
          </button>


          <button class="arrows"
                  on:click={() => { currentimage = getnextimage(chapters) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z" />
            </svg>
          </button>

          <ArrowControl on:right={() => { currentimage = getnextimage(chapters) }}
                        on:left={() => { currentimage = getpreviosimage(chapters) }} />

        </div>


      {:catch error}
        <p>An error occurred!</p>
      {/await}
    {/if}

  </div>

</div>

<style>
    /*accual layout*/

    :root {
        background: #343434;
    }

    #container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        background: #343434;
        color: black;
    }


    @media screen and (max-width: 1000px) {
        #container {
            width: 100vw;
        }
    }


    .logo {
        width: 70%;
        text-align: end;
    }

    .bookmark {
        /*border: none;*/
        display: block;
        border: none;
        background: none;
        fill: #d2d2d2;
    }

    .nav-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        padding: 2px;
    }

    .nav {
        display: flex;
        width: 100%;
        max-width: 800px;
    }

    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }


    .head-wrapper {
        box-shadow: 0 1px 5px 0 #141414;
        margin-bottom: 10px;
        height: min-content;
        padding: 10px;
        display: flex;
        justify-content: center;
    }


    .head {
        box-sizing: unset;
        display: grid;
        height: auto;
        grid-template-columns: 1fr 40px 40px;
    }


    .body {
        padding: 10px;
        display: flex;
        justify-content: center;
        /*width: 80%;*/
    }

    .body img {
        max-height: calc(100vh - 200px);
        max-width: 100%;
        object-fit: scale-down;
    }

    .body * {
        object-fit: scale-down;
    }


    .arrows {
        margin: 0 10px 0 10px;
        /*padding: 3px;*/
        text-align: center;
        width: min-content;
        height: min-content;

        background: #343434;
        border: none;
        /*background: #2b2b2b;*/
        /*border-radius: 3px;*/
        /*border: 1px solid black;*/
    }

    .arrows svg {
        width: 24px;
        height: 24px;
        fill: #797979;
    }

    .controls {
        box-shadow: 0 1px 5px 0 #141414;
        padding: 10px;
        height: 30px;
        z-index: 1;
        top: calc(100vh - 50px);
        position: absolute;
        width: 35vw;
        left: calc(50% - 17.5vw);
        background: #343434;
        display: flex;
        justify-content: center;
    }


    /*eww*/
    .chapter-picker {
        background: #2b2b2b;
        display: block;
        border-radius: 3px;
        border: 1px solid black;
        padding: 4px;
    }

    .image-picker {
        background: #2b2b2b;
        display: block;
        border-radius: 3px;
        border: 1px solid black;
        padding: 4px;
    }

    .load-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .backbtn {
        color: white;
        background-color: black;
        border-radius: 2px;
        padding: 3px;
        text-decoration: none;
        border: none;
        height: 48px;
    }

    .extraoptionbtn {
        height: 48px;
        min-height: min-content;
        color: #ababab;
        border-radius: 0;
        background-color: #2c2c2c;
        border: 0;
        padding: 2px;
        margin: 2px
    }


    .arrows:disabled {
        cursor: not-allowed;
        color: #2b2b2b;
    }

</style>