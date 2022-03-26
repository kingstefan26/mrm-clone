<script>
    export let post = {
        title: "Failed to load titile"
    };
</script>


<div class="wrapper">
    <picture >
        <a class="center" href="/posts/{post.id - 1}"  sapper-noscroll>
            <img src={post.url} alt="post" width="300" height="300" lazyload>
        </a>
    </picture>
    <a href="/posts/{post.id}">
        <p>{post.title}</p>
    </a>
</div>


<style>


    .wrapper {
        text-align: center;
        
        width: max-content;
        height: max-content;

        max-width: 400px;
        max-height: 400px;

        flex: 1 1 auto;

        background-color: rgb(68, 68, 68);
        border-radius: 10px;
        border: 1px;
        border-bottom: 100px;
    }
    .center {
        max-width: 100%;
        display: flex;
        justify-content: center;
    }

    a {
        text-decoration: none;
    }


    p {
        padding: 1em 0 1em 0 ;
        word-break: break-word;
    }
</style>