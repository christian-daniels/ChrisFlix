package com.example.fe4fixed;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fe4fixed.adapter.MovieAdapter;
import com.example.fe4fixed.models.Genre;
import com.example.fe4fixed.models.MovieDetailed;
import com.example.fe4fixed.models.MovieDetailedResponse;
import com.example.fe4fixed.models.Person;
import com.example.fe4fixed.models.SearchResults;
import com.example.fe4fixed.resources.APIInterface;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MovieDetailActivity extends AppCompatActivity {

    private String movie_id, posterid, backdropid;
    private TextView title, overview, year, revenue, votes, budget, rating, genre;
    private ImageView poster, backdrop, arrow;
    private ListView personList;
    private ScrollView scrollView;
    private Integer state = 1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_detail);

        Intent intent = getIntent();
        movie_id = intent.getStringExtra("movie_id");
        scrollView = findViewById(R.id.scrollLayout);
        title = findViewById(R.id.titleDetailed);
        overview = findViewById(R.id.overviewDetailed);
        year = findViewById(R.id.yearDetailed);
        poster = findViewById(R.id.posterDetailed);
        revenue = findViewById(R.id.revenueDetailed);
        votes = findViewById(R.id.numVotesDetailed);
        budget = findViewById(R.id.budgetDetailed);
        rating = findViewById(R.id.ratingDetailed);
        backdrop = findViewById(R.id.backdropDetailed);
        genre = findViewById(R.id.genreDetailed);
        personList = findViewById(R.id.actorsList);
        arrow = findViewById(R.id.arrowDetailed);

        sendRequest();


        poster.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                    state = 0;
                    poster.setVisibility(View.INVISIBLE);
                    backdrop.setVisibility(View.VISIBLE);

            }
        });

        backdrop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                    state = 1;
                    backdrop.setVisibility(View.INVISIBLE);
                    poster.setVisibility(View.VISIBLE);


            }
        });
        arrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }


    private void sendRequest() {

        Retrofit.Builder builder = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:12347/api/")
                .addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        APIInterface apiInterface = retrofit.create(APIInterface.class);
        Call<MovieDetailedResponse> call = apiInterface.getMovie(movie_id, "finalaccount@uci.edu", "something", "something");
        call.enqueue(new Callback<MovieDetailedResponse>() {
            @Override
            public void onResponse(Call<MovieDetailedResponse> call, Response<MovieDetailedResponse> response) {
//                Toast.makeText(MovieDetailActivity.this, response.body().getMovie().getOverview(), Toast.LENGTH_SHORT).show();
                year.setText(Integer.toString(response.body().getMovie().getYear()));
                title.setText(response.body().getMovie().getTitle());
                overview.setText(response.body().getMovie().getOverview());
                votes.setText(Integer.toString(response.body().getMovie().getNum_votes()));
                revenue.setText("$" + response.body().getMovie().getRevenue());
                rating.setText(Float.toString(response.body().getMovie().getRating()) + "/10");
                budget.setText("$" + response.body().getMovie().getBudget());
                posterid = response.body().getMovie().getPoster();
                backdropid = response.body().getMovie().getBackdrop();

                Glide.with(getApplicationContext())  //2
                        .load("https://themoviedb.org/t/p/original"+ response.body().getMovie().getPoster()) //3
                        //4
                        .placeholder(R.drawable.movieicon) //5
                        .error(R.drawable.movieicon) //6
                        .fallback(R.drawable.movieicon) //7
                        .into(poster); //8

                Glide.with(getApplicationContext())  //2
                        .load("https://themoviedb.org/t/p/original" + backdropid) //3
                        //4
                        .placeholder(R.drawable.movieicon) //5
                        .error(R.drawable.movieicon) //6
                        .fallback(R.drawable.movieicon) //7
                        .into(backdrop);

                String listofgenres = "";
                for (Genre genreobj : response.body().getMovie().getGenres()){
                    listofgenres += genreobj.getName()+", ";
                }
                genre.setText(listofgenres.substring(0, listofgenres.length()-2));

//                ArrayList<String> names = new ArrayList<>();
                String[] names = new String[response.body().getMovie().getPeople().size()];
                int count = 0;
                for (Person actor : response.body().getMovie().getPeople()){
//                    names.add(actor.getName());
                    names[count] = actor.getName();
                    count++;
                }

                ArrayAdapter actorAdapter = new ArrayAdapter<String>(getApplicationContext(), R.layout.actoritem, names);
                personList.setAdapter(actorAdapter);
                personList.setFocusable(false);

            }

            @Override
            public void onFailure(Call<MovieDetailedResponse> call, Throwable t) {

            }
        });


    }
}