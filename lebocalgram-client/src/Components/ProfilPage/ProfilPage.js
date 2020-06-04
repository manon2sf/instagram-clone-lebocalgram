/**
 * ProfilPage.js - Profil Page component
 */

/* Imports */
import React, { Component } from "react";
import "./style.css";
import Navbar from "../Home/Navbar/Navbar";
import BootstrapCarousel from "./BootstrapCarousel/BootstrapCarousel";
import Avatar from "./Avatar/Avatar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/*component*/
class ProfilPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCarousel: false,
      imageBlur: "gallery_img",
      avatarSrc: "",
      pseudo:"",
    };
  }

  /* GET user info*/
  componentDidMount() {
    /* Options, paramètres de la requête */
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      mode: "cors",
    };

    /* Requête */
    fetch("http://localhost:8080/users/profile", options)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({avatarSrc:"http://localhost:8080/" + data[0].avatar});
          this.setState({pseudo:data[0].pseudo});

        },
        (error) => {
          console.log(error);
        }
      );
  }

  /* Change state of showCarousel*/
  changeStateShow = () => {
    this.setState({ showCarousel: true });
    this.setState({ imageBlur: "img_blur" });
  };

  changeStateShow2 = () => {
    this.setState({ showCarousel: false });
    this.setState({ imageBlur: "gallery_img" });
  };

  displayCarousel = () => {
    if (this.state.showCarousel) {
      return <BootstrapCarousel></BootstrapCarousel>;
    }
  };

  displayCarouselButton = () => {
    if (this.state.showCarousel) {
      return (
        <button className="button_carousel" onClick={this.changeStateShow2}>
          x
        </button>
      );
    }
  };

  /* Effet images de la gallery */
  blurGallery = () => {
    if (this.state.showCarousel) {
      return;
    } else {
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="header">
          <p className="profil_Name">{this.state.pseudo}</p>
          <br />
          <div className="picture_container">
            <Avatar source={this.state.avatarSrc} />
          </div>
        </div>
        <div className="gallery_container">
          {this.displayCarousel()}
          {this.displayCarouselButton()}
          <Container fluid>
            <Row>
              <Col>
                <img
                  className={this.state.imageBlur}
                  src="images/gallery1.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
              <Col>
                <img
                  className={this.state.imageBlur}
                  src="images/gallery2.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
              <Col>
                <img
                  className={this.state.imageBlur}
                  src="images/gallery3.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <img
                  className={this.state.imageBlur}
                  src="images/gallery4.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
              <Col>
                {" "}
                <img
                  className={this.state.imageBlur}
                  src="images/gallery5.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
              <Col>
                {" "}
                <img
                  className={this.state.imageBlur}
                  src="images/gallery6.jpg"
                  alt=" "
                  onClick={this.changeStateShow}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ProfilPage;
