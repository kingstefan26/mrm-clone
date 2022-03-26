<script>
    import Nav from './header/Nav.svelte';
    import Foot from './Footer.svelte';

</script>
<svelte:head>
    <style>
        body {
            background: #343434;
        }
    </style>
</svelte:head>

<div style="height: 100vh;
		width: 100vw;
		display: grid;
		grid-template-rows: auto 1fr auto;">
    <nav>
        <Nav/>
    </nav>


    <main style="position: relative;
		max-width: 56em;
		background: #343434;
		padding-top: 2%;
		padding-bottom: 2%;
		width: 100%;
		max-width: 100%;
		/* overflow-x: hidden; */
		margin: 0 auto;
		box-sizing: border-box;">
        <slot></slot>
    </main>

    <footer>
        <Foot/>
    </footer>
</div>
