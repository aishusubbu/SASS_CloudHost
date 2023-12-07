import React, { useState, useEffect } from 'react';
import logo from './logo.png';

function Admin(handleLogout) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/app/getAllUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Ensure to add authorization headers or other security measures
          },
        });
  
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error during fetchUsers:', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="./Admin">
            <img src={logo} alt='logo' class='logo'/> SASS Bank </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <span class="navbar-text">
            <a class="nav-link" href="./">Logout</a>
            </span>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1>Hello, Admin</h1>
        <br></br>
        <h2>All Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              {/* Add other relevant columns */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                {/* Add other relevant data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer class="text-white text-center text-lg-start">
          <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
          </div>
      </footer>
    </>
  );

}

export default Admin;
