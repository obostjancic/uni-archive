"""
    Unit tests of Point class methods
"""
from structures.point import Point


def test_euclidean_dist_squared() -> None:
    """
        Tests if euclidean_dist_squared works correctly.
    """
    point_1 = Point(x=3, y=4)
    point_2 = Point(x=0, y=0)
    point_3 = Point(x=3, y=0)
    point_4 = Point(x=6, y=4)

    assert point_1.euclidean_dist_squared(point_1) == 0
    assert point_1.euclidean_dist_squared(point_2) == 25
    assert point_1.euclidean_dist_squared(point_3) == 16
    assert point_1.euclidean_dist_squared(point_4) == 9


def test_slope() -> None:
    """
        Tests if slope function works correctly.
    """
    point_1 = Point(x=3, y=4)
    point_2 = Point(x=0, y=0)

    assert point_1.slope(point_1) == float('inf')
    assert point_1.slope(point_2) == 4 / 3
    assert point_2.slope(point_1) == 4 / 3
