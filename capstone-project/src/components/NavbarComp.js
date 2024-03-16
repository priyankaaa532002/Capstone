import React, { Component } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  withRouter
} from "react-router-dom";

import Home from './Home';
import Patients from './Patients';
import Doctors from './Doctors';
import Appointments from './Appointments';
import Donations from './Donations';
import Login from './Login';
import MyContext from '../MyContext';
import '../global-styles.css';
import { useNavigate } from 'react-router-dom';


export default class NavbarComp extends Component {
  static contextType = MyContext;
  
  handleLogout = () => {
    // const navigate = useNavigate();
    const { updatePatientAfterLogout } = this.context;
    alert("Logged Out");
    // setIsLoggedOut(true);
    updatePatientAfterLogout(); // Assuming you have this function in your context
    // this.props.history.push("/login"); // Navigate to the login page
    // You can also include your logout logic here if needed
    // navigate('/')
  };

  render() {
    const { isAdmin, isLoggedOut, setIsLoggedOut, updatePatientAfterLogout } = this.context;
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //   alert("Logged Out");
    //   updatePatientAfterLogout();
    //   this.props.history.push("/login");
    //   // You can also include your logout logic here if needed
    // } 
  

    return (
      <Router>
        <div>
        <Navbar className="poppins-medium" style={{ backgroundColor: '#eff0f3' }} variant="light" expand="lg">
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
                  <Nav.Link as={Link} to={"/donations"}>Dashboard</Nav.Link>
                  {/* <Nav.Link as={Link} to={"/transaction"}>Transaction</Nav.Link> */}
                  {isLoggedOut && <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>}
                  {!isLoggedOut && <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>}
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
            {isLoggedOut && <Route path="/login" element={<Login />}></Route>}
            {/* <Button onClick={logOut}></Button> */}
          </Routes>
        </div>
      </Router>
    )
  }
}