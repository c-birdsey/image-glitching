// functionality is simplified.
// needs fixing:_code has a minor bug, sometimes it fails to preview image

import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  //Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import placeholder from './folder-icon.png';

function makeProfileInfo() {
  return (
    <Container fluid>
      <Row>
        <Col xs={4} sm={4} md={3} lg={4} className="profile-data">
          <Row className="profile-pic">
            <img className="profile-pic" src={placeholder} alt="" />
          </Row>
          <Row className="profile-info">
            <Col>
              <h2>Profile Information</h2>
              <h4 className="header">Full Name</h4>
              <h4 className="header">Username</h4>
              <h4 className="header">Email</h4>
              <h4 className="header">About</h4>
              <p>Some stuff about this persons profile</p>
            </Col>
          </Row>
        </Col>
        <Col xs={8} sm={8} md={9} lg={8} className="library">
          <p>Grid</p>
        </Col>
      </Row>
    </Container>
  );
}

function makeGlitchLib() {}

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1'
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const profile = makeProfileInfo();
    const glitches = makeGlitchLib();
    console.log(glitches);
    return (
      <div className="profile">
        <Nav tabs>
          <NavItem className="profileTab firstTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              My Profile
            </NavLink>
          </NavItem>
          <NavItem className="profileTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              My Glitch Library
            </NavLink>
          </NavItem>
        </Nav>
        <div className="content">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">{profile}</Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h4>Saved Glitches:</h4>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Profile;
