"""
    Collection of utility functions and constants
"""
from typing import List

from structures.point import Point


def sign(number) -> int:
    """
    Corresponds to math "sgn" function.

    Args:
        number: Any number.

    Returns: Sign of a given number. -1 if number is negative, 1 if it is
             positive and 0 if it is 0.

    """
    if number > 0:
        return 1
    elif number < 0:
        return -1
    else:
        return 0


def determinant(first: Point, second: Point, third: Point) -> float:
    """
    Calculates the determinant of 3 points (cross product of 2 vector sides)

    Returns:
        Determinant of 3 points.
    """
    return (second.x - first.x) * (third.y - second.y) - \
           (third.x - second.x) * (second.y - first.y)


def orientation(first: Point, second: Point, third: Point) -> int:
    """
    Determines orientation of 3 points (self)

    Returns:
        -1 for CW, 1 for CCW and 0 for collinear
    """
    return sign(determinant(first, second, third))


def neighbors(first: Point, second: Point, points: List[Point]) -> bool:
    """
    Determines if 2 points are next to each other in polygon.

    Args:
        first: First point.
        second: Second point.
        points: List of points in polygon.

    Returns:
        True if points are next to each other, False otherwise.
    """
    if first == second:
        return True

    first_index, second_index = points.index(first), points.index(second)

    if first_index == second_index + 1 or first_index == second_index - 1:
        return True

    if first_index == 0 and second_index == len(points) - 1:
        return True

    if second_index == 0 and first_index == len(points) - 1:
        return True

    return False
