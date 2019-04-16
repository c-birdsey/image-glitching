import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      mode: 'login',
      user: ''
    };
  }

  render() {
    if (this.state.mode === 'login') {
      return (
        <Form>
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
          <a>Need an account?</a> <Button>Sign up</Button>
        </Form>
      );
    }
  }
}

export default Login;
