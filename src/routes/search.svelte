<script context="module">
  /** @type {import('./[slug]').Load} */  export async function load({ params, fetch, session, stuff }) {
    // const url = `https://cms.example.com/article/${params.slug}.json`;
    // const response = await fetch("url");

    return {
      props: {
        resoults: "implement me"
      }
    };
  }
</script>


<script>
  export let resoults;
</script>


<h1>{resoults}</h1>