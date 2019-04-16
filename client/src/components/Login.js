import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Col
} from 'reactstrap';

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

  handleChange = async event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);
  }

  render() {
    if (this.state.mode === 'login') {
      return (
        <Container className="app">
          <Form onSubmit={e => this.submitForm(e)}>
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
            <a>Need an account?</a>{' '}
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
            <Button>Login</Button>
            <br />
            <br />
            <br />
            <br />
            <a>Already have an account?</a>{' '}
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
