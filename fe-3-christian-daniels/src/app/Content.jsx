import React from "react";
import {Redirect,Route, Switch} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Browse from "../pages/Browse";
import MovieDetail from "../pages/MovieDetail"
import Cart from "../pages/Cart";
import History from "../pages/History"

const Content = ({loggedinUser,setLoggedinUser, sessionId, setSessionId}) => {
    const [movieId, setMovieId] =  React.useState();
    const [dsearch, setDefaultSearch] = React.useState();
    return (
        <div className="content">
            <Redirect exact path="/" to="/login"/>

            <Switch>
                <Route path="/login"
                       component={props => <Login 
                                            loggedinUser={loggedinUser}
                                            setLoggedinUser={setLoggedinUser}
                                            sessionId={sessionId}
                                            setSessionId={setSessionId}
                                            dsearch={dsearch}
                                            setDefaultSearch={setDefaultSearch}
                                        {...props}/>}/>
                 <Route path="/register"
                       component={props => <Register 
                                            loggedinUser={loggedinUser}
                                            setLoggedinUser={setLoggedinUser}
                                            {...props}/>}/>
                <Route path ="/index"
                    component={props => <Search 
                                            loggedinUser={loggedinUser}
                                            setLoggedinUser={setLoggedinUser}
                                            sessionId={sessionId}
                                            setSessionId={setSessionId}
                                            movieId={movieId}
                                            setMovieId={setMovieId}
                                            dsearch={dsearch}
                                            setDefaultSearch={setDefaultSearch}
                                            {...props}/>}/>
                
                <Route path ="/browse"
                    component={props => <Browse 
                        loggedinUser={loggedinUser}
                        setLoggedinUser={setLoggedinUser}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        dsearch={dsearch}
                        setDefaultSearch={setDefaultSearch}
                        {...props}/>}/>
                <Route path ="/detail"
                    component={props => <MovieDetail 
                        loggedinUser={loggedinUser}
                        setLoggedinUser={setLoggedinUser}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        dsearch={dsearch}
                        setDefaultSearch={setDefaultSearch}
                        {...props}/>}/>

<Route path ="/cart"
                    component={props => <Cart 
                        loggedinUser={loggedinUser}
                        setLoggedinUser={setLoggedinUser}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        dsearch={dsearch}
                        setDefaultSearch={setDefaultSearch}
                        {...props}/>}/>

<Route path ="/history"
                    component={props => <History 
                        loggedinUser={loggedinUser}
                        setLoggedinUser={setLoggedinUser}
                        sessionId={sessionId}
                        setSessionId={setSessionId}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        dsearch={dsearch}
                        setDefaultSearch={setDefaultSearch}
                        {...props}/>}/>
            </Switch>
        </div>
    );
}

export default Content;
