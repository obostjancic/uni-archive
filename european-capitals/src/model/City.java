package model;

import util.Coordinates;

import java.sql.*;

/**
 * Models one row in table cities
 */
public class City {

    private final String JDBC_DRIVER = "org.postgresql.Driver";
    private final String DB_URL = "jdbc:postgresql://localhost:5432/european_capitals";
    private final String USER = "postgres";
    private final String PASS = "root";

    private String name;
    private String country;
    private Coordinates coordinates;


    /**
     * Default constructor
     */
    public City() {
        this.name = null;
        this.country = null;
        this.coordinates = null;
    }

    /**
     * Database constructor - reads data form DB and instantiates an object
     */
    public City(Integer id) throws SQLException {

        Connection connection;
        Statement stmt = null;
        String query = "select * from cities where id =" + id;

        try {
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                name = rs.getString("name");
                country = rs.getString("country");
                int x = rs.getInt("x");
                int y = rs.getInt("y");
                coordinates = new Coordinates(x, y);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }

    /**
     * All parameters constructor
     */
    public City(String name, String country, Coordinates coordinates) {
        this.name = name;
        this.country = country;
        this.coordinates = coordinates;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinates coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        return name + " " + country + " " + coordinates.toString();
    }
}

