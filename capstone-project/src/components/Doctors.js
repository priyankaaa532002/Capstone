import React, { useContext, useState } from 'react';
import AdminContext from '../MyContext'; 

const DoctorManagement = () => {
    const { isAdmin } = useContext(AdminContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', field: '', fees: '' });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setIsFormOpen(false); 
    };

    return (
        <div>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button type="button" className="btn btn-primary" onClick={handleAddDoctorClick}>
                    Add New Doctor
                </button>
            </div>
            {isFormOpen && isAdmin && (
                <div className="modal-container d-flex justify-content-center align-items-center">
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
                                        <label htmlFor="field" className="form-label">Field</label>
                                        <input type="text" className="form-control" id="field" name="field" value={formData.field} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fees" className="form-label">Fees</label>
                                        <input type="text" className="form-control" id="fees" name="fees" value={formData.fees} onChange={handleInputChange} required />
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
