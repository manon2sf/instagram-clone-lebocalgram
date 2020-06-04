import React, { Component } from "react";
import "./style.css";
import ReactPlayer from "react-player";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number_of_likes: 0,
      logo_style: false,
      post_text: this.props.content,
      is_in_edit_mode: false,
      posts: [],
    };
  }

  componentDidMount() {
    /* Options, paramètres de la requête */
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    };

    /* Requête */
    fetch("http://localhost:8080/posts/post-history", options)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({ posts: data });
          console.log(this.posts);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  viewPosts = () => {
    return this.state.posts.reverse().map((element, index) => (
      <div key={index} className="modelPosts">
        <p className="posts_author_posts">
          {element.auteur}
          {this.render_logo()}
        </p>
        <br />
        <p className="posts_text_posts">{element.message}</p>
        <ReactPlayer
          className="reactPlayer"
          controls={true}
          url={element.video}
        ></ReactPlayer>
      </div>
    ));
  };

  submitNewRegister = (e) => {
    // TODO AJOUTER DATE REQUETE
    e.preventDefault();

    /* Créer le body à envoyer */
    const body = {
      auteur: this.props.author,
      message: this.state.post_text, //TODO AJOUTER DATE
    };

    /* Configurer la requête */
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    };

    /* Envoi de la requête */
    fetch("http://localhost:8080/posts/new-post", options)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  modifyContent = (e) => {
    this.setState({ is_in_edit_mode: true });
    this.setState({ post_text: e.target.value });
  };
  validateInput = () => {
    this.setState({ is_in_edit_mode: false });
    this.setState({ post_text: this.refs.TheTextValue.value });
  };
  unModifyContent = (e) => {
    this.setState({ is_in_edit_mode: false });
    this.setState({ post_text: this.props.content });
  };
  render_video = () => {
    if (ReactPlayer.url === " ") {
      // si Url vide, React Player ne s'affiche pas
    } else {
      return <ReactPlayer url={this.props.video} controls={true} width="80%" />;
    }
  };

  render_image = () => {
    if (this.props.image === " ") {
      // si Url vide, image ne s'affiche pas
    } else {
      return <div width="80%"> {/*TO DO image de la requete get */}</div>;
    }
  };

  render_logo = () => {
    if (this.state.logo_style) {
      // Si true, rempli le petit like button
      return (
        <button onClick={this.likes_up} className="like_button">
          <svg
            className="jaime"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              clipRule="evenodd"
            />
          </svg>
          {this.state.number_of_likes}
          {/*nombre de like affiché avec le bouton*/}
        </button>
      );
    } else {
      // quand a default (false) like button vide (visuel)
      return (
        <button onClick={this.likes_up} className="like_button">
          <svg
            className="bi bi-heart"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
              clipRule="evenodd"
            />
          </svg>
          {this.state.number_of_likes}
          {/*nombre de like affiché avec le bouton*/}
        </button>
      );
    }
  };

  likes_up = () => {
    // bouton like ++
    this.setState({ number_of_likes: this.state.number_of_likes + 1 });
    this.setState({ logo_style: true });
  };

  // render() {
  //   if (!this.state.is_in_edit_mode) {
  //     return (
  //       <div className="post">
  //         <p className="post_author">{this.props.author}</p>
  //         {this.render_logo()}
  //         <p className="post_content" onClick={this.modifyContent}>
  //           {this.state.post_text}
  //         </p>
  //         <div className="photo">{this.render_image()}</div>
  //         <div className="video_player">{this.render_video()}</div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="post">
  //         <p className="post_author">{this.props.author}</p>
  //         {this.render_logo()}
  //         <input
  //           tyep="text"
  //           className="edit_input"
  //           value={this.state.post_text}
  //           ref="TheTextValue"
  //           placeholder={this.props.content}
  //         ></input>
  //         <button className="" onClick={this.unModifyContent}>
  //           X
  //         </button>
  //         <button
  //           className=""
  //           onClick={(this.validateInput, this.submitNewRegister)}
  //         >
  //           OK
  //         </button>
  //         <div className="photo">{this.render_image()}</div>
  //         <div className="video_player">{this.render_video()}</div>
  //       </div>
  //     );
  //   }
  // }
  render() {
    return (
      <div className="containerpost">
        <div className="posts">{this.viewPosts()}</div>
      </div>
    );
  }
}

export default Posts;
