import HomePage from "./Pages/HomePage";
import PostPage from "./Pages/Post/PostPage.js";
import DetailPost from "./Pages/Post/DetailPost.js";
import LoginPage from "./Pages/Login/LoginPage";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

const style = {
  color: 'white',
  paddingLeft: 500,
  display: 'flex',
}

function App() {
  return (
      <div>

        <ul style={style} >
          <li style={{ margin: 45 }}>
            <Link to="/">Home page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/posts">Posts page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/login">Login page</Link>
          </li>
          <li style={{ margin: 45 }}>
            <Link to="/profile">Profile page</Link>
          </li>
        </ul>

        <center>
          <Switch>

            <Route path="/profile" exact>

            </Route>
            <Route path="/login" exact>
              <LoginPage />
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
        </center>
      </div>
  );
}

export default App;
