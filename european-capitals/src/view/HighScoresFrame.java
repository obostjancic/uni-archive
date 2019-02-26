package view;


import controller.GameFlow;

import javax.swing.*;
import java.awt.*;

/**
 * Window with list of top 10 socres that appears after the user sumbits his score.
 */
public class HighScoresFrame extends JFrame {

    public HighScoresFrame(String title) {
        super(title);
        setLayout(new BorderLayout());

        JLabel highScores = new JLabel();
        setPreferredSize(new Dimension(215, 450));
        highScores.setPreferredSize(new Dimension(215, 450));
        highScores.setText(GameFlow.getTop10Scores());
        highScores.setFont(new Font("Consolas", 1, 15));
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        add(highScores, BorderLayout.CENTER);
        setVisible(true);
        pack();
    }
}
