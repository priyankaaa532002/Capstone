import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../MyContext'; 
import { CONTRACT_ADDRESS_DOCTOR, ABI_DOCTOR, CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../global-styles.css';

const myStyle = {
    textAlign: "left",
    margin: "5px"
};

const DoctorManagement = () => {
    const { isAdmin , patientData } = useContext(AdminContext);
    const [doctors, setDoctors] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormOpenApp, setIsFormOpenApp] = useState(false);
    const [formData, setFormData] = useState({ name: '', specialty: '', charge: '', account: ''});
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddDoctorClick = () => {
        if (isAdmin) {
            setIsFormOpen(true);
        } else {
            alert("ONLY ADMINS HAVE ACCESS");
        }
    };

    async function registerAppointmentData() {
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider1.getSigner();
        const addressToValue = selectedDoctor[3];
        const ETHAmountValue = (selectedDoctor[2].toNumber() * 0.0000052).toString();
        console.log(addressToValue + " " + ETHAmountValue);
        
        const weiAmountValue = ethers.utils.parseEther(ETHAmountValue)

        const transactionRequest = {
        to: addressToValue.toString(),
        value: weiAmountValue.toString()
        }

        const receipt = await signer.sendTransaction(transactionRequest);
        console.log(receipt);
        
        const dateObject = new Date(selectedDate);
        const timestamp = Math.floor(dateObject.getTime() / 1000);
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const sig = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS_APPOINTMENT, ABI_APPOINTMENT, sig);

            const reg1 = await contract.addAppointment(patientData.name, selectedDoctor[0], patientData.publicAddress, selectedDoctor[3], timestamp, selectedTime);
            console.log(reg1)
            const reg2 = await contract.getAllAppointment();
            console.log(reg2)
            // setDoctors(reg2);
        } catch (error) {
            console.error('Error registering Doctor:', error);
        }
    }

    const handleConfirmAppointment = () => {
        // alert(selectedDoctor + " | " + timestamp + " | " + selectedTime + " | " + patientData);
        // Reset appointment form fields
        console.log(patientData)
        registerAppointmentData()
        setSelectedDoctor(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setIsFormOpenApp(false);
        alert("Appointment confirmed")
    }

    async function registerDoctorData() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const sig = provider.getSigner();//yessy
            const contract = new ethers.Contract(CONTRACT_ADDRESS_DOCTOR, ABI_DOCTOR, sig);
            const reg1 = await contract.addDoctor(formData.name, formData.specialty, parseInt(formData.charge), formData.account);
            console.log(reg1)
            const reg2 = await contract.getAllDoctors();
            console.log(reg2)
            setDoctors(reg2);
        } catch (error) {
            console.error('Error registering Doctor:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerDoctorData();
        setFormData({ name: '', specialty: '', charge: '', account: '' });
        setIsFormOpen(false); 
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: Web3.utils.toHex(80001) }]
                });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS_DOCTOR, ABI_DOCTOR, signer);
                const doctors = await contract.getAllDoctors();
                setDoctors(doctors);
                console.log(doctors)
            } catch (error) {
                console.error('Error fetching Doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        doctor[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor[1].toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAppointment = (doctor) => {
        if(!isAdmin){
            setIsFormOpenApp(true); //yahan kuch prob ho raha acc to me

            setSelectedDoctor(doctor);
            // alert(patientData) // ye alert kar raha 
            // alert(doctor)
        }

        else alert("Only for patients")
        // setIsFormOpenApp(true);
    }

    return (
        <div className='poppins-regular' style={{ background:'#eff0f3', minHeight: '100vh', paddingTop: '1px' }}>
            {isFormOpenApp && (
                <div className="modal-container d-flex" style={myStyle}>
                    <div className="modal-background" onClick={() => setIsFormOpenApp(false)}></div>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ backgroundColor:"#fffffe", border: '1px solid #ccc', width: '400px', margin: 'auto', padding: '20px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Book Appointment</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsFormOpenApp(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="doctorName" className="form-label">Doctor Name</label>
                                        <input type="text" className="form-control" id="doctorName" name="doctorName" value={selectedDoctor ? selectedDoctor[0] : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="specialty" className="form-label">Specialty</label>
                                        <input type="text" className="form-control" id="specialty" name="specialty" value={selectedDoctor ? selectedDoctor[1] : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="charge" className="form-label">Consultation Charge in INR</label>
                                        <input type="text" className="form-control" id="charge" name="charge" value={selectedDoctor ? selectedDoctor[2].toNumber() : ''} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="charge1" className="form-label">Consultation Charge in ETH</label>
                                        <input type="text" className="form-control" id="charge1" name="charge1" value={selectedDoctor[2].toNumber() * 0.0000052} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label me-3">Date</label>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={date => setSelectedDate(date)}
                                            minDate={new Date()} // Set minimum date to today
                                            className="form-control"
                                            id="date"
                                            name="date"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="time" className="form-label">Time</label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="button"  style={{backgroundColor:"#d9376e" , border: "2px solid #d9376e"}} className="btn btn-primary" onClick={handleConfirmAppointment}>Confirm Appointment</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            {!isFormOpen && !isFormOpenApp && (
                <div style={{ margin: '20px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Doctors Information</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <table className="table table-striped" style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px' }}>NAME</th>
                                <th style={{ padding: '10px' }}>SPECIALITY</th>
                                <th style={{ padding: '10px' }}>CONSULTATION CHARGE</th>
                                <th style={{ padding: '10px' }}>ACCOUNT ADDRESS</th>
                                <th style={{ padding: '10px' }}> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px' }}>{doctor[0]}</td>
                                    <td style={{ padding: '10px' }}>{doctor[1]}</td>
                                    <td style={{ padding: '10px' }}>{doctor[2].toNumber()}</td>
                                    <td style={{ padding: '10px' }}>{doctor[3]}</td>
                                    <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ff8e3c" , border: "2px solid #ff8e3c"}} onClick={handleAppointment.bind(this, doctor)}>Book Appointment</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button type="button" className="btn btn-primary" style={{backgroundColor:"#d9376e" , border: "2px solid #d9376e"}} onClick={handleAddDoctorClick}>
                    Add New Doctor
                </button>
            </div>
            {isFormOpen && isAdmin && (
                <div className="modal-container d-flex" style={myStyle}>
                    <div className="modal-background" onClick={() => setIsFormOpen(false)}></div>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{backgroundColor:"#fffffe", border: '1px solid #ccc', width: '400px', margin: '50px auto', padding: '20px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Doctor</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsFormOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="specialty" className="form-label">Specialty</label>
                                        <input type="text" className="form-control" id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="charge" className="form-label">Consultation Charge</label>
                                        <input type="text" className="form-control" id="charge" name="charge" value={formData.charge} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="account" className="form-label">Account Address</label>
                                        <input type="text" className="form-control" id="account" name="account" value={formData.account} onChange={handleInputChange} required />
                                    </div>
                                    <button type="submit" style={{backgroundColor:"#d9376e" , border: "2px solid #d9376e"}} className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;