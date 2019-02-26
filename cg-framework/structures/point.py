"""
    Representation of 2D point
"""

from collections import namedtuple
from tkinter import Canvas
from conf import CENTER


class Point(namedtuple('Point', ['x', 'y'])):

    """ Representation of 2D point. """

    def draw(self, canvas: Canvas) -> None:
        """
        Draws point on to the canvas. Takes translation into consideration.

        Args:
            canvas: Canvas object on which line segment will be drawn to.
        """
        x = self.x + CENTER
        y = -(self.y - CENTER)

        canvas.create_oval(x - 2, y - 2, x + 2, y + 2, width=0, fill="red")

    def euclidean_dist_squared(self, other: 'Point') -> float:
        """
        Calculates euclidean distance between two points (self and other)

        Args:
            other: Point object

        Returns:
            Squared value of euclidean distance
        """
        xs = (self.x - other.x) * (self.x - other.x)
        ys = (self.y - other.y) * (self.y - other.y)

        return xs + ys

    def __eq__(self, other: 'Point') -> bool:
        """
        Determines if two points (self and other) are equal.

        Args:
            other: Point object to be tested for equality with self.

        Returns:
            True if points are the same. False otherwise.
        """

        return self.x == other.x and self.y == other.y

    def slope(self, other: 'Point') -> float:
        """
        Calculates slope between two points (self and other)

        Args:
            other: Point object

        Returns:
            slope between two points
        """

        if self.x != other.x:
            return 1.0 * (self.y - other.y) / (self.x - other.x)

        else:
            return float('inf')

    def __str__(self) -> str:
        """
        Returns: Ordered pair representation of point as string.
        """

        return "(" + str(self.x) + ", " + str(self.y) + ")"
