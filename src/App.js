import HomePage from "./Pages/HomePage";
import PostPage from "./Pages/Post/PostPage.js";
import DetailPost from "./Pages/Post/DetailPost.js";
import LoginPage from "./Pages/Login/LoginPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import RegisterPage from "./Pages/Register/RegisterPage";

import React, { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Button} from 'react-bootstrap';

const style = {
  color: 'white',
  paddingLeft: 250,
  display: 'flex',
}

const App = () => {
  const initialValues = {
    token: null,
    userId: null,
  }

  const [currentUser, setCurrentUser] = useState({ initialValues })
  const logout = () => setCurrentUser(initialValues);
  const isUserLoggedIn = Boolean(currentUser.userId);

  return (
      <div className="app container">

        <ul style={style} >
          <li style={{ margin: 45 }}>
            <Link to="/">Home page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/posts">Posts page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/profile">Profile page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/register">Register page</Link>
          </li>
          <li style={{ margin: 45 }}>
            {/* <Link to="/login">Login page</Link> */}
            {!isUserLoggedIn && (
              <Link to="/login">Login page</Link>
            )}
            {isUserLoggedIn && (
              <div>
                <Button style={{paddingBottom: 0, paddingTop: 0}} className="btn-primary" onClick={() => {
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

        <Switch>
        <Route path="/login">
          <LoginPage
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
          />
        </Route>
        <Route
          path="/profile"
          render={() => {
            if (!isUserLoggedIn)
              return (
                <LoginPage
                  title="You need to login to continue"
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              );
            else return <ProfilePage currentUser={currentUser} />;
          }}
        ></Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/posts/:postId">
            <DetailPost />
          </Route>

          <Route path="/posts" exact>
            <PostPage />
          </Route>

          <Route path="/" exact>
            <HomePage />
          </Route>

        </Switch>

      </div>
  );
};

export default App;
