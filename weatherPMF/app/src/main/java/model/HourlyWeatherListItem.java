package model;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.UUID;


public class HourlyWeatherListItem {

    private UUID id;
    private String time;
    private Integer temperature;
    private Integer pressure;
    private Integer humidity;
    private String weatherType;
    private String description;
    private Integer cloudCoverage;
    private Double windSpeed;
    private Double windDeg;

    public HourlyWeatherListItem() {
        id = UUID.randomUUID();
        this.time = null;
        this.temperature = null;
        this.pressure = null;
        this.humidity = null;
        this.weatherType = null;
        this.description = null;
        this.cloudCoverage = null;
        this.windSpeed = null;
        this.windDeg = null;
    }

    public HourlyWeatherListItem(JSONObject jsonObject) {
        id = UUID.randomUUID();
        Log.d("JSON ", jsonObject.toString());
        try {
            this.time = jsonObject.getString("dt_txt");
            this.time = this.time.substring(10, 16);
            this.temperature = jsonObject.getJSONObject("main").getInt("temp");
            this.pressure = jsonObject.getJSONObject("main").getInt("pressure");
            this.humidity = jsonObject.getJSONObject("main").getInt("humidity");
            this.weatherType = jsonObject.getJSONArray("weather").getJSONObject(0).getString("main");
            this.description = jsonObject.getJSONArray("weather").getJSONObject(0).getString("description");
            this.cloudCoverage = jsonObject.getJSONObject("clouds").getInt("all");
            this.windSpeed = jsonObject.getJSONObject("wind").getDouble("speed");
            this.windDeg = jsonObject.getJSONObject("wind").getDouble("deg");
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
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

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public Double getWindDeg() {
        return windDeg;
    }

    public void setWindDeg(Double windDeg) {
        this.windDeg = windDeg;
    }

    @Override
    public String toString() {
        return "HourlyWeatherListItem{" +
                "id=" + id +
                ", temperature=" + temperature +
                ", pressure=" + pressure +
                ", humidity=" + humidity +
                ", weatherType='" + weatherType + '\'' +
                ", description='" + description + '\'' +
                ", cloudCoverage=" + cloudCoverage +
                ", windSpeed=" + windSpeed +
                ", windDeg=" + windDeg +
                '}';
    }
}

