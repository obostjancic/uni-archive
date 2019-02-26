package model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Container class for scores
 */
public class Scores {

    private final String JDBC_DRIVER = "org.postgresql.Driver";
    private final String DB_URL = "jdbc:postgresql://localhost:5432/european_capitals";
    private final String USER = "postgres";
    private final String PASS = "root";

    private List<Score> top10Scores;

    /**
     * Default constructor
     */
    public Scores() {
        top10Scores = new ArrayList<>();
    }


    /**
     * Fills top10Scores with data read in from database
     */
    public List<Score> getTop10Scores() throws SQLException {
        top10Scores = new ArrayList<>();
        Connection connection;
        Statement stmt = null;
        String query = "select * from scores order by score desc limit 10";

        try {
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            while (rs.next()) {
                String player = rs.getString("player");
                int score = rs.getInt("score");
                top10Scores.add(new Score(player, score));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
        return top10Scores;
    }

    /**
     * Inserts a new score into database
     */
    public void submitScore(Score playerScore) throws SQLException {
        Connection connection;
        String player = playerScore.getPlayer();
        int score = playerScore.getScore();
        Statement stmt = null;
        String query = "insert into scores (player, score) values ('" + player + "', " + score + ")";

        try {
            Class.forName(JDBC_DRIVER);
            connection = DriverManager.getConnection(DB_URL, USER, PASS);
            stmt = connection.createStatement();
            stmt.executeQuery(query);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
    }

}
