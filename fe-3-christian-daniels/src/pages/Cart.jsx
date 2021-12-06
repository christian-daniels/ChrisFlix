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
    Billing.retrieveCart(loggedinUser, sessionId)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const handleRemove = (e, movie_id) => {
    e.preventDefault();
    Billing.deleteItem(loggedinUser, sessionId, movie_id)
      .then((response) => {
        Billing.retrieveCart(loggedinUser, sessionId)
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleUpdate = (e, movie_id, quantity) => {
    e.preventDefault();
    Billing.updateCart(loggedinUser, sessionId, movie_id, quantity)
      .then((response) => {
        Billing.retrieveCart(loggedinUser, sessionId)
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleClear = (e) => {
    Billing.clearCart(loggedinUser, sessionId)
      .then((response) => {
        Billing.retrieveCart(loggedinUser, sessionId)
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  let cartTable = "";
  const handleOrder = (e) => {
    e.preventDefault();
    if (checkoutTime > 1) {
        alert("Completing your Order");
      Billing.completeOrder(loggedinUser, sessionId, token).then((response) => {
        
        setResults(response.data);
      });
    } else if (checkoutTime == 1){
        alert("Placing your Order, you will be redirected to PayPal");
      Billing.placeOrder(loggedinUser, sessionId).then((response) => {
        // window.location.href = response.data.approve_url;

        window.open(response.data.approve_url);
        setToken(response.data.token);
        setCheckoutText("Complete Order");
        setCheckoutTime(2);
        // Billing.
      });
    }
  };
  
  

  

  if (results) {
    let total = 0;
    if (results.resultCode == 3130) {
      // Calculate Total
      let total = 0;

      for (const item of results.items) {
        total += item.unit_price * item.quantity * (1 - item.discount);
      }

      // Create Cart table
      cartTable = (
        <div
          style={{
            background: `rgba(255, 255, 255, 0.8)`,
            width: "80%",
            height: "auto",
          }}
        >
          <table>
            <thead>
              <h1>Cart</h1>
              <br></br>
              <tr>
                <td></td>
                <td></td>
                <td>Title</td>
                <td>Price</td>
                <td>Discount</td>
                <td>Quantity</td>
                <td>Total Price</td>
              </tr>
            </thead>
            <tbody>
              {results.items.map((result) => {
                return (
                  <tr key={result.movie_id}>
                    <td>
                      <button
                        onClick={(e) => handleRemove(e, result.movie_id)}
                        className="form-button-remove"
                      >
                        -
                      </button>
                    </td>
                    <td>
                      <img
                        className="img-thumbnail"
                        src={
                          "https://themoviedb.org/t/p/original" +
                          result.poster_path
                        }
                      />
                    </td>
                    <td>{result.title}</td>
                    <td>${result.unit_price}</td>
                    <td>{result.discount}</td>
                    <td>
                      <input
                        className="form-input-movie"
                        value={result.quantity}
                        type="number"
                        onChange={(e) =>
                          handleUpdate(e, result.movie_id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      {new Intl.NumberFormat("en", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        result.unit_price *
                          result.quantity *
                          (1 - result.discount)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          <h2>
            Total:{" "}
            <h3>
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
              }).format(total)}
            </h3>
          </h2>
          <button onClick={handleOrder} className="form-button">
            {checkoutText}
          </button>
          <button onClick={handleClear} className="form-button-smaller">
            Clear Cart
          </button>
        </div>
      );
    } 
    else if (results.resultCode == 3420){
        cartTable = (
            <h1>Your order has been Completed!</h1>
        );
    }
    else {
      cartTable = (
        <div
          style={{
            background: `rgba(255, 255, 255, 0.8)`,
            width: "80%",
            height: "auto",
          }}
        >
          <table>
            <thead>
              <h1>Cart</h1>
              <br></br>
              <tr>
                <td></td>
                <td></td>
                <td>Title</td>
                <td>Price</td>
                <td>Discount</td>
                <td>Quantity</td>
                <td>Total Price</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <br />
          <h2>
            Total:{" "}
            <h3>
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
              }).format(total)}
            </h3>
          </h2>

          <p>Cart is empty!</p>

          {/* <button onClick={handleOrder} className="form-button">
            Checkout w/ PayPal
          </button>
          <button onClick={handleClear} className="form-button-smaller">
            Clear Cart
          </button> */}
        </div>
      );
    }
  } else {
    cartTable = <p>Loading your Cart...</p>;
  }

  return cartTable;
};

export default Cart;
