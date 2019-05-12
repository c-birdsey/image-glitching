import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'login',
      email: '',
      password: '',
      passwordConfirm: ''
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
    let home = null;
    if (this.state.email !== '' || this.state.password !== '') {
      home = this.props.home;
    }
    //two different screens: login and register
    if (this.state.mode === 'login') {
      return (
        <Container className="app">
          <br />
          <Form onSubmit={(e => this.submitForm(e), home)}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Please enter your username"
                required
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
                required
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
      if (this.state.password === this.state.passwordConfirm) {
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
                  required
                  placeholder="Please enter your email (this will be used for account recovery)."
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="Please choose a username. You will use this to log in."
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  required
                  placeholder="Please enter your password"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  required
                  id="confirmPassword"
                  placeholder="Please re-enter your password"
                  onChange={e => this.handleChange(e)}
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
      } else {
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
                  required
                  placeholder="Please enter your email (this will be used for account recovery)."
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  required
                  placeholder="Please choose a username. You will use this to log in."
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="userPassword"
                  required
                  placeholder="Please enter your password"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  required
                  id="confirmPassword"
                  placeholder="Please re-enter your password"
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Remember Me
                </Label>
              </FormGroup>
              <Button disabled>Your passwords don't match.</Button>
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
}

export default Login;
