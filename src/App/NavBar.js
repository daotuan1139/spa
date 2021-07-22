import React from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

const style = {
    color: 'white',
}
const listyle = {
    margin: 45,
    display:'inline-block'
}
const Navbar = ({ isUserLoggedIn, logout }) => {
    return (
        <div>
            <center>

                <ul style={style} >
                    <li style={listyle}>
                        <Link to="/">Home page</Link>
                    </li>
                    <li style={listyle}>
                        <Link to="/posts">Posts page</Link>
                    </li>
                    <li style={listyle}>
                        <Link to="/profile">Profile page</Link>
                    </li>
                    <li style={listyle}>
                        <Link to="/register">Register page</Link>
                    </li>
                    <li style={listyle}>
                        {/* <Link to="/login">Login page</Link> */}
                        {!isUserLoggedIn && (
                            <Link to="/login">Login page</Link>
                        )}
                        {isUserLoggedIn && (
                            <div>
                                <Button style={{ paddingBottom: 0, paddingTop: 0 }} className="btn-primary" onClick={() => {
                                    logout();
                                    axios.defaults.headers.common['Authorization'] = '';
                                }}
                                >
                                    Logout
                                </Button>
                                <Redirect to='/profile' />
                            </div>
                        )}
                    </li>
                </ul>
            </center>
        </div>
    );
};

export default Navbar;