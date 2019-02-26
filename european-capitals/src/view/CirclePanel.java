package view;

import javax.swing.*;
import java.awt.*;

/**
 * Utility class - used for drawing circles on user button click
 */
public class CirclePanel extends JPanel {

    private Color color;

    public void setColor(Color c) {
        color = c;
    }

    @Override
    protected void paintComponent(Graphics g) {
        g.setColor(color);
        g.fillOval(0, 0, g.getClipBounds().width, g.getClipBounds().height);
    }
}
