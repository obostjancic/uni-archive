package model;

import android.content.Context;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class Next24HoursForecast {

    private static final int ITEMS_IN_24_HOURS = 9;
    private static Next24HoursForecast sNext24HoursForecast;
    private List<HourlyWeatherListItem> mHourlyWeatherListItems;

    public Next24HoursForecast() {
        this.mHourlyWeatherListItems = null;
    }

    private Next24HoursForecast(Context context) {
        this.mHourlyWeatherListItems = new ArrayList<>();
        for (int i = 0; i < ITEMS_IN_24_HOURS; i++) {
            mHourlyWeatherListItems.add(new HourlyWeatherListItem());
        }
    }

    private Next24HoursForecast(Context context, JSONObject jsonObject) {
        try {
            this.mHourlyWeatherListItems = new ArrayList<>();
            for (int i = 0; i < ITEMS_IN_24_HOURS; i++) {
                HourlyWeatherListItem wli = new HourlyWeatherListItem(jsonObject.getJSONArray("list").getJSONObject(i));
                Log.d("Weather list item", wli.toString());
                mHourlyWeatherListItems.add(wli);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static Next24HoursForecast get(Context context, JSONObject jsonObject) {
        if (sNext24HoursForecast == null) {
            sNext24HoursForecast = new Next24HoursForecast(context, jsonObject);
        }
        return sNext24HoursForecast;
    }

    public static Next24HoursForecast get(Context context) {
        if (sNext24HoursForecast == null) {
            sNext24HoursForecast = new Next24HoursForecast(context);
        }
        return sNext24HoursForecast;
    }

    public List<HourlyWeatherListItem> getHourlyWeatherListItems() {
        return mHourlyWeatherListItems;
    }

    public HourlyWeatherListItem getWeatherListItem(UUID id) {
        for (HourlyWeatherListItem wli : mHourlyWeatherListItems) {
            if (wli.getId().equals(id)) {
                return wli;
            }
        }
        return null;
    }

}
