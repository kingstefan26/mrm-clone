<script>
    import Lazy from '$lib/Lazy.svelte';
    import SessionCashe from '$lib/sessionCache.svelte';
    let a = []
    a.length = 1000;

    let data

    const get = () => {
        return "a";
    }

</script>


<SessionCashe getter={get} bind:data />

<h2>{data}</h2>

<h1>test</h1>



{#each a as i}
    <Lazy fadeOption={{delay: 500, duration: 1000}} height={300} offset={0}>
        <img height="300" width="100%" alt="" src="https://via.placeholder.com/150/{Math.floor(100000 + Math.random() * 900000)}" />
    </Lazy>
{/each}