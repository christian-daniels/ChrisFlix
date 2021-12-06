package com.example.fe4fixed.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.example.fe4fixed.R;
import com.example.fe4fixed.models.MovieResult;

import java.util.ArrayList;

public class MovieAdapter extends ArrayAdapter<MovieResult> {

    private Context mContext;
    private int mResource;

    private static class ViewHolder {
        TextView title;
        TextView director;
        TextView rating;
        TextView year;
        ImageView poster;
    }
    public MovieAdapter(Context context, int resource, ArrayList<MovieResult> objects) {
        super(context, resource, objects);
        mContext = context;
        mResource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        // Get the movie information
        String title = getItem(position).getTitle();
        String director = getItem(position).getDirector();
        Float rating = getItem(position).getRating();
        Integer year = getItem(position).getYear();
        String poster = getItem(position).getPoster();
        String backdrop = getItem(position).getBackdrop();
        MovieResult movieResult = new MovieResult(getItem(position).getMovie_id(), title, director, rating, year,backdrop,poster);

        final View result;
        ViewHolder holder;
        if (convertView == null){
            LayoutInflater inflater = LayoutInflater.from(mContext);
            convertView = inflater.inflate(mResource, parent, false);
            holder= new ViewHolder();
            holder.title = (TextView) convertView.findViewById(R.id.title_item);
            holder.director = (TextView) convertView.findViewById(R.id.director_item);
            holder.year = (TextView) convertView.findViewById(R.id.year_item);
            holder.rating = (TextView) convertView.findViewById(R.id.rating_item);
            holder.poster = (ImageView) convertView.findViewById(R.id.image_item);

            result = convertView;

            convertView.setTag(holder);
        }
        else{
            holder = (ViewHolder) convertView.getTag();
            result = convertView;
        }

        Glide.with(mContext)  //2
                .load("https://themoviedb.org/t/p/original"+ movieResult.getPoster()) //3
                 //4
                .placeholder(R.drawable.movieicon) //5
                .error(R.drawable.movieicon) //6
                .fallback(R.drawable.movieicon) //7
                .into(holder.poster); //8
        holder.title.setText(movieResult.getTitle());
        holder.rating.setText(Float.toString(movieResult.getRating()));
        holder.year.setText(Integer.toString(movieResult.getYear()));
        holder.director.setText(movieResult.getDirector());

        return convertView;
    }
}
