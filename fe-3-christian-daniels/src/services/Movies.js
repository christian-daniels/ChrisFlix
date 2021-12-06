import Socket from "./Socket";
import { baseUrl, movieEPs } from "../config/config.json";
import Gateway from "./Gateway";

async function search(userEmail, session, 
    director, year, title, genre, orderby, direction, limit) {
    let payLoad = { };
    
    payLoad["director"] = director;
    payLoad["year"] = year;
    payLoad["title"] = title;
    payLoad["genre"] = genre;
    payLoad["orderby"] = orderby;
    payLoad["direction"] = direction;
    payLoad["limit"] = limit;
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :movieEPs.searchEP,
        params : payLoad,
        headers : headers
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

async function browse(userEmail, session, 
    phrase, orderby, direction, limit) {
    let payLoad = { };
    
    
    
    payLoad["orderby"] = orderby;
    payLoad["direction"] = direction;
    payLoad["limit"] = limit;
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :movieEPs.browseEP + "/" + phrase,
        params : payLoad,
        headers : headers
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

async function getMovie(userEmail, session,  movieId) {
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :movieEPs.getEP + "/" + movieId,
        headers : headers
    }
    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

async function defaultSearch(userEmail, session) {
    let payLoad = { };
    
    payLoad["orderby"] = "year";
    payLoad["direction"] = "desc";
    payLoad["limit"] = 50;
    const headers = {
        "email" : userEmail,
        "session_id" : session
    };

    const options = {
        baseURL : baseUrl,
        url :movieEPs.searchEP,
        params : payLoad,
        headers : headers
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}

export default {
    search, defaultSearch, browse, getMovie
};
