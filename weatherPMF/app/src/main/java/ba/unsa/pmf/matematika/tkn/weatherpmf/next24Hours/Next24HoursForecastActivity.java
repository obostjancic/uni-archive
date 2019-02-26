package ba.unsa.pmf.matematika.tkn.weatherpmf.next24Hours;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import org.json.JSONObject;

import ba.unsa.pmf.matematika.tkn.weatherpmf.R;
import ba.unsa.pmf.matematika.tkn.weatherpmf.current.MainActivity;
import ba.unsa.pmf.matematika.tkn.weatherpmf.next7Days.Next7DaysForecastActivity;

public class Next24HoursForecastActivity extends AppCompatActivity {

    private Button next7DaysButton;
    private Button currentButton;
    private JSONObject weatherResponseObject;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_next_24_hours);

        next7DaysButton = (Button) findViewById(R.id.next_24_activity_next_7_button);
        currentButton = (Button) findViewById(R.id.next_24_activity_current_button);

        FragmentManager fm = getSupportFragmentManager();
        Fragment fragment = fm.findFragmentById(R.id.fragment_container);
        if (fragment == null) {
            fragment = createFragment();
            fm.beginTransaction().add(R.id.fragment_container, fragment).commit();
        }


        next7DaysButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Next24HoursForecastActivity.this, Next7DaysForecastActivity.class);
                startActivity(intent);
                finish();
            }
        });

        currentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Next24HoursForecastActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });

    }

    protected Fragment createFragment() {
        SharedPreferences currentWeatherData = getSharedPreferences("next24WeatherData", MODE_PRIVATE);
        String json = currentWeatherData.getString("next24JSON", "{}");
        Bundle bundle = new Bundle();
        bundle.putString("weatherResponseObject", json);
        Next24HoursWeatherListFragment next24HoursWeatherListFragment = new Next24HoursWeatherListFragment();
        next24HoursWeatherListFragment.setArguments(bundle);
        return next24HoursWeatherListFragment;
    }

}
