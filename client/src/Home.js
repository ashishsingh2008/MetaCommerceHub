import React from "react";
import "./assets/css/common.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Avatar3 from "./assets/images/avatar3.gif";
import { Link } from "react-router-dom";

export default function Home() {
  function GotoMetaverse() {
    window.location.assign("https://stellar-donut-7119ad.netlify.app/");
  }

  return (
    <div style={{ marginTop: "4rem" }}>
      {/* Hero Section */}
      <Carousel>
        {/* Add Carousel Items */}
      </Carousel>
      {/* More content */}
      <div style={{ backgroundColor: "#0F101F" }}>
        <Container>
          <Row>
            <Col xs={6}>
              <h1 className="mt-5" style={{ color: "white" }}>
                Cross-game Avatar
              </h1>
              <h1 style={{ color: "white" }}>Platform for the Metaverse</h1>
              <br />
              <h5 style={{ color: "white" }}>
                One avatar, many worlds to explore.
              </h5>
              <br />
              <Button
                variant="info"
                style={{ color: "#0F101F", backgroundColor: "#00FFF" }}
                size="lg"
              >
                <Link
                  to="/CreateAvatar"
                  style={{ textDecoration: "none", color: "#0F101F" }}
                >
                  Create Avatar
                </Link>
              </Button>
            </Col>
            <Col>
              <br />
              <video
                preload="auto"
                width="300rem"
                controls
                loop
                style={{ borderRadius: "50px" }}
              >
                <source src="./avatar.mp4" type="video/mp4" />
              </video>
              <br />
              <br />
            </Col>
            <Col>
              <br />
              <video
                preload="auto"
                width="300rem"
                controls
                loop
                style={{ borderRadius: "50px" }}
              >
                <source src="./avatar2.mp4" type="video/mp4" />
              </video>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </div>
      {/* More sections */}
      <footer id="footer" style={{ backgroundColor: "#0F101F" }}>
        <div className="container">
          <h3>Meta-Creativity</h3>
          <p>A Metaverse everyone can explore.</p>
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>MetaCreativity</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
