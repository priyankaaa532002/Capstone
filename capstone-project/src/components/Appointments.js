import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import { CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { Button } from 'react-bootstrap';
import { BsClipboard } from 'react-icons/bs';
import { BigNumber } from "@ethersproject/bignumber";



const Appointments = () => {
    const { isAdmin, patientData } = useContext(MyContext);
    const [appointments, setAppointments] = useState([]);

    function toDate(timestamp) {
        const dob = new Date(parseInt(timestamp.toString()) * 1000);
        const day = dob.getDate().toString().padStart(2, '0');
        const month = (dob.getMonth() + 1).toString().padStart(2, '0');
        const year = dob.getFullYear();
        const formattedDOB = `${day}/${month}/${year}`;
        return formattedDOB;
    }


    const fetchData = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const sig = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT, sig);

            const reg1 = await contract.getAllAppointment();
            console.log(reg1)
            setAppointments(reg1);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    function copyButton(text) {
        navigator.clipboard.writeText(text)
    }

    async function doPayment(timestamp, doctorAddress, charge) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            
            const addressToValue = doctorAddress;
            const ETHAmountValue = (charge.toNumber() * 0.0000052).toFixed(18).toString();
            const weiAmountValue = ethers.utils.parseEther(ETHAmountValue);
            
            // Manually set gas limit
            const transactionRequest = {
                to: addressToValue,
                value: weiAmountValue,
                gasLimit: ethers.utils.hexlify(3000000) // Adjust the gas limit as needed
            };
            
            // Send transaction
            const receipt = await signer.sendTransaction(transactionRequest);
            console.log("Transaction receipt:", receipt);
            
            // Switch Ethereum chain
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            
            // Interact with contract
            const contract = new ethers.Contract(CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT, signer);
            const transactionResponse = await contract.doPayment(timestamp);
            await transactionResponse.wait();
            console.log("Transaction response:", transactionResponse);
            await fetchData()
            // Optionally, you can fetch updated appointment data here
            
        } catch (error) {
            console.error('Error during payment:', error);
        }
    }
    
    async function deleteAppointment(timestamp) {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            
            // Interact with contract
            const contract = new ethers.Contract(CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT, signer);
            const gasLimit = BigNumber.from("1000000");
            const transactionResponse = await contract.deleteAppointment(timestamp, {gasLimit});
            await transactionResponse.wait();
            console.log("Transaction response:", transactionResponse);
            await fetchData()
            // Optionally, you can fetch updated appointment data here
        
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    }

    return (
        <div className='poppins-regular' style={{ background: '#eff0f3', minHeight: '100vh', paddingTop: '1px', padding: '20px' }}>
            {isAdmin ? (
                <h2>All Appointments</h2>
            ) : (
                <h2>Your Appointments</h2>
            )}
            <table className="table table-borderless table-hover custom-table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        {isAdmin && <th>Patient Name</th>}
                        <th>Doctor Name</th>
                        {isAdmin && <th>Patient Address</th>}
                        <th>Doctor Address</th>
                        <th>Timestamp</th>
                        <th>Date of Booking</th>
                        <th>Time of Booking</th>
                        <th colSpan={2}>Payment Status</th>
                        {!isAdmin && <th> Consultation Fee</th>}
                        {!isAdmin && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {isAdmin && appointments.map((appointment, index) => (
                        <tr key={index+1} style={{ textAlign: 'center' }}>
                            {<td>{appointment[0]}</td>}
                            <td>{appointment[1]}</td>
                            {<td>{appointment[2]}</td>}
                            <td>{appointment[3]}<Button onClick={() => copyButton(appointment[3])} variant="link" >
                                    <BsClipboard size={20} />
                                </Button></td>
                            <td>{appointment[4].toNumber()}</td>
                            <td>{toDate(appointment[5].toNumber())}</td>
                            <td>{appointment[6]}</td>
                            <td colSpan={2}>{!appointment[7] && <button>Pending</button>}</td>
                            <td>{appointment[7] && <button>Paid</button>}</td>
                        </tr>
                    ))}

                    {!isAdmin && appointments.map((appointment, index) => (
                        appointment[2] === patientData.publicAddress && (
                            <tr key={index} style={{ textAlign: 'center' }}>
                                <td>{appointment[1]}</td>
                                <td>{appointment[3]}<Button style={{fill: 'pink'}} onClick={() => copyButton(appointment[3])} variant="link" >
                                    <BsClipboard size={20} />
                                </Button></td>
                                <td>{appointment[4].toNumber()}</td>
                                <td>{toDate(appointment[5].toNumber())}</td>
                                <td>{appointment[6]}</td>
                                <td>{!appointment[7] && <button onClick={() => doPayment(appointment[4], appointment[3], appointment[8])}>Pending</button>}</td>
                                <td>{appointment[7] && <button>Paid</button>}</td>
                                <td>{appointment[8].toNumber()}</td>
                                <td><button onClick={() => deleteAppointment(appointment[4])}>Delete</button></td>
                            </tr>
                        )
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default Appointments;
