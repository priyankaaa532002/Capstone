import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import MyContext from './MyContext';

import { useState } from 'react';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [patientData,setPatientData] = useState({});
  const updateIsAdmin = (newValue) => {
    setIsAdmin(newValue);
  };
  const updatePatientData = (newValue) => {
    setPatientData(newValue);
  };
  return (
    <MyContext.Provider value={{ isAdmin, updateIsAdmin ,patientData,updatePatientData}}>
      <div className="App">
        <NavbarComp />
      </div>
    </MyContext.Provider>
  );
}

export default App;
