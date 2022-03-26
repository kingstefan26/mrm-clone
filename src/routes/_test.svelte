<script>

    // Todos.svelte

    import {useQuery, useMutation, useQueryClient} from '@sveltestack/svelte-query'

    import {getTodos, postTodo} from '../my-api'

    // Access the client

    const queryClient = useQueryClient()


    // Queries

    const queryResult = useQuery('todos', getTodos)


    // Mutations

    const mutation = useMutation(postTodo, {

        onSuccess: () => {

            // Invalidate and refetch

            queryClient.invalidateQueries('todos')

        },

    })

</script>


<div>

    <ul>

        {#each $queryResult.data as todo}

            <li>{todo.title}</li>

        {/each}

    </ul>


    <button

            on:click={() => {
 
        $mutation.mutate({ id: Date.now(), title: 'Do Laundry' })
 
      }}>

        Add Todo

    </button>

</div>