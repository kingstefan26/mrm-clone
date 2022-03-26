<script>
  export let session;

  import { onMount } from "svelte";

  let userbase;

  let authPromise;

  onMount(() => {

    username = window.userbase;

    authPromise = userbase.init({ appId: "7d8d3e46-319d-4a4f-a065-61c53ac7dafa" })
      .then(({ user }) => session = user);
  });

  let username, password;

  const signIn = () => authPromise = userbase.signIn({ username, password }).then(user => session = user);
  const signUp = () => authPromise = userbase.signUp({ username, password }).then(user => session = user);
  const signOut = () => authPromise = userbase.signOut().then(() => session = null);

  $: console.log(session);

</script>


{#await authPromise}Loading...
{:then _}

  {#if !session}
    <form>
      <label for="username">Username</label>
      <input id="username" type="text" bind:value={username}><br>
      <label for="password">Password</label>
      <input id="password" type="password" bind:value={password}><br>
      <button on:click={signIn} type="button">Sign in</button>
      <button on:click={signUp} type="button">Sign up</button>
    </form>

  {:else }
    <h1>Hi, {session.username}!</h1>

    <button on:click={signOut} style="position: absolute; top: 10px; right: 10px;">Log out</button>

  {/if}

{:catch error}
  Error! {error}
{/await}


<style>
    form > * {
        color: black;
    }
</style>