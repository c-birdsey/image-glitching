import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import square from './sqr.jpg';

function makeGlitchLib() {
  const array = [square, square, square, square, square, square, square];
  let i = 0;
  const grid = array.map(elem => {
    i++;
    return (
      <div key={i} className="gallery-item">
        <img src={elem} className="gallery-image" alt="" />
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
    const glitchGrid = makeGlitchLib();

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
              {glitchGrid}
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Profile;
