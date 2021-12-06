package com.example.fe4fixed.resources;



import com.example.fe4fixed.models.MovieDetailed;
import com.example.fe4fixed.models.MovieDetailedResponse;
import com.example.fe4fixed.models.SearchResults;
import com.example.fe4fixed.models.User;
import com.example.fe4fixed.models.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface APIInterface {

    //API Calls

    /**
     * Authentication
     */

    // Register
     @POST("idm/register")
    Call<UserResponse> registerUser(@Body User user);

    // Login
    @POST("idm/login")
    Call<UserResponse> loginUser(@Body User user);

    /**
     * Movies
     * */

    @GET("movies/search")
    Call<SearchResults> search(@Header("email") String email, @Header("session_id") String session_id, @Header("transaction_id") String transaction_id,
                               @Query("title") String title, @Query("director") String director, @Query("year") Integer year,
                               @Query("genre") String genre, @Query("orderby") String orderby, @Query("direction") String direction,
                               @Query("offset") Integer offset, @Query("limit") Integer limit);

    @GET("movies/get/{id}")
    Call<MovieDetailedResponse> getMovie(@Path("id") String movie_id, @Header("email") String email, @Header("session_id") String session_id, @Header("transaction_id") String transaction_id);

}
