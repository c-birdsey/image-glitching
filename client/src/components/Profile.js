import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import placeholder from './profile-icon.png';
import square from './sqr.jpg';

function makeProfileInfo() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={5} lg={4} className="profile-img">
          <img className="profile-pic" src={placeholder} alt="" />
        </Col>
        <Col xs={12} sm={7} md={7} lg={7} className="profile-data">
          <div className="profile-text">
            <h2>
              Profile Information
              <Button size="sm" color="primary" className="edit-button">
                Edit Profile
              </Button>
            </h2>
            <h4 className="header">Full Name</h4>
            <h4 className="header">Username</h4>
            <h4 className="header">Email</h4>
            <h4 className="header">About</h4>
            <p className="">
              Some stuff about this persons profile adn there is a lot of
              content counting objects: 15, done. Delta compression using up to
              4 threads. Compressing objects: 100% (15/15), done. Writing
              objects: 100% (15/15), 8.14 KiB | 694.00 KiB/s, done. Total 15
              (delta 10), reused 0 (delta 0)
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function makeGlitchLib() {
  const array = [square, square, square, square, square, square, square];
  const grid = array.map(elem => {
    return (
      <div class="gallery-item">
        <img src={elem} class="gallery-image" alt="" />
      </div>
    );
  });

  return (
    <div className="glitch-container">
      <div className="gallery">{grid}</div>
    </div>
  );
}

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
    const glitchGrid = makeGlitchLib();

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
        <div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane className="content" tabId="1">
              <Row>
                <Col sm="12">{profile}</Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <h4 className="lib-title">Saved Glitches:</h4>
              {glitchGrid}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Profile;
