import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import Annotation from './Annotation';

export function GlitchLib(props) {
  const { select, images } = props;
  //  const array = [square, square, square, example, square, example, square];
  let i = 0;
  const grid = images.map(image => {
    i++;
    return (
      <div key={i} className="gallery-item">
        <img
          src={image.url}
          className="gallery-image"
          alt=""
          onClick={() => select(image)}
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
      currentGlitch: undefined,
      images: []
    };
  }

  componentDidMount() {
    fetch('/profile/images', {
      headers: new Headers({ Accept: 'application/json' })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(images => {
        this.setState({ images: images });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.currentGlitch) {
      return (
        <div className="profile">
          <Annotation
            id="annotateComp"
            Return={() => this.setState({ currentGlitch: undefined })}
            Picture={this.state.currentGlitch}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <Nav tabs>
          <NavItem className="profileTab firstTab">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
            >
              My Profile
            </NavLink>
          </NavItem>
        </Nav>
        <div>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <h4 className="lib-title">Saved Glitches:</h4>
              <GlitchLib
                select={element => this.setState({ currentGlitch: element })}
                images={this.state.images}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default Profile;
