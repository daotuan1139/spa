import axios from 'axios';
import './PostPage.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostPage = () => {
    //const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSortByTitle, setSortByTitle] = useState(null);

    useEffect(() => {
        let didCancel = false;
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(function (response) {
                if (!didCancel) {
                    console.log('response data', response.data);
                    setIsLoading(false);
                    setPosts(response.data);
                }
            })
            .catch(() => {
                if (!didCancel) {
                    setIsLoading(false);
                    setError('Error while fetching data ')
                }
            })
        return () => {
            didCancel = true
        }
    }, []);

    const postFilter = posts.filter(post => post.title.includes(searchText));

    const postsSort = () => {
        if (isSortByTitle === null) return postFilter;
        return postFilter.sort((post1, post2) => {
            if (isSortByTitle === 'ASC') return post1.title.localeCompare(post2.title)
            else return post2.title.localeCompare(post1.title)
        });
    }

    const postsSorted = postsSort();

    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <center>
                <input style={{ margin: 20 }} type="text" placeholder="Search by title" value={searchText} onChange={evt => setSearchText(evt.target.value)}></input>

                <table>
                    <thead>
                        <tr>
                            <th>ID </th>
                            <th style={{textAlign: "center"}} onClick={() => {
                                if (isSortByTitle === null) setSortByTitle('ASC');
                                if (isSortByTitle === 'ASC') setSortByTitle('DES');
                                if (isSortByTitle === 'DES') setSortByTitle(null);
                            }}>Title {isSortByTitle === null ? '' : isSortByTitle}
                            </th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    {postFilter.length === 0 && <div style={{ margin: 35 }}> Not found </div>}
                    <tbody>

                        {postsSorted.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td><Link to={`/posts/${post.id}`}> Detail </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
};
export default PostPage;