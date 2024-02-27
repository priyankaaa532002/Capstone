import React, { Component } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
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
import MyContext from '../MyContext';
import '../global-styles.css';


export default class NavbarComp extends Component {
  static contextType = MyContext;
  render() {
    const { isAdmin } = this.context;
    return (
      <Router>
        <div>
        <Navbar className="oxygen-regular" style={{ backgroundColor: '#35858B' }} variant="dark" expand="lg">
            <Container fluid>
              <Navbar.Brand href="/">Capstone</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="my-2 my-lg-0 ms-auto"
                  style={{ maxHeight: '300px' }}
                  navbarScroll
                >
                  <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                  {isAdmin&&<Nav.Link as={Link} to={"/patients"}>Patients</Nav.Link>}
                  <Nav.Link as={Link} to={"/doctors"}>Doctors</Nav.Link>
                  <Nav.Link as={Link} to={"/appointments"}>Appointments</Nav.Link>
                  <Nav.Link as={Link} to={"/donations"}>Donations</Nav.Link>
                  {/* <Nav.Link as={Link} to={"/transaction"}>Transaction</Nav.Link> */}
                  <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {isAdmin&&<Route path="/patients" element={<Patients />}></Route>}
            <Route path="/doctors" element={<Doctors />}></Route>
            <Route path="/appointments" element={<Appointments />}></Route>
            <Route path="/donations" element={<Donations />}></Route>
            {/* <Route path="/transaction" element={<Transaction />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Router>
    )
  }
}