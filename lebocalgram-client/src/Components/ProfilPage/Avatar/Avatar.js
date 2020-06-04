import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      style: "editPP",
    };
  }


  /* selectionne le fichier dans le state selectedFile*/
  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  setProfilPic = () => {
    this.setState({ style: " " });
  };

  /* submit sous forme d'un formData */
  submitfileUpload = (e) => {
    e.preventDefault();
    this.setState({ style: "editPP" });

    /* corps de la requête */
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(formData);

    /* envoi de la requete */
    axios({
      method: "post",
      url: "http://localhost:8080/users/avatar",
      data: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })  
    .then((res) => {
      console.log(res);
    });
  };

  /* render */
  render() {
    return (
      <div className="avatarGlobal">
        <div className="avatar">
          <img src={this.props.source} onClick={this.setProfilPic} alt="avatar par défaut" />
        </div>
        <div className={this.state.style}>
          <input
            // style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
          />
          <button
            className="button6 ml_0"
            type="submit"
            onClick={this.submitfileUpload}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Avatar;
