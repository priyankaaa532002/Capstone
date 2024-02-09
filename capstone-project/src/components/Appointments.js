import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import { CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';

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
    

    useEffect(() => {
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
                setAppointments(reg1);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div className='m-3'>
            {isAdmin ? (
                <h2>All Appointments</h2>
            ) : (
                <h2>Your Appointments</h2>
            )}
            <table className="table table-striped" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        {isAdmin && <th>Patient Name</th>}
                        <th>Doctor Name</th>
                        {isAdmin && <th>Patient Address</th>}
                        <th>Doctor Address</th>
                        <th>Timestamp</th>
                        <th>Date of Booking</th>
                        <th>Time of Booking</th>
                    </tr>
                </thead>
                <tbody>
                    {isAdmin && appointments.map((appointment, index) => (
                        <tr key={index}>
                            {<td>{appointment[0]}</td>}
                            <td>{appointment[1]}</td>
                            {<td>{appointment[2]}</td>}
                            <td>{appointment[3]}</td>
                            <td>{appointment[4].toNumber()}</td>
                            <td>{toDate(appointment[5].toNumber())}</td>
                            <td>{appointment[6]}</td>
                        </tr>
                    ))}

                    {!isAdmin && appointments.map((appointment, index) => (
                        appointment[2] === patientData.publicAddress && (
                            <tr key={index}>
                                <td>{appointment[1]}</td>
                                <td>{appointment[3]}</td>
                                <td>{appointment[4].toNumber()}</td>
                                <td>{toDate(appointment[5].toNumber())}</td>
                                <td>{appointment[6]}</td>
                            </tr>
                        )
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default Appointments;
