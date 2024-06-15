import React, { Component } from "react";
import { connect } from "react-redux";
import YouTube from "react-youtube";

import { Container, Row, Col } from "react-bootstrap";
// STYLES
class Video extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.localization) {
      return (
        <Container>
          <Row>
            <Col xs={12}>
              <iframe
                src={this.props.video}
                frameBorder="0"
                allow="autoplay;"
                allowFullScreen
                title="video"
                width="100%"
                height={this.props.height}
              />
            </Col>
          </Row>
        </Container>
      );
    } else return null;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Video);
export { Video };
