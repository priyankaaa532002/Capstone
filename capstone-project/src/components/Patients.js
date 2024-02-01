import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS_PATIENT, ABI_PATIENT } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';

const myStyle = {
    textAlign: "left",
    margin: "5px"
};

const Patients = () => {
    const [persons, setPersons] = useState([]);
    function toDOB(timestamp) {
        const dob = new Date(timestamp);
        const day = dob.getDate().toString().padStart(2, '0');
        const month = (dob.getMonth() + 1).toString().padStart(2, '0');
        const year = dob.getFullYear();
        const formattedDOB = `${day}/${month}/${year}`;
        console.log(formattedDOB); // Output: 06/02/2002
        return formattedDOB;
    }
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: Web3.utils.toHex(80001) }]
                });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS_PATIENT, ABI_PATIENT, signer);
                const persons = await contract.getAllPersons();
                setPersons(persons);
                console.log(persons)
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    return (
        <div className="ms-5 me-5" style={myStyle}>
            <h2>Patients</h2>
            <div className="row row-cols-1 row-cols-md-3">
                {persons.map((person, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{person.name}</h5>
                                <p className="card-text">Email: {person.email}</p>
                                <p className="card-text">Address: {person.address1}</p>
                                <p className="card-text">Public Address: {person.publicAddress}</p>
                                <p className="card-text">Date of Birth: {toDOB(person.dateOfBirth.toNumber())}</p>
                                <p className="card-text">Gender: {person.isMale ? 'Male' : 'Female'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patients;
