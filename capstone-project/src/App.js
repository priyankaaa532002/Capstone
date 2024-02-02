import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import MyContext from './MyContext';

import { useState } from 'react';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const updateIsAdmin = (newValue) => {
    setIsAdmin(newValue);
  };
  return (
    <MyContext.Provider value={{ isAdmin, updateIsAdmin }}>
      <div className="App">
        <NavbarComp />
      </div>
    </MyContext.Provider>
  );
}

export default App;
