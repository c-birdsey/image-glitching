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

    this.deleteGlitch = this.deleteGlitch.bind(this);
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

  deleteGlitch(glitch) {
    fetch(`/api/image/${glitch.id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        const newImages = this.state.images.filter(img => img.id !== glitch.id);
        this.setState({ images: newImages });
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
            deleteGlitch={this.deleteGlitch}
          />
        </div>
      );
    }

    let textPlaceholder;
    if (this.state.images.length === 0) {
      textPlaceholder = (
        <p className="placeholder-title">
          You have no saved images. Return to the home page to begin glitching.
        </p>
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
              {textPlaceholder}
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
