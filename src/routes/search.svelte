<script context="module">
    export async function preload(page, session) {
        const {slug} = page.params;
        const query = page.query;

        const res = this.fetch('');

        return {results: "111"};
    }
</script>


<script>
    export let resoults;
</script>


<h1>{resoults}</h1>