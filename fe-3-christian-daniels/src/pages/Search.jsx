// import React, { useEffect, useState} from "react";
import React from "react";
import Movies from "../services/Movies";
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

const Search = ({
  loggedinUser,
  setLoggedinUser,
  sessionId,
  setSessionId,
  movieId,
  setMovieId,
  dsearch, setDefaultSearch,
  history,
  location,
  match,
}) => {
    
if (!loggedinUser){
  history.push("/login");
}

    let [results, setResults] = React.useState();
    

    let [director, setDirector] = React.useState();
    let [year, setYear] = React.useState();
    let [title, setTitle] = React.useState();
    let [genre, setGenre] = React.useState();
    
    let [orderby, setOrder] = React.useState("rating");
    let [direction, setDirection] = React.useState("desc");
    let [limit, setLimit] = React.useState(50);

    // run initial search
    let [switcher, setSwitcher] = React.useState(true);
    if (loggedinUser && switcher) {
      // Run code to get required information
      setSwitcher(false);
      Movies.search(loggedinUser, sessionId, director, null, "avenge", genre, orderby, direction, 10)
      .then((response) => {
        setResults(response.data.movies);
      }).catch((error) => {
        alert(error)
      })
    }


  const handleSearch = (e) => {
    e.preventDefault(); // prevents page reload
    Movies.search(loggedinUser, sessionId, director, year, title, genre, orderby, direction, limit)
      .then((response) => {
        setResults(response.data.movies);
      }).catch((error) => {
        alert(error)
      })
      
  };
  

  const handleLinkClick = (e, movie_id) => {
      e.preventDefault();
      // Movies.get(loggedinUser, sessionId, movie_id)
      // let movie_id = e.target.getAttribute("href");
      setMovieId(movie_id);
      history.push("detail");
  }

  const handleDefault = () => {
    
    Movies.defaultSearch(loggedinUser, sessionId).then((response) => {
      setResults(response.data.movies);
      
    }).catch((error) => {
      // alert(error)
      
    })
  }

  if(dsearch){
    // handleDefault();
    
  }

  let moviesTable = "";
  let pageNumber = "";

  if (results) {

    let only10results = results.slice(0,10);

    moviesTable = (
      <table>
        <thead>
          <h1>Results</h1>
          <br></br>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Rating</td>
            <td>Year</td>
            <td>Director</td>
          </tr>
        </thead>
        <tbody>
          {only10results.map((result) => {
            return (
              <tr key={result.movie_id}>
                <td>
                  <img className="img-thumbnail" src={ "https://themoviedb.org/t/p/original"+ result.poster_path} />
                  </td>
                 <td>
                  <a href={"/detail"} onClick={(e) => handleLinkClick(e, result.movie_id)}>{result.title}</a>
                  </td>
                <td>{result.rating}</td>
                <td>{result.year}</td>
                <td>{result.director}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    if(results.length > 10){
      
      pageNumber = (
        
      <p className="thing"><br></br><a href={"#"}>1</a> <a href={"#"}>&gt;</a></p>);
      
    }
    else{
      pageNumber = (<p className="thing"><br></br><a href={"#"}>1</a></p>);
    }

  }
  else{
    moviesTable = (<p>Search for a Movie!</p>);
  }

  return (
    <div>
      

      <div className="form-box-search" >
      <h1>Search</h1>
        <form onSubmit={handleSearch}>
          <label className="form-label">Title</label>
          <input
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="form-label">Director</label>
          <input
            className="form-input"
            onChange={(e) => setDirector(e.target.value)}
          />
          <label className="form-label">Year</label>
          <input
            className="form-input"
            onChange={(e) => setYear(e.target.value)}
          />
            <label className="form-label">Genre</label>
          <input
            className="form-input"
            onChange={(e) => setGenre(e.target.value)}
          />
          <br></br>
          <br></br>
          <div className="something">
                <div class="dropdown">
                    <text>Limit: </text>
                <button class="dropbtn">10</button>
                <div class="dropdown-content">
                <a >10</a>
                    <a >20</a>
                    <a >30</a>
                    <a >40</a>
                    <a >50</a>
                </div>
                </div>

                <div onChange={event => setOrder(event.target.value)}>
                    <br></br>
                    <input type="radio" id="title" name="order" value="title" />
                        <label for="title"> Title</label><br></br>

                    <input type="radio" id="rating" name="order" value="rating" defaultChecked/>
                        <label for="rating"> Rating</label><br></br>

                    <input type="radio" id="year" name="order" value="year" />
                        <label for="year"> Year</label><br></br>

                        <br></br>
                </div>
                
                

                <div onChange={event => setDirection(event.target.value)}>
                    <input type="radio" id="asc" name="direction" value="asc" />
                        <label for="asc"> Ascending</label><br></br>

                    <input type="radio" id="desc" name="direction" value="desc" defaultChecked/>
                        <label for="desc"> Descending</label><br></br>

                </div>
                </div>
          <button className="form-button">Search Movies</button>
          
        </form>
      </div>
      <div className="form-box-results">
        {moviesTable}
        {pageNumber}
        </div>
    </div>
  );
};

export default Search;
