import React, { useState, useEffect } from 'react';
import logo from './logo.png';

function EditProfile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

  const regExPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setEmail(userData.email);
    }
  }, []);

  const validatePassword = () => {
    if (!password) {
      setPasswordErrorMsg("Password is a mandatory field");
    } else if (!regExPassword.test(password)) {
      setPasswordErrorMsg("Please enter a valid password, should contain at least one number and one special character and should be min 8 and max 15 characters");
    } else {
      setPasswordErrorMsg("");
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordErrorMsg("Confirm Password is a mandatory field");
    } else if (confirmPassword !== password) {
      setConfirmPasswordErrorMsg("Passwords do not match");
    } else {
      setConfirmPasswordErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePassword();
    validateConfirmPassword();

    if (!passwordErrorMsg && !confirmPasswordErrorMsg && password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:5000/app/EditUser", {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, newPassword: password }),
        });

        if (response.ok) {
          alert('Password updated successfully');
          // Redirect or further actions here
        } else {
          const errorData = await response.json();
          alert('Failed to update password: ' + errorData.error);
        }
      } catch (error) {
        alert('Error during password update: ' + error.message);
      }
    }
  };

  return (

    <>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="./Home">
          <img src={logo} alt='logo' className="logo"/> SASS Bank </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href='./Transactions'>Transactions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./MoneyTransfers">Money Transfers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="./EditProfile">Edit Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./ContactUs">Contact Us</a>
            </li>
          </ul>
          <span className="navbar-text">
          <a className="nav-link" href="./">Logout</a>
          </span>
        </div>
      </div>
    </nav>

    <div className="container" id='edit-profile'>
      <h1>Edit Profile</h1>
      <h4>Use the form below to update your password</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} readOnly />
        </div>
      
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>

    <footer className="text-white text-center text-lg-start">
        <div className="text-center p-3">
            &copy; 2023 Copyright: SASS Bank
        </div>
    </footer>
    </>
  );
}

export default EditProfile;
