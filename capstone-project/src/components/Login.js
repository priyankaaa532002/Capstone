import React, { Component } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import MyContext from '../MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';

import { CONTRACT_ADDRESS_PATIENT, ABI_PATIENT } from '../Constants';

import {ethers} from 'ethers';
import Web3 from 'web3';
import { Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

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
            <div className="ms-5 me-5 mt-5" style={myStyle}>
                {this.state.showForm1 ? <Form1 /> : <Form2 />}
                <label className="form-label">{this.state.linkText}</label> <a href="#" onClick={this.toggleForms}>{this.state.linkText2}</a>
            </div>
        )
    }
}

const Form1 = () => {
    
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const connectToMetaMask = async () => {
            if (window.ethereum) {
                try {
                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // Accounts now exposed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error('User denied accont access');
                }
            } else {
                console.error('MetaMask not detected');
            }
        };
        connectToMetaMask();
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { updateIsAdmin,updatePatientData } = useContext(MyContext);


    const handleAdminLogin = () => {

        if (email === 'admin@blockchain.com' && password === 'Blockchain@123') {
            alert('Login As Admin Successful!');
            updateIsAdmin(true)
            navigate('/home')
        } else {
            alert('Incorrect email or password. Please try again.');
        }
    
    };
    const handlePatientLogin = async (e) => {
        e.preventDefault();
        await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: Web3.utils.toHex(80001) }]
			});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
	    const sig = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS_PATIENT, ABI_PATIENT, sig);
        const reg2 = await contract.getAllPersons();
        console.log(reg2)
        const user = reg2.find(persons => persons[2] === email && persons[1] === password);

        if (user) {
            console.log('Login successful!');
            updateIsAdmin(false);
            updatePatientData(user);
            navigate('/home')
        } else {
            console.log('Incorrect email or password. Please try again.');
            alert('Incorrect email or password. Please try again.');
        }
    };
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

    const [account, setAccount] = useState(null);
    const { updateIsAdmin,updatePatientData } = useContext(MyContext);


    useEffect(() => {
        const connectToMetaMask = async () => {
            if (window.ethereum) {
                try {
                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // Accounts now exposed
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    setAccount(accounts[0]);
                } catch (error) {
                    console.error('User denied accont access');
                }
            } else {
                console.error('MetaMask not detected');
            }
        };
        connectToMetaMask();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        gender: '',
        accountNumber: '',
        address: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    async function registerPatientData(){
        await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: Web3.utils.toHex(80001) }]
			});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
	    const sig = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS_PATIENT, ABI_PATIENT, sig);
		const reg1 = await contract.addPerson(formData.name, formData.password, formData.email, formData.address, Date.parse(formData.dob), formData.gender==="true"? true : false);
        console.log(reg1)

        const reg2 = await contract.getAllPersons();
        console.log(reg2)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Perform registration logic here using formData
        // alert(account)
        console.log(account)
        registerPatientData()
        updatePatientData(formData);
        // Reset form after submission if needed
        setFormData({
            name: '',
            email: '',
            dob: '',
            gender: '',
            accountNumber: '',
            address: '',
            password: ''
        });
    };

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex">
                    <div className="col-6 me-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-6">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 d-flex">
                    <div className="col-6 me-3">
                        <label htmlFor="dob" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="form-label">Gender</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="true"
                                    checked={formData.gender === "true"}
                                    onChange={handleInputChange}
                                />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="false"
                                    checked={formData.gender === "false"}
                                    onChange={handleInputChange}
                                />
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
                    <input
                        type="text"
                        className="form-control"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-6 me-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

