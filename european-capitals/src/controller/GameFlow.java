package controller;

import model.City;
import model.Score;
import model.Scores;
import util.Coordinates;
import view.GameFrame;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Controller class - Main bussiness logic (abstract)
 */
public abstract class GameFlow {

    public static final int GAME_LENGTH = 15;
    public static final int CITIES_COUNT = 43;

    private static int score;
    private static int currentCityIndex;
    private static List<City> cities;

    /**
     * Initializes score to 0 and generates array of cities
     */
    public static void startGame() {
        score = 0;
        currentCityIndex = 0;
        cities = new ArrayList<>();
        List<Integer> randomIds = generateRandomIds();

        for (int i = 0; i < GAME_LENGTH; i++) {
            try {
                cities.add(new City(randomIds.get(i)));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        new GameFrame("European capitals");
    }


    /**
     * Accepts coordinates of player button click and determines if the game is over or not. Calls calculateDistance
     */
    public static boolean playerMove(Coordinates coordinates) {
        calculateDistance(coordinates, cities.get(currentCityIndex).getCoordinates());
        if (currentCityIndex < GAME_LENGTH - 1) {
            currentCityIndex++;
            return true;
        } else {
            gameOver();
            return false;
        }
    }

    public static Coordinates getCurrentCityCoordinates() {
        return cities.get(currentCityIndex).getCoordinates();
    }

    /**
     * Accepts user input and calls submitScore method implemented in Scores
     */
    public static void submitScore(Score playerScore) {
        Scores scores = new Scores();
        try {
            scores.submitScore(playerScore);
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

    public static String getCurrentCityName() {
        return "<html><br />" + cities.get(currentCityIndex).getName() + "<br />(" + cities.get(currentCityIndex).getCountry() + ")<br /><br /></html>";
    }

    private static void gameOver() {
        System.out.println("GAME OVER");
        System.out.println("Score: " + score);
    }

    public static int getScore() {
        return score;
    }

    public static String getScoreAsString() {
        return "<html><br />Score: " + score + "<br /><br /></html>";
    }


    public static void endGame() {
        System.exit(0);
    }

    /**
     * Calculates distance from user button click to actual city coordinates. Updates score accordingly
     */
    private static void calculateDistance(Coordinates playerCoordinates, Coordinates cityCoordinates) {
        double tempX = playerCoordinates.getX() - cityCoordinates.getX();
        double tempY = playerCoordinates.getY() - cityCoordinates.getY();
        double distanceInpixels = Math.sqrt((tempX * tempX) + (tempY * tempY));
        double distanceInKm = distanceInpixels * 5.4;
        score += 1000 - distanceInKm;
    }

    /**
     * Returns a list of random integers, used to select random cities from database
     */
    private static List<Integer> generateRandomIds() {
        List<Integer> resultList = new ArrayList<>();
        while (resultList.size() < GAME_LENGTH) {
            Integer randomInteger = new Integer((int) (Math.random() * CITIES_COUNT + 1));
            if (isNotInList(resultList, randomInteger)) {
                resultList.add(randomInteger);
            }
        }
        return resultList;
    }

    /**
     * Parses a list of scores into String
     */
    public static String getTop10Scores() {
        String result = "";
        Scores scores = new Scores();

        try {
            List<Score> highScores = scores.getTop10Scores();
            result = "<html> Top 10 scores:<br /><br />";
            for (int i = 0; i < highScores.size(); i++) {
                String playerName = highScores.get(i).getPlayer();
                String spacerDots = "";
                for (int j = 0; j < 10 - playerName.length(); j++)
                    spacerDots += ".";
                result += (i + 1) + ". " + playerName + " " + spacerDots + " " + highScores.get(i).getScore() + "<br /><br />";
            }
            result += "</html>";
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
        return result;
    }

    /**
     * Helper
     */
    private static boolean isNotInList(List<Integer> resultList, Integer randomInteger) {
        for (int i = 0; i < resultList.size(); i++) {
            if (randomInteger.equals(resultList.get(i))) {
                return false;
            }
        }
        return true;
    }


}
