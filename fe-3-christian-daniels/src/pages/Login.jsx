import React, {useContext, useEffect} from "react";
import Idm from "../services/Idm";
import {useSession} from "../hook/Session";

const localStorage = require("local-storage");

const Login = ({loggedinUser, setLoggedinUser, sessionId, setSessionId, 
    dsearch, setDefaultSearch,
    history, location, match }) => {
    // const {session, setSession} = useSession();

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();


 // The Top ({ history, location, match }) is a short hand for the following code:
    //     const Login = (props) => {
    //         const { history, location, match } = props;
    // If you want to accept more props just place it there like this:
    //     const Login = ({ history, location, match, yourVar }) => {
    /**
   * Buttons have default behavior which will cause
   * the entire page to refresh, this isn't what
   * we want in React as everything updates according
   * to the state. So we prevent that action by
   * using "e.preventDefault();"
   *
   * @param e Event
   */

   
   const handleSubmit = (e) => {
    e.preventDefault();

    Idm.login(email, password)
        .then(response => {
            if (response.data.resultCode == 14){
                alert("User is not registered")
            }
            else{
                setLoggedinUser(email);
                setSessionId(response.data.session_id);
                setDefaultSearch("yes");
                history.push("/index")
            }
            
        })
        .catch(error => alert(error));
};

    return (
        <div className="form-box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Email</label>
                <input
                    className="form-input"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label">Password</label>
                <input
                    className="form-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="form-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
