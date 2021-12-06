package com.example.fe4fixed;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import com.example.fe4fixed.models.User;
import com.example.fe4fixed.models.UserResponse;
import com.example.fe4fixed.resources.APIInterface;
import com.google.android.material.textfield.TextInputEditText;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {


    private TextInputEditText email;
    private TextInputEditText password;
    private TextView registerBtn;
    private Button button;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);



        email = findViewById(R.id.email_edittext);
        password = findViewById(R.id.password_edittext);
        button = findViewById(R.id.button);
        registerBtn = findViewById(R.id.registerBtn);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                User user = new User(email.getText().toString(), password.getText().toString().split("(?!^)"));
                sendRequest(user);
//                startActivity(new Intent(getApplicationContext(), SearchActivity.class));

            }
        });
        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), RegisterActivity.class));
            }
        });


    }

    private void sendRequest(User user) {

        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:12346/api/")
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        APIInterface apiInterface = retrofit.create(APIInterface.class);
        Call<UserResponse> call = apiInterface.loginUser(user);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.body().getResultCode() != null) {
                    if (response.body().getResultCode() == 14)
                        Toast.makeText(MainActivity.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();
                    else if (response.body().getResultCode() == 11)
                        Toast.makeText(MainActivity.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();
                    else if (response.body().getResultCode() == 120) {
                        Toast.makeText(MainActivity.this, "User registered successfully!", Toast.LENGTH_SHORT).show();
                        startActivity(new Intent(getApplicationContext(), SearchActivity.class));
                    } else {
                        Toast.makeText(MainActivity.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();

                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "fail", Toast.LENGTH_SHORT).show();

                }

            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Failed " + t.toString(), Toast.LENGTH_SHORT).show();
            }
        });

    }

    public void onRadioButtonClicked1(View view) {
        // Is the button now checked?
        boolean checked = ((RadioButton) view).isChecked();

        // Check which radio button was clicked
        switch(view.getId()) {
            case R.id.year_radio:
                if (checked)
                    // Pirates are the best
                    break;
            case R.id.rating_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.title_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.asc_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.desc_radio:
                if (checked)
                    // Ninjas rule
                    break;
        }
    }
    public void onRadioButtonClicked2(View view) {
        // Is the button now checked?
        boolean checked = ((RadioButton) view).isChecked();

        // Check which radio button was clicked
        switch(view.getId()) {
            case R.id.year_radio:
                if (checked)
                    // Pirates are the best
                    break;
            case R.id.rating_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.title_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.asc_radio:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.desc_radio:
                if (checked)
                    // Ninjas rule
                    break;
        }
    }

}