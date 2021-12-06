package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

public class Genre {

    @SerializedName("genre_id")
    private Integer genre_id;
    @SerializedName("name")
    private String name;

    public Genre(Integer genre_id, String name) {
        this.genre_id = genre_id;
        this.name = name;
    }

    public Integer getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(Integer genre_id) {
        this.genre_id = genre_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
