import axios from 'axios';
import React, {useState, useEffect} from 'react';

interface Post{
    id: number;
    title: string;
    body: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios
          .get("http://jsonplaceholder.typicode.com/posts")
          .then((response) => setPosts(response.data));
      }, []) 
      return(
        <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    );
}

export default Posts;