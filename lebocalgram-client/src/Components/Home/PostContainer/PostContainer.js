import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class PostContainer extends Component {
  render() {
    return (
      <div>
        <NewPost />
        <Posts />
      </div>
    );
  }
}

export default PostContainer;
