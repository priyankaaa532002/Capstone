import React, { useEffect, useState } from 'react';
import { CONTRACT_ADDRESS_DISEASE, ABI_DISEASE } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';

const myStyle = {
    textAlign: "left",
    margin: "10px"
};

const Donations = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);

    const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
    // Function to toggle the visibility of the form
    const toggleForm = () => {
        setShowForm(!showForm);
    };


    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: Web3.utils.toHex(80001) }]
                });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS_DISEASE, ABI_DISEASE, signer);
                const persons = await contract.getData();
                console.log(persons)
                setData(persons)

            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);


    async function addDisease() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_DISEASE, ABI_DISEASE, signer);
            const persons = await contract.addDisease(inputValue);
            console.log(persons)

        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }

    async function addPatient() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_DISEASE, ABI_DISEASE, signer);
            const persons = await contract.addTimestamp(inputValue);
            console.log(persons)


        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    }
    function timestampToDateTime(timestamp) {
        // Create a new Date object with the timestamp in milliseconds
        const date = new Date(timestamp * 1000);

        // Get the date and time components
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    }
    return (
        <div style={myStyle} >
            <button
                type="button"
                className="btn btn-primary"
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }}
                onClick={toggleForm}
            >
                Add Disease
            </button>
            {showForm && (
                <div
                    className="position-fixed p-4 rounded border "
                    style={{ bottom: '80px', right: '20px', width: '300px', zIndex: '9998' }}
                >
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2" aria-label="Close" onClick={toggleForm}></button>
                    <label className='m-2' style={{ textAlign: 'left' }}>Enter New Disease</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        id="dname"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter new disease"
                    />
                    <div class="alert" role="alert" style={{ backgroundColor: '#DCF2F1', borderColor: '#159895', color: '#159895' }}>
                    Ensure to add a new disease only if it hasn't been added already.
                    </div>
                    <button onClick={() => {
                        addDisease();
                        setInputValue('');
                        setShowForm(false);
                    }} className="btn btn-primary">Submit</button>
                </div>
            )}

            <button onClick={addPatient}>Add Patient</button>
            <div>
                {/* Mapping over the array content and creating divs */}
                {data.map((item, index) => (
                    <div>{item[0]} {item[1].length}  {item[1].length > 0 ? timestampToDateTime(item[1][item[1].length - 1].toNumber()) : "Patient Not Added"}</div>
                ))}
            </div>
        </div>
    );
}

export default Donations;