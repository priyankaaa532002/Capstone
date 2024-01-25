import React, { Component } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import MyContext from '../MyContext';
import { useContext } from 'react';


const myStyle = {
    textAlign: "left",
    margin: "5px"
};

export default class Login extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            showForm1: true,
            linkText: "Don't have an account yet?",
            linkText2: 'Sign Up'
        };
    }

    toggleForms = () => {
        this.setState((prevState) => ({
            showForm1: !prevState.showForm1,
            linkText: prevState.showForm1 ? 'Already have an account?' : "Don't have an account yet?",
            linkText2: prevState.showForm1 ? 'Login' : 'Sign Up'
        }));
    };
    
    render() {
        return (
            <div class="ms-5 me-5 mt-5" style={myStyle}>
                {this.state.showForm1 ? <Form1 /> : <Form2 />}
                <label class="form-label">{this.state.linkText}</label> <a href="#" onClick={this.toggleForms}>{this.state.linkText2}</a>
            </div>
        )
    }
}

const Form1 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { updateIsAdmin } = useContext(MyContext);

    const handleAdminLogin = () => {
    
    if (email === 'admin@blockchain.com' && password === 'Blockchain@123') {
      alert('Login As Admin Successful!');
      updateIsAdmin(true)
    } else {
      alert('Incorrect email or password. Please try again.');
    }
  };

    const handlePatientLogin = () =>{
        updateIsAdmin(false)
    }

  return (
    <div style={myStyle}>
      <h3>Login</h3>
      <form>
        <div className="mb-6">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary me-3" onClick={handlePatientLogin}>
          Login As Patient
        </button>
        <button type="button" className="btn btn-primary" onClick={handleAdminLogin}>
          Login As Admin
        </button>
        <br />
        <br />
      </form>
    </div>
  );
};

const Form2 = () => {
    return (
        <div>
            <h3>Register</h3>
            <form>
                <div className="mb-3 d-flex">
                    <div className="col-6 me-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" id="name" />
                    </div>

                    <div className="col-6">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                </div>

                <div className="mb-3 d-flex">
                    <div className="col-6 me-3">
                        <label htmlFor="dob" className="form-label">
                            Date of Birth
                        </label>
                        <input type="date" className="form-control" id="dob" />
                    </div>

                    <div>
                        <label className="form-label">Gender</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="accountNumber" className="form-label">
                        Account Number
                    </label>
                    <input type="text" className="form-control" id="accountNumber" />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <textarea className="form-control" id="address" rows="2"></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input type="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <br/>
        </div>
    );
};