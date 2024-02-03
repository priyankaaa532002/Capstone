import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../MyContext'; 
import { CONTRACT_ADDRESS_DOCTOR, ABI_DOCTOR } from '../Constants';
import { ethers } from 'ethers';
import Web3 from 'web3';

const myStyle = {
    textAlign: "left",
    margin: "5px"
};

const DoctorManagement = () => {
    const { isAdmin , patientData} = useContext(AdminContext);
    const [doctors, setDoctors] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', specialty: '', charge: '', account: ''});
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleAppointment = (doctor) => {
        if(!isAdmin){
            alert(patientData)
            // alert(doctor)
        }
        
        else alert("Only for patients")
    }

    async function registerDoctorData() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Web3.utils.toHex(80001) }]
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const sig = provider.getSigner();
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

    return (
        <div>
            {!isFormOpen && (
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
                                    <td><button type="button" className="btn btn-primary" onClick={handleAppointment.bind(this,doctor)}>Book Appointment</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button type="button" className="btn btn-primary" onClick={handleAddDoctorClick}>
                    Add New Doctor
                </button>
            </div>
            {isFormOpen && isAdmin && (
                <div className="modal-container d-flex" style={myStyle}>
                    <div className="modal-background" onClick={() => setIsFormOpen(false)}></div>
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ border: '1px solid #ccc', width: '400px', margin: '50px auto', padding: '20px' }}>
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
                                    <button type="submit" className="btn btn-primary">Submit</button>
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
