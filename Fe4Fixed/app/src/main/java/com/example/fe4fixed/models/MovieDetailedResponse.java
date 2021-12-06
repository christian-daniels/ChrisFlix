package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.HashMap;

public class MovieDetailedResponse {
    @SerializedName("resultCode")
    private Integer resultCode;

    @SerializedName("message")
    private String message;

    @SerializedName("movie")
    private MovieDetailed movie;

    public MovieDetailedResponse(Integer resultCode, String message, MovieDetailed movie) {
        this.resultCode = resultCode;
        this.message = message;
        this.movie = movie;
    }

    public Integer getResultCode() {
        return resultCode;
    }

    public void setResultCode(Integer resultCode) {
        this.resultCode = resultCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MovieDetailed getMovie() {
        return movie;
    }

    public void setMovie(MovieDetailed movie) {
        this.movie = movie;
    }
}
