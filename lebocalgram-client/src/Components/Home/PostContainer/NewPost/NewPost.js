import React, { Component } from "react";
import axios from "axios";
import "../../../style_global.css";
import "./style.css";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostContent: " ",
      newPostAuthor: " ",
      video: " ",
      posts: [],
      show_post_container: "display_on",
      selectedFile: null,
    };
  }

  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value }); //defini la valeur des input dans le state
  };

  handle_change = (e) => {
    this.setState({ video: e.target.value });
  };

  popup_off = () => {
    this.setState({
      show_post_container: "display_on",
    });
  };

  /* selectionne le fichier dans le state selectedFile*/
  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  create_post = (e) => {
    // TODO AJOUTER DATE
    e.preventDefault();

    const formData = new FormData(e.target);

    /* envoi de la requete */
    axios({
      method: "post",
      url: "http://localhost:8080/posts/new-post",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (reponse, data) {
        //On traite la suite une fois la réponse obtenue
        console.log(reponse);
      })
      .catch(function (erreur, data) {
        //On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });

    const newPost = {
      content: this.state.newPostContent,
      author: this.state.newPostAuthor,
      video: this.state.video,
    };

    let posts = this.state.posts;
    if (newPost.content.length > 1 /*&& newPost.author.length > 1*/) {
      // si l'un des deux champs pas rempli pas d'envoi
      posts.push(newPost);
    } else {
      this.setState({
        show_post_container: "display_off",
      });
      alert("Veuillez remplir aux moins les champs auteur/message");
      // fait disparaitre les input du Post container pour afficher la pop up
    }
    this.setState({ posts: posts, newPostAuthor: "", newPostContent: "" });
  };

  render() {
    return (
      <form onSubmit={this.create_post} className="post_editor">
        <div className={this.state.show_post_container}>
          <label className="label_1">
            Auteur :
            <input
              className="post_1"
              value={this.state.newPostAuthor}
              onChange={this.handle_input}
              onClick={this.popup_off}
              name="newPostAuthor"
              placeholder="Votre nom d'auteur"
            />
          </label>
          <br />
        </div>
        <label className="label_1">
          Video Url :
          <input
            onChange={this.handle_change}
            onClick={this.popup_off}
            value={this.state.video}
            className="post_2"
            name="video"
            type="text"
            placeholder="Ajoutez l'url de votre video ici!"
          />
        </label>
        <br />
        <label className="label_1">
          Post :
          <br />
          <textarea
            className="post_3"
            value={this.state.newPostContent}
            onClick={this.popup_off}
            onChange={this.handle_input}
            name="newPostContent"
          ></textarea>
        </label>
        <br />
        <div className="import_image">
          <input name="image" type="file" onChange={this.fileSelectedHandler} />
        </div>
        <br />
        <button className="button6">Ajouter un post</button>
      </form>
    );
  }
}

export default NewPost;
