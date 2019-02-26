package ba.unsa.pmf.matematika.tkn.weatherpmf.next7Days;

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
import model.DailyWeatherListItem;
import model.Next7DaysForecast;

public class Next7DaysWeatherListFragment extends Fragment {


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

    /**
     * ubacuje nove podatke u adapter
     */
    private void updateUI() {
        Next7DaysForecast next7DaysForecast = Next7DaysForecast.get(getActivity(), weatherResponseObject);
        List<DailyWeatherListItem> dailyWeatherListItems = next7DaysForecast.getDailyWeatherListItems();
        adapter = new WeatherAdapter(dailyWeatherListItems);
        weatherRecyclerView.setAdapter(adapter);
    }

    /**
     * string to JSONObject
     */
    private void initWeatherResponseObject() {
        String jsonString = getArguments().getString("weatherResponseObject");
        try {
            weatherResponseObject = new JSONObject(jsonString);
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
    }


    private class WeatherHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        private TextView day;
        private TextView weatherType;
        private TextView temperature;
        private TextView pressure;
        private TextView humidity;
        private TextView cloudCoverage;

        private DailyWeatherListItem mDailyWeatherListItem;

        public WeatherHolder(LayoutInflater inflater, ViewGroup parent) {
            super(inflater.inflate(R.layout.list_item_weather, parent, false));

            day = (TextView) itemView.findViewById(R.id.weather_time);
            weatherType = (TextView) itemView.findViewById(R.id.weather_type);
            temperature = (TextView) itemView.findViewById(R.id.weather_temperature);
            pressure = (TextView) itemView.findViewById(R.id.weather_pressure);
            humidity = (TextView) itemView.findViewById(R.id.weather_humidity);
            cloudCoverage = (TextView) itemView.findViewById(R.id.weather_cloud_coverage);

            itemView.setOnClickListener(this);

        }

        public void bind(DailyWeatherListItem dailyWeatherListItem) {
            mDailyWeatherListItem = dailyWeatherListItem;
            day.setText(mDailyWeatherListItem.getDay());
            weatherType.setText(mDailyWeatherListItem.getWeatherType());
            temperature.setText(mDailyWeatherListItem.getTemperature().toString() + " °C");
            pressure.setText("Pressure: " + mDailyWeatherListItem.getPressure().toString() + " mbar");
            humidity.setText("Humidity: " + mDailyWeatherListItem.getHumidity().toString() + " %");
            cloudCoverage.setText("Cloud coverage: " + mDailyWeatherListItem.getCloudCoverage().toString() + " %");


        }

        @Override
        public void onClick(View view) {
            Toast.makeText(getActivity(), "On " + mDailyWeatherListItem.getDay() + " expect " + mDailyWeatherListItem.getDescription(), Toast.LENGTH_SHORT).show();
        }

    }

    private class WeatherAdapter extends RecyclerView.Adapter<WeatherHolder> {

        private List<DailyWeatherListItem> mDailyWeatherListItems;

        public WeatherAdapter(List<DailyWeatherListItem> dailyWeatherListItems) {
            mDailyWeatherListItems = dailyWeatherListItems;
        }

        @Override
        public WeatherHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            LayoutInflater layoutInflater = LayoutInflater.from(getActivity());
            return new WeatherHolder(layoutInflater, parent);
        }


        @Override
        public void onBindViewHolder(WeatherHolder holder, int position) {
            DailyWeatherListItem dailyWeatherListItem = mDailyWeatherListItems.get(position);
            holder.bind(dailyWeatherListItem);
        }

        @Override
        public int getItemCount() {
            return mDailyWeatherListItems.size();
        }

    }


}
