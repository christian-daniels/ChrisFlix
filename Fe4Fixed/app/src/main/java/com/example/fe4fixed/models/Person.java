package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

public class Person {
    @SerializedName("person_id")
    private String person_id;

    @SerializedName("name")
    private String name;

    public Person(String person_id, String name) {
        this.person_id = person_id;
        this.name = name;
    }

    public String getPerson_id() {
        return person_id;
    }

    public void setPerson_id(String person_id) {
        this.person_id = person_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
