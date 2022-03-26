<script>
    export let name = "default";
    export let getter = async () => {
        return undefined;
    };

    export let data;

    import {browser} from '$app/env';
    import {onMount} from 'svelte';

    onMount(async () => {
        if (browser) {
            const localstorgedata = sessionStorage.getItem(name);
            if (localstorgedata) {
                data = JSON.parse(localstorgedata);
            } else {
                data = await getter();
                sessionStorage.setItem(name, JSON.stringify(data));
            }
        }
    })
</script>