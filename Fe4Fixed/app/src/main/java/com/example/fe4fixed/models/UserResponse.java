package com.example.fe4fixed.models;

import com.google.gson.annotations.SerializedName;

public class UserResponse {
    @SerializedName("resultCode")
    private Integer resultCode;

    @SerializedName("message")
    private String message;


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

}
