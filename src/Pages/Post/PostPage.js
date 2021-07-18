import axios from 'axios';
import './PostPage.css'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostPage = () => {
    //const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [isSortByName, setIsSortByName] = useState(false);
    const [isSortById, setIsSortById] = useState(true);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(function (response) {
                console.log('response', response);
                console.log('response data', response.data);
                setPosts(response.data);
            })
            .catch(function (error) {

                console.log(error);
            })

    }, []);

    const postFilter = posts.filter(post => post.title.includes(searchText));

    const postSort = isSortById ? 
    posts.sort( (post1, post2) => {
        if(post1.title < post2.title) return -1;
        if(post1.title > post2.title) return 1;
        return 0;
    }) : postFilter;

    const titleSorted = posts.sort((a, b) => {
        const isReversed = (isSortByName === 'asc') ? 1 : -1;
        return isReversed * a.title.localeCompare(b.title)
    });
    const onNameSort = () => {
        const sortNameOrder = isSortByName === 'asc' ? 'desc' : 'asc';
        setIsSortByName(sortNameOrder);
    }

    return (
        <div>
            <input style={{ margin: 20 }} type="text" placeholder="Search by title" value={searchText} onChange={evt => setSearchText(evt.target.value)}></input>

            <table>
                <thead>
                    <tr>
                        <th onClick={ ()=>{setIsSortById((!isSortById))}}>ID </th>
                        <th onClick={ onNameSort}>Title {isSortByName ? 'Asc' : 'Desc'} </th>
                        <th>Body</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                {postFilter.length === 0 && <div style={{ margin: 35 }}> Not found </div>}
                <tbody>

                    {postFilter.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td><Link to={`/posts/${post.id}`}> Detail </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PostPage;