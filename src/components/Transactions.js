import React from 'react';
import logo from './logo.png';

function Transactions() {
  return (
    <>
      <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="./Home">
            <img src={logo} alt='logo' class="logo"/> SASS Bank </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href='./Transactions'>Transactions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./MoneyTransfers">Money Transfers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./EditProfile">Edit Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./ContactUs">Contact Us</a>
              </li>
            </ul>
            <span class="navbar-text">
            <a class="nav-link" href="./">Logout</a>
            </span>
          </div>
        </div>
      </nav>

      <div class="container" id='transaction-history'>
      <h1>Transaction History</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Transaction Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>1st Dec 2023</td>
            <td>Paid to Uber Eats</td>
            <td>debit</td>
            <td>$20.25</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>30th Nov 2023</td>
            <td>Payment from Sushma</td>
            <td>credit</td>
            <td>$50.50</td>
          </tr>
        </tbody>
      </table>
      </div>

      <footer class="text-white text-center text-lg-start">
          <div class="text-center p-3">
              &copy; 2023 Copyright: SASS Bank
          </div>
      </footer>
    </>
  )
}

export default Transactions;