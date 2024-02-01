import React, { useEffect } from 'react';
import { CONTRACT_ADDRESS_PATIENT, ABI_PATIENT } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';

const Patients = () => {
    const showPatients = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const sig = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_PATIENT, ABI_PATIENT, sig);
            const reg2 = await contract.getAllPersons();
            console.log(reg2);
        } catch (error) {
            console.error('Error in showPatients:', error);
        }
    };
    useEffect(() => {
        showPatients();
    }, []); // Empty dependency array to ensure useEffect only runs once

    return (
        <div>
            Patients
        </div>
    );
};

export default Patients;
