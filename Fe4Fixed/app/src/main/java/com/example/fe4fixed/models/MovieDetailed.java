package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class MovieDetailed {

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
    @SerializedName("num_votes")
    private Integer num_votes;
    @SerializedName("budget")
    private String budget;
    @SerializedName("revenue")
    private String revenue;
    @SerializedName("overview")
    private String overview;
    @SerializedName("genres")
    private ArrayList<Genre> genres;
    @SerializedName("people")
    private ArrayList<Person> people;

    public MovieDetailed(String movie_id, String title, String director, Float rating, Integer year, String backdrop, String poster, Integer num_votes, String budget, String revenue, String overview, ArrayList<Genre> genres, ArrayList<Person> people) {
        this.movie_id = movie_id;
        this.title = title;
        this.director = director;
        this.rating = rating;
        this.year = year;
        this.backdrop = backdrop;
        this.poster = poster;
        this.num_votes = num_votes;
        this.budget = budget;
        this.revenue = revenue;
        this.overview = overview;
        this.genres = genres;
        this.people = people;
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

    public Integer getNum_votes() {
        return num_votes;
    }

    public void setNum_votes(Integer num_votes) {
        this.num_votes = num_votes;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getRevenue() {
        return revenue;
    }

    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public ArrayList<Genre> getGenres() {
        return genres;
    }

    public void setGenres(ArrayList<Genre> genres) {
        this.genres = genres;
    }

    public ArrayList<Person> getPeople() {
        return people;
    }

    public void setPeople(ArrayList<Person> people) {
        this.people = people;
    }
}
