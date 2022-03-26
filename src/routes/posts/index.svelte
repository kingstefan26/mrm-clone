<script context="module">
	export async function preload({ params }) {
        return this.fetch(`https://jsonplaceholder.typicode.com/photos`).then(r => r.json()).then(posts => {
			const post = [...posts]
            return { post };
		});
	}
    
</script>

<script>
    import PostWiget from './_PostWiget.svelte';

	export let post;

    const betterposts = post.slice(0, 10)
</script>


<svelte:head>
	<title>Posts</title>
</svelte:head>

<div class="wrapper">
    <div class="content">
        {#each betterposts as post}
            <PostWiget {post}/>
        {/each}
    </div>
</div>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

    .wrapper {
        display: flex;
        justify-content: center;
        padding: 0 10% 0 10%;

    }

    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow: hidden;
        max-width: 100%;
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