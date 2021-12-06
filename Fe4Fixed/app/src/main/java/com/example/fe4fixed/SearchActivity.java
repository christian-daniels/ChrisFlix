package com.example.fe4fixed;

import android.content.Intent;
import android.os.Bundle;

import com.example.fe4fixed.adapter.MovieAdapter;
import com.example.fe4fixed.models.MovieResult;
import com.example.fe4fixed.models.SearchResults;
import com.example.fe4fixed.models.User;
import com.example.fe4fixed.models.UserResponse;
import com.example.fe4fixed.resources.APIInterface;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SearchActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {


    private TextInputEditText title, director, year, genre, limit;
    private Button button, moreBtn;
    private ListView movieList;
    private Integer page;
    private ArrayList<MovieResult> currentMovies;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        movieList = findViewById(R.id.movie_results);
        title = findViewById(R.id.title_edittext);
        director = findViewById(R.id.director_edittext);
        year = findViewById(R.id.year_edittext);
        genre = findViewById(R.id.genre_edittext);
        limit = findViewById(R.id.limit_edittext);
        moreBtn = findViewById(R.id.moreBtn);


        movieList.setOnItemClickListener(this);
        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                page = 0;
                moreBtn.setVisibility(View.GONE);
                sendRequest();

            }
        });

        moreBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                page++;
                moreBtn.setVisibility(View.GONE);
                sendRequest();
            }
        });
    }

    private void sendRequest() {

        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:12347/api/")
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        APIInterface apiInterface = retrofit.create(APIInterface.class);
        Call<SearchResults> call = apiInterface.search("finalaccount@uci.edu", "something", "something",
                            title.getText().toString(), director.getText().toString(), Integer.getInteger(year.getText().toString()),
                            genre.getText().toString(), "rating", "desc", page*10, 10);
        call.enqueue(new Callback<SearchResults>() {
            @Override
            public void onResponse(Call<SearchResults> call, Response<SearchResults> response) {
                if (response.body().getResultCode() != null) {
                    Toast.makeText(SearchActivity.this, response.body().getMessage(), Toast.LENGTH_SHORT).show();
                    currentMovies = response.body().getMovies();
                    MovieAdapter movieAdapter = new MovieAdapter(SearchActivity.this, R.layout.listitem, response.body().getMovies());
                    movieList.setAdapter(movieAdapter);
                    if (response.body().getMovies().size() == 10)
                        moreBtn.setVisibility(View.VISIBLE);
                }
                else {
                    Toast.makeText(SearchActivity.this, "fail1", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<SearchResults> call, Throwable t) {
                Toast.makeText(SearchActivity.this, "fail2", Toast.LENGTH_SHORT).show();

            }
        });

    }


    public void onItemClick(AdapterView<?> l, View v, int position, long id) {
        Log.i("SearchActivity", " clicked Item: " + id + " at position: " + position + " movie_id: " + currentMovies.get(position).getMovie_id());
        // Then you start a new Activity via Intent
        Intent intent = new Intent();
        intent.setClass(this, MovieDetailActivity.class);
        intent.putExtra("position", position);
        // Or / And
        intent.putExtra("movie_id", currentMovies.get(position).getMovie_id());
        startActivity(intent);
    }

}