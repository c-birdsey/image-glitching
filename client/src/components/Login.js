import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'login',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //this just updates the state
  handleChange = async event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  //currently doesn't really do anything but this is where functionality needs to be added
  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);
  }

  render() {
    //this sends us back to the home page when the user clicks login or register
    const home = this.props.home;
    //two different screens: login and register
    if (this.state.mode === 'login') {
      return (
        <Container className="app">
          <br />
          <Form onSubmit={(e => this.submitForm(e), home)}>
            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="userEmail"
                placeholder="Please enter your email"
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userPassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="userPassword"
                placeholder="Please enter your password"
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Remember Me
              </Label>
            </FormGroup>
            <Button>Login</Button>
            <br />
            <br />
            <br />
            <br />
            <p>Need an account?</p>{' '}
            <Button onClick={() => this.setState({ mode: 'register' })}>
              Sign up
            </Button>
          </Form>
        </Container>
      );
    }
    if (this.state.mode === 'register') {
      return (
        <Container className="app">
          <br />
          <Form onSubmit={(e => this.submitForm(e), home)}>
            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="userEmail"
                placeholder="Please enter your email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="userPassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="userPassword"
                placeholder="Please enter your password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="userPassword">Confirm Password</Label>
              <Input
                type="password"
                name="password"
                id="confirmPassword"
                placeholder="Please re-enter your password"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Remember Me
              </Label>
            </FormGroup>
            <Button>Register</Button>
            <br />
            <br />
            <br />
            <br />
            <p>Already have an account?</p>{' '}
            <Button onClick={() => this.setState({ mode: 'login' })}>
              Login
            </Button>
          </Form>
        </Container>
      );
    }
  }
}

export default Login;
