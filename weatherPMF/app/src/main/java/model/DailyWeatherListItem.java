package model;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;


public class DailyWeatherListItem {

    private UUID id;
    private String day;
    private Integer temperature;
    private Integer pressure;
    private Integer humidity;
    private String weatherType;
    private String description;
    private Integer cloudCoverage;

    public DailyWeatherListItem() {
        id = UUID.randomUUID();
        this.day = null;
        this.temperature = null;
        this.pressure = null;
        this.humidity = null;
        this.weatherType = null;
        this.description = null;
        this.cloudCoverage = null;

    }

    public DailyWeatherListItem(int i, JSONObject jsonObject) {
        id = UUID.randomUUID();
        Log.d("JSON ", jsonObject.toString());
        try {
            this.day = calcualteDay(i);
            this.temperature = jsonObject.getJSONObject("temp").getInt("day");
            this.pressure = jsonObject.getInt("pressure");
            this.humidity = jsonObject.getInt("humidity");
            this.weatherType = jsonObject.getJSONArray("weather").getJSONObject(0).getString("main");
            this.description = jsonObject.getJSONArray("weather").getJSONObject(0).getString("description");
            this.cloudCoverage = jsonObject.getInt("clouds");
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
    }

    private String calcualteDay(int i) {
        SimpleDateFormat sdf = new SimpleDateFormat("EEE");
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.add(Calendar.DATE, i);
        Date ithDayDate = cal.getTime();
        String ithDay = sdf.format(ithDayDate);
        return ithDay;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public Integer getPressure() {
        return pressure;
    }

    public void setPressure(Integer pressure) {
        this.pressure = pressure;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public String getWeatherType() {
        return weatherType;
    }

    public void setWeatherType(String weatherType) {
        this.weatherType = weatherType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCloudCoverage() {
        return cloudCoverage;
    }

    public void setCloudCoverage(Integer cloudCoverage) {
        this.cloudCoverage = cloudCoverage;
    }


    @Override
    public String toString() {
        return "DailyWeatherListItem{" +
                "id=" + id +
                ", day='" + day + '\'' +
                ", temperature=" + temperature +
                ", pressure=" + pressure +
                ", humidity=" + humidity +
                ", weatherType='" + weatherType + '\'' +
                ", description='" + description + '\'' +
                ", cloudCoverage=" + cloudCoverage +
                '}';
    }
}

