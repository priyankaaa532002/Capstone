import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import Patients from './Patients';
import Doctors from './Doctors';
import Appointments from './Appointments';
import Donations from './Donations';
import Login from './Login';
import '../global-styles.css';

export default class NavbarComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <div>
          <Navbar className="poppins-medium" style={{ backgroundColor: '#eff0f3' }} variant="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="/">Capstone</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="my-2 my-lg-0 ms-auto" style={{ maxHeight: '300px' }} navbarScroll>
                  <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                  <Nav.Link as={Link} to={"/doctors"}>Doctors</Nav.Link>
                  <Nav.Link as={Link} to={"/appointments"}>Appointments</Nav.Link>
                  <Nav.Link as={Link} to={"/donations"}>Dashboard</Nav.Link>
                  {isLoggedIn ?
                    <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link> :
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/doctors" element={<Doctors />}></Route>
            <Route path="/appointments" element={<Appointments />}></Route>
            <Route path="/donations" element={<Donations />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/patients" element={<Patients />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
