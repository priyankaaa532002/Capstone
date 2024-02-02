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
        <div className="ms-5 me-5" style={{ textAlign: 'left' }}>
            <h2>Patients</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Public Address</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person, index) => (
                        <tr key={index}>
                            <td>{person.name}</td>
                            <td>{person.email}</td>
                            <td>{person.address1}</td>
                            <td>{person.publicAddress}</td>
                            <td>{toDOB(person.dateOfBirth.toNumber())}</td>
                            <td>{person.isMale ? 'Male' : 'Female'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;
