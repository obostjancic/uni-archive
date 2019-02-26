package view;

import controller.GameFlow;
import util.Coordinates;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Main GUI window
 */
public class GameFrame extends JFrame {

    private JLayeredPane lpane = new JLayeredPane();
    private JPanel sideBar = new JPanel();
    private JPanel panelMap = new JPanel();
    private CirclePanel panelPin = new CirclePanel();
    private JLabel currentCity = new JLabel();
    private JLabel currentScore = new JLabel();
    private BufferedImage europeMap;

    /**
     * Constructor
     */
    public GameFrame(String title) {
        super(title);
        setPreferredSize(new Dimension(1000, 725));
        setLayout(new BorderLayout());
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        readMapFile();
        setPanelsProperities();
        setLpaneProperities();
        setSideBarProperities();
        showCurrentCity();
        showCurrentScore();
        add(lpane, BorderLayout.CENTER);
        add(sideBar, BorderLayout.EAST);
        pack();
        setVisible(true);
        panelMap.addMouseListener(new MouseListener() {
            @Override
            public void mousePressed(MouseEvent e) {
                CirclePanel red = new CirclePanel();
                setRedPinProperities(red);
                lpane.add(red, new Integer(1), 0);
                panelPin.setBounds(e.getX() - 5, e.getY() - 15, 10, 10);
                lpane.add(panelPin, new Integer(2), 0);
                if (!GameFlow.playerMove(new Coordinates(e.getX() - 8, e.getY() - 20))) {
                    setVisible(false);
                    dispose();
                    new GameOverDialog(new JFrame(), "Game over!", "The game is over! Do you want to submit your score?");
                }
                showCurrentCity();
                showCurrentScore();
            }

            @Override
            public void mouseReleased(MouseEvent e) {

            }

            @Override
            public void mouseEntered(MouseEvent e) {

            }

            @Override
            public void mouseExited(MouseEvent e) {

            }

            @Override
            public void mouseClicked(MouseEvent e) {

            }
        });
    }

    /**
     * Sets the properites of the red circle that appears on the map
     */
    private void setRedPinProperities(CirclePanel red) {
        red.setBounds(GameFlow.getCurrentCityCoordinates().getX() - 5, GameFlow.getCurrentCityCoordinates().getY() - 10, 10, 10);
        red.setColor(Color.RED);
        red.setOpaque(true);
    }

    /**
     * Reads in the picture of map of Europe
     */
    private void readMapFile() {

        try {
            europeMap = ImageIO.read(new File("C:/Users/Javelin/Desktop/european-capitals/out/production/european-capitals/view/europe-map-800-700.jpg"));


        } catch (IOException ioe) {
            System.out.println("Unable to fetch image.");
            ioe.printStackTrace();
        }
    }

    /**
     * Sets the properities of layered plane that holds different planes (map plane, pin plane)
     */
    private void setLpaneProperities() {
        lpane.setBounds(0, 0, 800, 700);
        lpane.setLocation(0, 0);
        lpane.add(panelMap, new Integer(0), 0);
    }

    /**
     * Sets the properities of mapl plane and the pin plane
     */
    private void setPanelsProperities() {
        JLabel picLabel = new JLabel(new ImageIcon(europeMap));
        panelMap.add(picLabel);
        panelMap.setBounds(0, -10, 800, 700);
        panelMap.setOpaque(true);
        panelPin.setOpaque(true);
        panelPin.setColor(Color.GREEN);
    }

    /**
     * Sets the properities of side bar that holds curent city and current user score
     */
    private void setSideBarProperities() {
        sideBar.setPreferredSize(new Dimension(200, 700));
        sideBar.setLayout(new BoxLayout(sideBar, BoxLayout.Y_AXIS));
        sideBar.add(currentCity);
        sideBar.add(currentScore);
        sideBar.setOpaque(true);
        sideBar.setVisible(true);
    }

    private void showCurrentCity() {
        currentCity.setText(GameFlow.getCurrentCityName());
        currentCity.setHorizontalAlignment(SwingConstants.CENTER);
        currentCity.setFont(new Font("Consolas", 1, 15));
    }

    private void showCurrentScore() {
        currentScore.setText(GameFlow.getScoreAsString());
        currentScore.setHorizontalAlignment(SwingConstants.CENTER);
        currentScore.setFont(new Font("Consolas", 1, 15));
    }
}
