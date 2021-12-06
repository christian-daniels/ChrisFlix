// import React, { useEffect, useState} from "react";
import React from "react";
import Movies from "../services/Movies";
import Billing from "../services/Billing";
/*
  Using localStorage is similar to how we use
  dictionary.
  
  To set a variable call `localStorage.set("key", value)`
  To get a variable call `localStorage.get("key")`

  Local Storage persists through website refreshes so
  it is perfect for storing things we dont want to lose
  like a users session

  You must call `const localStorage = require("local-storage");`
  in any class that you want to use this in, it is the same
  local storage in the entire website regardless of where you call
  it as each website gets the same instance of the storage.

  So think of it as a global dictionary.
*/
const localStorage = require("local-storage");

const Cart = ({
  loggedinUser,
  setLoggedinUser,
  sessionId,
  setSessionId,
  movieId,
  setMovieId,
  dsearch,
  setDefaultSearch,
  history,
  location,
  match,
}) => {
  if (!loggedinUser) {
    history.push("/login");
  }
  let [total, setTotal] = React.useState(0);
  let [results, setResults] = React.useState();
  let [checkoutText, setCheckoutText] = React.useState("Checkout w/ PayPal");
  let [checkoutTime, setCheckoutTime] = React.useState(1);
  let [switcher, setSwitcher] = React.useState(true);
  let [token, setToken] = React.useState();
  
  
  
  
  if (loggedinUser && switcher) {
    // Run code to get required information
    setSwitcher(false);
    Billing.retrieveHistory(loggedinUser, sessionId)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  
  
  let historyTable = "";

  

  if (results) {
    
    if (results.resultCode == 3410) {
      

      // Create History table
      historyTable = (
        <div
          style={{
            background: `rgba(255, 255, 255, 0.8)`,
            width: "80%",
            height: "auto",
          }}
        >
          <table>
            <thead>
              <h1>Order History</h1>
              <br></br>
              <tr>
              <td>Description</td>
                <td>Amount Paid</td>
                <td>Date</td>
                
              </tr>
            </thead>
            <tbody>
              {results.transactions.map((result) => {
                return (
                  <tr key={result.capture_id}>
                    <td>Purchased {result.items[0].quantity} movies</td>
                    <td>{result.items[0].sale_date}</td>
                    <td>${result.amount.total}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
        </div>
      );
    } 
    else {
        historyTable = (
            <div
              style={{
                background: `rgba(255, 255, 255, 0.8)`,
                width: "80%",
                height: "auto",
              }}
            >
              <table>
                <thead>
                  <h1>Order History</h1>
                  <br></br>
                  <tr>
                    <td>Date</td>
                    <td>Amount Paid</td>
                    <td>Bought</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                        <td>No Purchases have been made</td>
                        <td></td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          );
    }
  } else {
    historyTable = <p>Loading your History...</p>;
  }

  return historyTable;
};

export default Cart;
