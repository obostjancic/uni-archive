package model;

import org.json.JSONException;
import org.json.JSONObject;


public class CurrentWeather extends Weather {

    private String location;

    public CurrentWeather() {
        super();
        this.location = null;

    }

    public CurrentWeather(JSONObject jsonObject) {
        super(jsonObject);
        try {

            this.location = jsonObject.getString("name");
        } catch (JSONException jsone) {
            jsone.printStackTrace();
        }
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "CurrentWeather{" +
                "location='" + location + '\'' +
                ", weatherType='" + weatherType + '\'' +
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
