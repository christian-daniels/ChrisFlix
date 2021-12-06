import React from "react";
import Movies from "../services/Movies";
import Billing from "../services/Billing";
{
  /* <img id= "me" src="images/dasme.jpg"  
    style="float: left; margin-top: 60px; margin-right: 20px; margin-bottom: 100px; padding: 10px;">
    <h1>A Legend Among Us</h1>
    <h2>Hi, I'm Christian. This site's sole purpose is to display my creativity over the years - and to teach me a bit of HTML.<br><br>
    Enjoy my website! For my resume click <a href = "https://chrees.com//">here</a> <i style = "padding: 0%;" class="fa fa-heart-o" aria-hidden="true"></i></h2>

 */
}

// import React, { useEffect, useState} from "react";

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

const MovieDetail = ({
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
  let [results, setResults] = React.useState();
  let [quantity, setQuantity] = React.useState(0);
  // let [title, setTitle] = React.useState();
  // let [description, setDescription] = React.useState();

  // check if user is logged in
  if (!loggedinUser) {
    history.push("/login");
  }

  // Run detailed movie endpoint

  let [switcher, setSwitcher] = React.useState(true);
  if (movieId && switcher) {
    // Run code to get required information
    setSwitcher(false);
    Movies.getMovie(loggedinUser, sessionId, movieId)
      .then((response) => {
        setResults(response.data.movie);
      })
      .catch((error) => {
        alert(error);
      });
  }

  const handleAddtoCart = (e) => {
    e.preventDefault();
    // alert("Added " + quantity + " copies of " + results.title + "to your cart!");
    Billing.insertCart(loggedinUser, sessionId, results.movie_id, quantity)
      .then((response) => {
        alert(
          "Added " + quantity + " copies of \"" + results.title + "\" to your cart! "
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  let pageCode = "";

  // Need to get genres and people
  if (results) {
    pageCode = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${
            "https://themoviedb.org/t/p/original" + results.backdrop_path
          })`,
          flexDirection: "column",
          height: "140vh",
        }}
      >
        {/* Overview and Sale Table */}
        <div
          style={{
            background: `rgba(255, 255, 255, 0.8)`,
            width: "80%",
            height: "auto",
          }}
        >
          <div class="thing">
            <br />
            <br />
            <h1>{results.title}</h1>
            <h2>Directed by {results.director}</h2>
            <h3>{results.year}</h3>
            <br />
            <br />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table className="table-custom">
              <tr></tr>
              <tr>
                <td>
                  <img
                    class="img-detail"
                    src={
                      "https://themoviedb.org/t/p/original" +
                      results.poster_path
                    }
                  />
                </td>
                <td>
                  {/* Contains the overview and the Add to cart/quantity form */}
                  {results.overview}
                  <br />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <form onSubmit={handleAddtoCart}>
                      <br />
                      <br />
                      <table className="table-custom">
                        <tr></tr>
                        <tr>
                          <td>
                            <input
                              className="form-input-movie"
                              value={quantity}
                              type="number"
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </td>
                          <td>
                            <button className="form-button-smaller">
                              Add to Cart
                            </button>
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          {/* Rating, Votes, Budget, Revenue Table */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table
              className="table"
              style={{
                width: "70%",
              }}
            >
              <tr>
                <td>
                  <h5>Rating</h5>
                </td>
                <td>
                  <h5>Number of Votes</h5>
                </td>
                <td>
                  <h5>Revenue</h5>
                </td>
                <td>
                  <h5>Budget</h5>
                </td>
              </tr>
              <tr>
                <td>{results.rating}/10</td>
                <td>{results.num_votes}</td>
                <td>${results.revenue}</td>
                <td>${results.budget}</td>
              </tr>
            </table>
          </div>

          {/* Genre table */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table
              className="table-custom"
              style={{
                width: "70%",
              }}
            >
              <tr>
                <td>
                  <h5>Genres</h5>
                </td>
              </tr>
              <tr>
                <td>
                  {results.genres.map((genre) => {
                    return <text key={genre.genre_id}>{genre.name}, </text>;
                  })}
                </td>
              </tr>
            </table>
          </div>

          {/* People table */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table
              className="table-custom"
              style={{
                width: "70%",
              }}
            >
              <tr>
                <td>
                  <h5>Actors</h5>
                </td>
              </tr>
              <tr>
                <td>
                  {results.people.map((person) => {
                    return <text key={person.person_id}>{person.name}, </text>;
                  })}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return pageCode;
};

export default MovieDetail;
