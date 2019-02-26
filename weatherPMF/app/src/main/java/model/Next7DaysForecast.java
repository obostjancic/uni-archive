package model;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Next7DaysForecast {

    private static final int DAYS_IN_A_WEEK = 7;
    private static Next7DaysForecast sNext7DaysForecast;
    private List<DailyWeatherListItem> mDailyWeatherListItems;

    public Next7DaysForecast() {
        this.mDailyWeatherListItems = null;
    }

    private Next7DaysForecast(Context context) {
        this.mDailyWeatherListItems = new ArrayList<>();
        for (int i = 0; i < DAYS_IN_A_WEEK; i++) {
            mDailyWeatherListItems.add(new DailyWeatherListItem());
        }
    }

    private Next7DaysForecast(Context context, JSONObject jsonObject) {
        try {
            this.mDailyWeatherListItems = new ArrayList<>();
            for (int i = 0; i < DAYS_IN_A_WEEK; i++) {
                mDailyWeatherListItems.add(new DailyWeatherListItem(i, jsonObject.getJSONArray("list").getJSONObject(i)));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static Next7DaysForecast get(Context context, JSONObject jsonObject) {
        if (sNext7DaysForecast == null) {
            sNext7DaysForecast = new Next7DaysForecast(context, jsonObject);
        }
        return sNext7DaysForecast;
    }

    public static Next7DaysForecast get(Context context) {
        if (sNext7DaysForecast == null) {
            sNext7DaysForecast = new Next7DaysForecast(context);
        }
        return sNext7DaysForecast;
    }

    public DailyWeatherListItem getDailyWeatherListItem(UUID id) {
        for (DailyWeatherListItem wli : mDailyWeatherListItems) {
            if (wli.getId().equals(id)) {
                return wli;
            }
        }
        return null;
    }

    public List<DailyWeatherListItem> getDailyWeatherListItems() {
        return mDailyWeatherListItems;
    }

    public void setDailyWeatherListItems(List<DailyWeatherListItem> dailyWeatherListItems) {
        mDailyWeatherListItems = dailyWeatherListItems;
    }
}