package ba.unsa.pmf.matematika.tkn.weatherpmf.current;

import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import ba.unsa.pmf.matematika.tkn.weatherpmf.R;
import ba.unsa.pmf.matematika.tkn.weatherpmf.next24Hours.Next24HoursForecastActivity;
import ba.unsa.pmf.matematika.tkn.weatherpmf.next7Days.Next7DaysForecastActivity;
import model.CurrentWeather;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private TextView cityName;
    private TextView currentTemperature;
    private TextView currentDate;
    private TextView currentPressure;
    private TextView currentHumidity;
    private TextView currentWeatherType;
    private TextView lastUpdate;

    private Button next7Button;
    private Button next24Button;

    private double lat;
    private double lon;

    private String currentUrl = "http://api.openweathermap.org/data/2.5/weather?q=Sarajevo&units=metric&APPID=515aa887de98a42b67e5a657566b965a";
    private String next24Url = "http://api.openweathermap.org/data/2.5/forecast?q=Sarajevo&units=metric&APPID=515aa887de98a42b67e5a657566b965a";
    private String next7Url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Sarajevo&units=metric&APPID=515aa887de98a42b67e5a657566b965a";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeTextViews();
        initializeButtons();

        restoreWeatherData();
        //formatiramo trenutni datum
        DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        Date date = new Date();
        currentDate.setText(dateFormat.format(date));

        next7Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Next7DaysForecastActivity.class);
                startActivity(intent);
                finish();
            }
        });

        next24Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, Next24HoursForecastActivity.class);
                startActivity(intent);
                finish();
            }
        });

        try {
            run();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void initializeTextViews() {
        cityName = (TextView) findViewById(R.id.city_name);
        currentTemperature = (TextView) findViewById(R.id.current_temperature);
        currentDate = (TextView) findViewById(R.id.current_date);
        currentPressure = (TextView) findViewById(R.id.current_pressure);
        currentHumidity = (TextView) findViewById(R.id.current_humidity);
        currentWeatherType = (TextView) findViewById(R.id.current_weather_type);
        lastUpdate = (TextView) findViewById(R.id.last_update);
    }

    private void initializeButtons() {
        next7Button = (Button) findViewById(R.id.main_activity_7_days_button);
        next24Button = (Button) findViewById(R.id.main_activity_24_hours_button);
    }

    /**
     * dobavljamo podatke iz shared preferences
     */
    private void restoreWeatherData() {
        SharedPreferences currentWeatherData = getPreferences(MODE_PRIVATE);

        cityName.setText(currentWeatherData.getString("cityName", "Sarajevo"));
        currentTemperature.setText(currentWeatherData.getString("currentTemperature", "18") + " °C");
        currentPressure.setText(currentWeatherData.getString("currentPressure", "998") + " mbar");
        currentHumidity.setText(currentWeatherData.getString("currentHumidity", "75") + " %");
        currentWeatherType.setText(currentWeatherData.getString("currentWeatherType", "Clouds"));
        lastUpdate.setText("Last update: " + currentWeatherData.getString("lastUpdate", "00:00"));

    }

    /**
     * nit koja dobavlja podatke sa REST API-a i sprema u view-ove
     * @throws IOException
     */
    void run() throws IOException {

        OkHttpClient client = new OkHttpClient();
        getLocation();
        Request requestCurrentWeather = new Request.Builder().url(currentUrl).build();
        Request requestNext24Weather = new Request.Builder().url(next24Url).build();
        Request requestNext7Weather = new Request.Builder().url(next7Url).build();

        client.newCall(requestCurrentWeather).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String responseBody = response.body().string();
                try {

                    JSONObject jObject = new JSONObject(responseBody);
                    final CurrentWeather currentWeather = new CurrentWeather(jObject);

                    MainActivity.this.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            DateFormat timeFormat = new SimpleDateFormat("HH:mm");

                            cityName.setText(currentWeather.getLocation());
                            currentTemperature.setText(currentWeather.getTemperature().toString() + " °C");
                            currentPressure.setText(currentWeather.getPressure() + " mbar");
                            currentHumidity.setText(currentWeather.getHumidity() + " %");
                            currentWeatherType.setText(currentWeather.getWeatherType());
                            lastUpdate.setText("Last update: " + timeFormat.format(new Date()));

                            SharedPreferences currentWeatherData = getPreferences(MODE_PRIVATE);
                            SharedPreferences.Editor editor = currentWeatherData.edit();
                            editor.putString("cityName", currentWeather.getLocation());
                            editor.putString("currentTemperature", currentWeather.getTemperature().toString());
                            editor.putString("currentPressure", currentWeather.getPressure().toString());
                            editor.putString("currentHumidity", currentWeather.getHumidity().toString());
                            editor.putString("currentWeatherType", currentWeather.getWeatherType());
                            editor.putString("lastUpdate", timeFormat.format(new Date()));

                            editor.commit();
                        }
                    });
                } catch (JSONException jsone) {
                    jsone.printStackTrace();
                }
            }
        });

        client.newCall(requestNext24Weather).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String responseBody = response.body().string();
                try {
                    JSONObject jObject = new JSONObject(responseBody);
                    final String next24HoursWeatherDataString = jObject.toString();
                    MainActivity.this.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            SharedPreferences next24WeatherData = getSharedPreferences("next24WeatherData", MODE_PRIVATE);
                            SharedPreferences.Editor editor = next24WeatherData.edit();
                            editor.putString("next24JSON", next24HoursWeatherDataString);
                            editor.commit();
                        }
                    });
                } catch (JSONException jsone) {
                    jsone.printStackTrace();
                }
            }
        });

        client.newCall(requestNext7Weather).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String responseBody = response.body().string();
                try {
                    JSONObject jObject = new JSONObject(responseBody);
                    final String next7HoursWeatherDataString = jObject.toString();
                    MainActivity.this.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            SharedPreferences next7WeatherData = getSharedPreferences("next7WeatherData", MODE_PRIVATE);
                            SharedPreferences.Editor editor = next7WeatherData.edit();
                            editor.putString("next7JSON", next7HoursWeatherDataString);
                            editor.commit();
                        }
                    });
                } catch (JSONException jsone) {
                    jsone.printStackTrace();
                }
            }
        });
    }

    /**
     * dobavljamo lokaciju i spremamo u query URL
     */
    public void getLocation() {
        // Get the location manager
        LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        Criteria criteria = new Criteria();
        String bestProvider = locationManager.getBestProvider(criteria, false);
        try {
            Location location = locationManager.getLastKnownLocation(bestProvider);

            try {
                lat = location.getLatitude();
                lon = location.getLongitude();

                currentUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=515aa887de98a42b67e5a657566b965a";
                next24Url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=515aa887de98a42b67e5a657566b965a";
                next7Url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=515aa887de98a42b67e5a657566b965a";

            } catch (NullPointerException e) {
                e.printStackTrace();
            }
        } catch (SecurityException se) {
            se.printStackTrace();
        }
    }
}

