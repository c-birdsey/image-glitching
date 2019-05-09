import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import square from './sqr.jpg';
import example from './Glitch.png';
import Annotation from './Annotation';

export function GlitchLib(props) {
  const { select } = props;
  const array = [square, square, square, example, square, example, square];
  let i = 0;
  const grid = array.map(elem => {
    i++;
    return (
      <div key={i} className="gallery-item">
        <img
          src={elem}
          className="gallery-image"
          alt=""
          onClick={() => select(elem)}
        />
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
      activeTab: '1',
      currentGlitch: undefined
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
    if (this.state.currentGlitch) {
      return (
        <div className="profile">
          <Annotation
            Return={() => this.setState({ currentGlitch: undefined })}
            Picture={this.state.currentGlitch}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <Nav tabs>
          <NavItem className="profileTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              My Glitch Library
            </NavLink>
          </NavItem>
        </Nav>
        <div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <h4 className="lib-title">Saved Glitches:</h4>
              <GlitchLib
                select={element => this.setState({ currentGlitch: element })}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Profile;
