import { useParams } from "react-router-dom"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DetailPost = () => {
    const [posts, setPosts] = useState([]);
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(function (response) {
                console.log('response data detail', response.data);
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {

                console.log(error);
            })

    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div>
                <h1>Id: {posts.id}</h1>
                <h2>Title: </h2>
                <h3>{posts.title}</h3>
                <h2>Body: </h2>
                <p style={{ fontSize: 20 }}>{posts.body}</p>
            </div>
        );
    }
};
export default DetailPost;