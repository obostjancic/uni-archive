package view;

import controller.GameFlow;
import model.Score;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Dialog that appears after the game is over. Accepts player name as input
 */
public class GameOverDialog extends JDialog {

    private static final long serialVersionUID = 1L;
    private String playerName;

    /**
     * Constructor
     */
    public GameOverDialog(JFrame parent, String title, String message) {
        super(parent, title);
        setLocationRelativeTo(null);
        JPanel messagePane = new JPanel();
        messagePane.add(new JLabel(message));
        getContentPane().add(messagePane);
        JPanel buttonPane = new JPanel();
        JButton exitButton = new JButton("Exit!");
        JButton submitButton = new JButton("Submit");
        buttonPane.add(submitButton);
        buttonPane.add(exitButton);
        exitButton.addActionListener(new ExitActionListener());
        submitButton.addActionListener(new SubmitActionListener());
        getContentPane().add(buttonPane, BorderLayout.PAGE_END);
        setDefaultCloseOperation(DISPOSE_ON_CLOSE);
        pack();
        setVisible(true);
    }

    /**
     * Inner class with method that is called when user clicks on exit button
     */
    class ExitActionListener implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            setVisible(false);
            dispose();
            GameFlow.endGame();
        }
    }

    /**
     * Inner class with method that is called when user clicks on submit button
     */
    class SubmitActionListener implements ActionListener {

        public void actionPerformed(ActionEvent e) {
            playerName = JOptionPane.showInputDialog("Enter your name");
            if (playerName != null) {
                GameFlow.submitScore(new Score(playerName, GameFlow.getScore()));
                setVisible(false);
                dispose();
                new HighScoresFrame("High scores");
            } else {
                setVisible(false);
                dispose();
                GameFlow.endGame();
            }
        }
    }
}
