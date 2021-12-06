import Socket from "./Socket";
import { baseUrl, billingEPs } from "../config/config.json";
import Gateway from "./Gateway";



async function insertCart(userEmail, session, movie_id, quantity) {
    let payLoad = { };
    payLoad["email"] = userEmail;
    payLoad["movie_id"] = movie_id;
    payLoad["quantity"] = quantity;
    
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.insertEP,
        data : payLoad,
        headers : headers
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function updateCart(userEmail, session, movie_id, quantity) {
    let payLoad = { };
    payLoad["email"] = userEmail;
    payLoad["movie_id"] = movie_id;
    payLoad["quantity"] = quantity;
    
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.updateEP,
        data : payLoad,
        headers : headers
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function deleteItem(userEmail, session, movie_id) {
    let payLoad = { };
    payLoad["email"] = userEmail;
    payLoad["movie_id"] = movie_id;
    
    
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.deleteEP,
        data : payLoad,
        headers : headers
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function placeOrder(userEmail, session){
    let payLoad = { };
    
    
    payLoad["email"] = userEmail;
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.placeEP,
        data : payLoad,
        headers : headers
    }
    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function completeOrder(userEmail, session, token) {
    let payLoad = {};
    payLoad["token"] = token;
    payLoad["payer_id"] = "9K885097EJ830380M"
    

    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.confirmEP,
        params : payLoad,
        headers : headers
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

async function retrieveHistory(userEmail, session) {
    let payLoad = { };
    payLoad["email"] = userEmail;
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.retrieveOrderEP,
        data : payLoad,
        headers : headers
    }
    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function retrieveCart(userEmail, session) {
    let payLoad = { };
    
    
    payLoad["email"] = userEmail;
    
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.retrieveEP,
        data : payLoad,
        headers : headers
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

async function clearCart(userEmail, session) {
    let payLoad = { };
    
    
    payLoad["email"] = userEmail;

    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :billingEPs.clearEP,
        data : payLoad,
        headers : headers
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}




export default {
    insertCart, updateCart, deleteItem, retrieveCart, clearCart,
    placeOrder, completeOrder, retrieveHistory
};