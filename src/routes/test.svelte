<script>
    import Lazy from '$lib/Lazy.svelte';
    import SessionCashe from '$lib/sessionCache.svelte';
    let a = []
    a.length = 1000;

    let data

    const get = () => {
        return "a";
    }

    import { onMount} from "svelte";


    async function getImageBlob(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    onMount(async () => {
        const myImage = new Image();
        myImage.src = await getImageBlob('https://picsum.photos/200/300');
        document.getElementById('myImg').appendChild(myImage);

    })

</script>


<!--<SessionCashe getter={get} bind:data />-->

<!--<h2>{data}</h2>-->

<h1>test</h1>


<div id="myImg"></div>


<!--{#each a as i}-->
<!--    <Lazy fadeOption={{delay: 500, duration: 1000}} height={300} offset={0}>-->
<!--        <img height="300" width="100%" alt="" src="https://via.placeholder.com/150/{Math.floor(100000 + Math.random() * 900000)}" />-->
<!--    </Lazy>-->
<!--{/each}-->