package model;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Javelin on 16.5.2017.
 */

public abstract class Weather {

    protected String weatherType;
    protected String description;
    protected Integer temperature;
    protected Integer humidity;
    protected Integer pressure;
    protected Integer cloudCovarege;
    protected Integer windDirection;
    protected Double windSpeed;
    protected String icon;


    public Weather() {
        this.weatherType = null;
        this.description = null;
        this.temperature = null;
        this.humidity = null;
        this.pressure = null;
        this.windDirection = null;
        this.cloudCovarege = null;
        this.windSpeed = null;
        this.icon = null;
    }

    public Weather(JSONObject jsonObject) {
        try {
            this.weatherType = jsonObject.getJSONArray("weather").getJSONObject(0).getString("main");
            this.description = jsonObject.getJSONArray("weather").getJSONObject(0).getString("description");
            this.temperature = jsonObject.getJSONObject("main").getInt("temp");
            this.humidity = jsonObject.getJSONObject("main").getInt("humidity");
            this.pressure = jsonObject.getJSONObject("main").getInt("pressure");
            this.windDirection = jsonObject.getJSONObject("wind").getInt("direction");
            this.windSpeed = jsonObject.getJSONObject("wind").getDouble("speed");
            this.cloudCovarege = jsonObject.getJSONObject("clouds").getInt("all");
            this.icon = jsonObject.getJSONArray("weather").getJSONObject(0).getString("icon") + ".png";
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
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

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public Integer getPressure() {
        return pressure;
    }

    public void setPressure(Integer pressure) {
        this.pressure = pressure;
    }

    public Integer getCloudCovarege() {
        return cloudCovarege;
    }

    public void setCloudCovarege(Integer cloudCovarege) {
        this.cloudCovarege = cloudCovarege;
    }

    public Integer getWindDirection() {
        return windDirection;
    }

    public void setWindDirection(Integer windDirection) {
        this.windDirection = windDirection;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    @Override
    public String toString() {
        return "Weather{" +
                "weatherType='" + weatherType + '\'' +
                ", description='" + description + '\'' +
                ", temperature=" + temperature +
                ", humidity=" + humidity +
                ", pressure=" + pressure +
                ", cloudCovarege=" + cloudCovarege +
                ", windDirection=" + windDirection +
                ", windSpeed=" + windSpeed +
                '}';
    }
}
