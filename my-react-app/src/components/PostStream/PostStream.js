import Post from '../Post/Post.js'

function PostStream({posts}) {
    return (
        <div>
            {posts ? (
                posts.map(post => (
                    <Post {...post}/>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PostStream