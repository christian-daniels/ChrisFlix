package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

public class MovieResult {

    @SerializedName("movie_id")
    private String movie_id;
    @SerializedName("title")
    private String title;
    @SerializedName("director")
    private String director;
    @SerializedName("rating")
    private Float rating;
    @SerializedName("year")
    private Integer year;
    @SerializedName("backdrop_path")
    private String backdrop;
    @SerializedName("poster_path")
    private String poster;


    public MovieResult(String movie_id, String title, String director, Float rating, Integer year, String backdrop, String poster) {
        this.movie_id = movie_id;
        this.title = title;
        this.director = director;
        this.rating = rating;
        this.year = year;
        this.backdrop = backdrop;
        this.poster = poster;
    }

    public String getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(String movie_id) {
        this.movie_id = movie_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getBackdrop() {
        return backdrop;
    }

    public void setBackdrop(String backdrop) {
        this.backdrop = backdrop;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
