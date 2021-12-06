package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class SearchResults {
    @SerializedName("resultCode")
    private Integer resultCode;

    @SerializedName("message")
    private String message;

    @SerializedName("movies")
    private ArrayList<MovieResult> movies;

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

    public ArrayList<MovieResult> getMovies() {
        return movies;
    }

    public void setMovies(ArrayList<MovieResult> movies) {
        this.movies = movies;
    }
}
