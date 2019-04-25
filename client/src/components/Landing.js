import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

const Landing = () => {
  return (
    <>
      <h1 className="Landing-title">
        Welcome to our Image Glitching Research Tool
      </h1>
      <p className="Landing-intro">
        Image glitching is a digital-art phenomena that offers new techniques of
        historical visual analysis. This app is intended to be used a reasearch
        tool, exploring the process of image glitching and using the results to
        reconsider the historical context from which the original image arose.
        Our app provides a comprehensive platform for glitching, annotating,
        examining and sharing the diverse world of image glitching in a academic
        setting. This app was developed through the Middlebury College Computer
        Science Department in the Spring of 2019.
      </p>
      <p className="Landing-intro">
        To begin the process of glitching your own images, simply upload the
        images to the browser, configure specific glitching options, and
        interact with the resulting glitched image with comments and
        annotations. You can glitch a single image at a time, or glitch an
        entire library of images at once. You are also able to download your
        glitches locally.
      </p>
    </>
  );
};

export default Landing;
