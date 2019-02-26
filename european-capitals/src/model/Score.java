package model;

/**
 * Models one row in table scores
 */
public class Score {

    private String player;
    private int score;


    /**
     * Default constructor
     */
    public Score() {
        this.player = null;
        this.score = 0;
    }

    /**
     * All parameters constructor
     */
    public Score(String player, int score) {
        this.player = player;
        this.score = score;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}