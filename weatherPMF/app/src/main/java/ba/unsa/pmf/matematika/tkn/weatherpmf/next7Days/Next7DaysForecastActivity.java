package ba.unsa.pmf.matematika.tkn.weatherpmf.next7Days;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import ba.unsa.pmf.matematika.tkn.weatherpmf.R;
import ba.unsa.pmf.matematika.tkn.weatherpmf.current.MainActivity;
import ba.unsa.pmf.matematika.tkn.weatherpmf.next24Hours.Next24HoursForecastActivity;

public class Next7DaysForecastActivity extends AppCompatActivity {

    private Button next24HoursButton;
    private Button currentButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_next_7_days);

        next24HoursButton = (Button) findViewById(R.id.next_7_activity_next_24_button);
        currentButton = (Button) findViewById(R.id.next_7_activity_current_button);

        FragmentManager fm = getSupportFragmentManager();
        Fragment fragment = fm.findFragmentById(R.id.fragment_container);
        if (fragment == null) {
            fragment = createFragment();
            fm.beginTransaction().add(R.id.fragment_container, fragment).commit();
        }


        next24HoursButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Next7DaysForecastActivity.this, Next24HoursForecastActivity.class);
                startActivity(intent);
                finish();
            }
        });

        currentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Next7DaysForecastActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });

    }

    protected Fragment createFragment() {
        SharedPreferences currentWeatherData = getSharedPreferences("next7WeatherData", MODE_PRIVATE);
        String json = currentWeatherData.getString("next7JSON", "{}");
        Bundle bundle = new Bundle();
        bundle.putString("weatherResponseObject", json);
        Next7DaysWeatherListFragment next7DaysWeatherListFragment = new Next7DaysWeatherListFragment();
        next7DaysWeatherListFragment.setArguments(bundle);
        return next7DaysWeatherListFragment;
    }

}

