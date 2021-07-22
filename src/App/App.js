import HomePage from "../Pages/HomePage";
import PostPage from "../Pages/Post/PostPage.js";
import DetailPost from "../Pages/Post/DetailPost.js";
import LoginPage from "../Pages/Login/LoginPage";
import ProfilePage from "../Pages/Profile/ProfilePage";
import RegisterPage from "../Pages/Register/RegisterPage";
import Navbar from "./NavBar";

import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

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

      <Navbar
        logout={logout}
        isUserLoggedIn={isUserLoggedIn}
      />

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
