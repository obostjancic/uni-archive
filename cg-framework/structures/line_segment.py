"""
    Representation od 2D oriented line segment - with helper methods
"""
from tkinter import Canvas

from structures.point import Point
from conf import CENTER
from util import orientation, determinant, sign


class LineSegment:

    """ Representation of 2D line segment. """

    def __init__(self, first: Point, second: Point, frontier=True) -> None:
        """
        Creates LineSegment object from 2 passed point objects.

        Args:
            first: First point of LineSegment
            second: Second point of LineSegment
        """
        self.first = first
        self.second = second
        self.frontier = frontier

    def draw(self, canvas: Canvas) -> None:
        """
        Draws line segment on to the canvas. Takes translation into
        consideration.

        Args:
            canvas: Canvas object on which line segment will be drawn to.
        """

        first_x = self.first.x + CENTER
        first_y = -(self.first.y - CENTER)
        second_x = self.second.x + CENTER
        second_y = -(self.second.y - CENTER)

        canvas.create_line(first_x, first_y, second_x, second_y, 
                           width=1, fill="blue")

    def __eq__(self, other: 'LineSegment'):
        """
        Determines if two line segments (self and other) are the same

        Args:
            other: Another LineSegment object

        Returns:
            bool: True if line segments are the same, False otherwise
        """

        return self.first == other.first and self.second == other.second

    def does_contain(self, point: Point) -> bool:
        """
        Determines if point "lies" in line segment (self)

        Args:
            point: Point object

        Returns:
            bool: True if point is part of self LineSegment, False otherwise
        """
        if point == self.first or point == self.second:
            return True

        det = determinant(self.first, self.second, point)

        if det != 0:
            return False

        if sign(det) > self.first.euclidean_dist_squared(self.second):
            return False

        return True

    def reversed(self) -> 'LineSegment':
        """
        Reverses direction of LineSegment (self) by switching first and
        second point.

        Returns: Reversed line segment.
        """

        return LineSegment(self.second, self.first)

    def is_equal_undirected(self, other: 'LineSegment') -> bool:
        """
        Determines if two LineSegments are the same regardless of their
        direction.

        Args:
            other: Another line segment.

        Returns: True if segments match, False otherwise.
        """

        return self == other or self == other.reversed()

    def does_intersect_or_touch(self, other: 'LineSegment') -> bool:
        """
        Determines if two line segments (self and other) intersect

        Args:
            other: Another LineSegment object

        Returns:
            bool: True if two segments intersect or match. False otherwise
        """

        if self == other:
            return True

        if self.does_contain(other.first) or self.does_contain(other.second):
            return True

        orien_1 = orientation(self.first, self.second, other.first)
        orien_2 = orientation(self.first, self.second, other.second)

        if orien_1 == orien_2:
            return False

        orien_3 = orientation(other.first, other.second, self.first)
        orien_4 = orientation(other.first, other.second, self.second)

        if orien_3 == orien_4:
            return False

        return True

    def length(self) -> float:
        #TODO doc
        return self.first.euclidean_dist_squared(self.second)

    def __str__(self) -> str:
        """
        Returns: Ordered pair representation of Line segment as string.
        """

        return "Line segment: " + str(self.first) + ", " + str(self.second)

    def __repr__(self) -> str:
        # TODO doc
        return self.__str__()

    def strict_intersect(self, other: 'LineSegment'):
        # TODO doc
        orien_1 = orientation(self.first, self.second, other.first)
        orien_2 = orientation(self.first, self.second, other.second)

        if orien_1 == orien_2:
            return False

        orien_3 = orientation(other.first, other.second, self.first)
        orien_4 = orientation(other.first, other.second, self.second)

        if orien_3 == orien_4:
            return False

        if self.does_contain(other.first) or self.does_contain(other.second):
            return False

        return True
