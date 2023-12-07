import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login.js';
import Emp_Login from './components/EmployeeLogin.js';
import Home from './components/Home.js';
import Register from './components/Register';
import Transactions from './components/Transactions';
import MoneyTransfers from './components/MoneyTransfers';
import EditProfile from './components/EditProfile';
import ContactUs from './components/ContactUs';
import ForgotPassword from './components/ForgotPassword';
import Admin from './components/Admin.js';
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  }
  const handleLogout = () => {
    setUser(null);
  }


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/EmployeeLogin" element={<Emp_Login handleLogin={handleLogin}/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Home" element={<Home user={user}/>}/>
        <Route path="/Transactions" element={<Transactions/>}/>
        <Route path="/MoneyTransfers" element={<MoneyTransfers/>}/>
        <Route path="/EditProfile" element={<EditProfile/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
        <Route path="/Admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
