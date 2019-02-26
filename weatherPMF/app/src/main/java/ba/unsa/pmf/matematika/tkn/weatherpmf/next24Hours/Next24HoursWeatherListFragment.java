package ba.unsa.pmf.matematika.tkn.weatherpmf.next24Hours;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import ba.unsa.pmf.matematika.tkn.weatherpmf.R;
import model.HourlyWeatherListItem;
import model.Next24HoursForecast;


public class Next24HoursWeatherListFragment extends Fragment {

    private RecyclerView weatherRecyclerView;
    private WeatherAdapter adapter;
    private JSONObject weatherResponseObject;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_weather_list, container, false);
        weatherRecyclerView = (RecyclerView) view.findViewById(R.id.weather_recycler_view);
        weatherRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));

        initWeatherResponseObject();

        updateUI();

        return view;
    }

    private void updateUI() {
        Next24HoursForecast next24HoursForecast = Next24HoursForecast.get(getActivity(), weatherResponseObject);
        List<HourlyWeatherListItem> hourlyWeatherListItems = next24HoursForecast.getHourlyWeatherListItems();
        adapter = new WeatherAdapter(hourlyWeatherListItems);
        weatherRecyclerView.setAdapter(adapter);
    }

    private void initWeatherResponseObject() {
        String jsonString = getArguments().getString("weatherResponseObject");
        try {
            weatherResponseObject = new JSONObject(jsonString);
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
    }


    private class WeatherHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private TextView time;
        private TextView weatherType;
        private TextView temperature;
        private TextView pressure;
        private TextView humidity;
        private TextView cloudCoverage;

        private HourlyWeatherListItem mHourlyWeatherListItem;

        public WeatherHolder(LayoutInflater inflater, ViewGroup parent) {
            super(inflater.inflate(R.layout.list_item_weather, parent, false));

            time = (TextView) itemView.findViewById(R.id.weather_time);
            weatherType = (TextView) itemView.findViewById(R.id.weather_type);
            temperature = (TextView) itemView.findViewById(R.id.weather_temperature);
            pressure = (TextView) itemView.findViewById(R.id.weather_pressure);
            humidity = (TextView) itemView.findViewById(R.id.weather_humidity);
            cloudCoverage = (TextView) itemView.findViewById(R.id.weather_cloud_coverage);

            itemView.setOnClickListener(this);

        }

        public void bind(HourlyWeatherListItem hourlyWeatherListItem) {
            mHourlyWeatherListItem = hourlyWeatherListItem;
            time.setText(mHourlyWeatherListItem.getTime());
            weatherType.setText(mHourlyWeatherListItem.getWeatherType());
            temperature.setText(mHourlyWeatherListItem.getTemperature().toString() + " °C");
            pressure.setText("Pressure: " + mHourlyWeatherListItem.getPressure().toString() + " mbar");
            humidity.setText("Humidity: " + mHourlyWeatherListItem.getHumidity().toString() + " %");
            cloudCoverage.setText("Cloud coverage: " + mHourlyWeatherListItem.getCloudCoverage().toString() + " %");


        }

        @Override
        public void onClick(View view) {
            Toast.makeText(getActivity(), "At " + mHourlyWeatherListItem.getTime() + " expect " + mHourlyWeatherListItem.getDescription(), Toast.LENGTH_SHORT).show();
        }

    }

    private class WeatherAdapter extends RecyclerView.Adapter<WeatherHolder> {

        private List<HourlyWeatherListItem> mHourlyWeatherListItems;

        public WeatherAdapter(List<HourlyWeatherListItem> hourlyWeatherListItems) {
            mHourlyWeatherListItems = hourlyWeatherListItems;
        }

        @Override
        public WeatherHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            LayoutInflater layoutInflater = LayoutInflater.from(getActivity());
            return new WeatherHolder(layoutInflater, parent);
        }


        @Override
        public void onBindViewHolder(WeatherHolder holder, int position) {
            HourlyWeatherListItem hourlyWeatherListItem = mHourlyWeatherListItems.get(position);
            holder.bind(hourlyWeatherListItem);
        }

        @Override
        public int getItemCount() {
            return mHourlyWeatherListItems.size();
        }

    }


}
