"""
    Representation of 2D triangle - with helper methods
"""

from typing import List

from structures.line_segment import LineSegment
from structures.point import Point
from math import fabs

from util import determinant


class Triangle:

    def __init__(self, first: Point, second: Point, third: Point) -> None:
        """
        Creates Triangle object from three passed point objects.

        Args:
            first: point object.
            second: point object.
            third: point object.

        """
        self.first = first
        self.second = second
        self.third = third

    def __eq__(self, other: 'Triangle') -> bool:
        """
        Determines if two triangles (self, other) are the same.
        Args:
            other: Other triangle object
        Returns:
            True if triangles are the same, False otherwise
        """
        return (self.first == other.first and
                self.second == other.second and
                self.third == other.third)

    def draw(self, canvas):
        # TODO doc
        segments = self.get_sides()
        for segment in segments:
            segment.draw(canvas)

    def area(self):
        """
        Calculates area of a triangle (self)
        Returns:
            Area of the triangle (self)
        """
        return fabs(determinant(self.first, self.second, self.third))/2.0

    def does_contain(self, point: Point, strict: bool = False) -> bool:
        """
        Determines if point is inside the triangle (self)
        Args:
            point: Point object to be tested
        Returns:
            True if point is inside the triangle (self), False otherwise
        """
        t1_area = Triangle(point, self.first, self.second).area()
        t2_area = Triangle(point, self.second, self.third).area()
        t3_area = Triangle(point, self.first, self.third).area()
        area_sum = t1_area + t2_area + t3_area
        if not strict:
            return area_sum == self.area()
        return area_sum == self.area() and t1_area != 0 and t2_area != 0 and \
               t3_area != 0

    def is_empty(self, points: List[Point], strict: bool = False) -> bool:
        """
        For a given list of points, checks if any of them are in triangle (self)

        Args:
            points: List of point objects to be tested

        Returns:
            True if none of the points are inside the triangle, False otherwise
        """
        for point in points:
            if self.does_contain(point, strict):
                return False
        return True

    def get_sides(self) -> List[LineSegment]:
        """
        Gets segments of self as a list of three elements.

        Returns: List of three LineSegments.
        """
        return [LineSegment(self.first, self.second),
                LineSegment(self.second, self.third),
                LineSegment(self.third, self.first)]

    def get_points(self) -> List[Point]:
        """
        Gets points of self as a list with three elements.

        Returns: List of three points.
        """
        return [self.first, self.second, self.third]

    def __str__(self) -> str:
        """
        Returns: String representation of a triangle as 3 points
        """
        return "Triangle {}, {}, {}".format(self.first, self.second, self.third)

    def __repr__(self) -> str:
        """
        Returns: String representation of a triangle as 3 points.
        """
        return str(self)
