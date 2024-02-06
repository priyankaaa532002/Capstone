import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import MyContext from './MyContext';

import { useState } from 'react';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [patientData,setPatientData] = useState({
    name : '',
    publicAddress: ''
  });
  const updateIsAdmin = (newValue) => {
    setIsAdmin(newValue);
  };
  const updatePatientData = (newValue, isLogin, name, account) => {
    if(isLogin) {
      patientData.name = newValue[0];
      patientData.publicAddress = newValue[4];
    } else {
      patientData.name = name;
      patientData.publicAddress = account;
    }
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
