<script>
  import InformationPage from "../lib/Information_page.svelte";

  import Login from '$lib/login.svelte';

  let session;

</script>

{#if !session}

  <center>
    <h1>Please login</h1>
  </center>

  <Login bind:session />

{:else }


{/if}


<InformationPage pagetitle={"Booksmars"}>
  <center><h1>WIP</h1></center>
</InformationPage>