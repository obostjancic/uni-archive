"""
    Unit tests of Triangle class methods
"""

from structures.triangle import Triangle
from structures.point import Point


def test_eq() -> None:
    """
        Tests if overridden method __eq__ works correctly
    """
    point_1 = Point(x=1, y=2)
    point_2 = Point(x=2, y=-4)
    point_3 = Point(x=3, y=6)

    triangle_1 = Triangle(first=point_1, second=point_2, third=point_3)
    triangle_2 = Triangle(first=point_1, second=point_2, third=point_3)
    triangle_3 = Triangle(first=point_3, second=point_1, third=point_2)

    assert triangle_1 == triangle_2
    assert not triangle_1 == triangle_3


def test_area() -> None:
    """
        Tests if area method works correctly. One common and one edge case
    """
    point_1 = Point(x=3, y=4)
    point_2 = Point(x=3, y=0)
    point_3 = Point(x=0, y=0)

    assert Triangle(first=point_1, second=point_1, third=point_1).area() == 0
    assert Triangle(first=point_1, second=point_2, third=point_3).area() == 6


def test_does_contain() -> None:
    """
        Tests if does contain method works correctly. Two common and one edge 
        case
    """
    point_1 = Point(x=3, y=4)
    point_2 = Point(x=3, y=0)
    point_3 = Point(x=0, y=0)

    point_in = Point(x=2, y=2)
    point_out = Point(x=0, y=5)
    point_edge = Point(x=2, y=0)

    triangle = Triangle(first=point_1, second=point_2, third=point_3)

    assert triangle.does_contain(point_in)
    assert not triangle.does_contain(point_out)
    assert triangle.does_contain(point_edge)


def test_is_empty() -> None:
    """
    Tests if is_empty method works correctly.
    """
    point_1 = Point(1, 2)
    point_2 = Point(2, -4)
    point_3 = Point(3, 6)

    triangle = Triangle(first=point_1, second=point_2, third=point_3)
    points_out = [Point(0, 0), Point(2, 5), Point(7, 9),
                  Point(3, 8), Point(4, 4), Point(0, 5)]
    points_in = [Point(2, 2), Point(2, 4), Point(0, 0),
                 Point(2, 7), Point(6, 3), Point(-5, 5)]

    assert triangle.is_empty(points_out)
    assert not triangle.is_empty(points_in)
