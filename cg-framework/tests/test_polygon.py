"""
    Unit tests of Polygon class methods
"""
from structures.line_segment import LineSegment
from structures.point import Point
from structures.polygon import Polygon


def test_orientation() -> None:
    """
        Tests if Polygon class method orientation works correctly.
    """
    polygon_1 = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                         Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    polygon_2 = Polygon([Point(1, 1), Point(2, 3), Point(2, 5), Point(5, 3),
                         Point(4, 8), Point(5, 6), Point(4, 1), Point(3, 4)])

    assert polygon_1.orientation() == 1
    assert polygon_2.orientation() == -1


def test_make_simple() -> None:
    """
        Tests if Polygon class method make_simple works correctly.
    """
    polygon_1 = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                         Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    simple = Polygon([Point(4, 1), Point(5, 3), Point(5, 6), Point(3, 4),
                      Point(2, 3), Point(4, 8), Point(2, 5), Point(1, 1)])

    polygon_1.make_simple()

    assert simple == polygon_1


def test_make_convex() -> None:
    """
        Tests if Polygon class method make_convex works correctly.
    """
    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    convex = Polygon([Point(1, 1), Point(4, 1), Point(5, 3),
                      Point(5, 6), Point(4, 8), Point(2, 5)])

    polygon.make_convex_hull()

    assert convex == polygon


def test_does_contain() -> None:
    """
        Tests if Polygon class method does_contain works correctly.
        Two common and one edge case.
    """
    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    point_in = Point(4, 4)
    point_out = Point(0, 0)
    point_edge = Point(5, 3)

    assert polygon.does_contain(point_in)
    assert not polygon.does_contain(point_out)
    assert polygon.does_contain(point_edge)


def test_number_of_intersections() -> None:
    """
        Tests if Polygon class method number_of_intersections works correctly.
    """
    line_segment_intersect = LineSegment(first=Point(0, 0),
                                         second=Point(10, 10))
    line_segment_no_intersect = LineSegment(first=Point(0, 0),
                                            second=Point(-10, -10))

    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    assert polygon.intersection_count(line_segment_intersect) == (6, False)
    assert polygon.intersection_count(line_segment_no_intersect) == (0, False)


def test_does_intersect() -> None:
    """
        Tests if Polygon class method does_intersect works correctly.
        Two common and one edge case.
    """
    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    line_segment_intersect = LineSegment(Point(0, 2), Point(2, 2))
    line_segment_no_intersect = LineSegment(Point(0, 0), Point(-5, 2))
    line_segment_match = LineSegment(polygon.points[4], polygon.points[5])

    assert polygon.does_intersect(line_segment_intersect)
    assert not polygon.does_intersect(line_segment_no_intersect)
    assert polygon.does_intersect(line_segment_match)


def test_is_empty() -> None:
    """
        Tests if Polygon class method is_empty works correctly.
        Two common and one edge case.
    """
    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    no_points = []
    points_out = [Point(0, 0), Point(10, 10), Point(0, 6), Point(-1, 12)]
    points_in = [Point(0, 0), Point(4, 4), Point(0, 6), Point(-1, 12)]

    assert polygon.is_empty(no_points)
    assert polygon.is_empty(points_out)
    assert not polygon.is_empty(points_in)


def test_is_convex() -> None:
    """
        Tests if Polygon class method is_convex works correctly.
    """
    polygon = Polygon([Point(1, 1), Point(5, 6), Point(5, 3), Point(2, 5),
                       Point(4, 8), Point(2, 3), Point(4, 1), Point(3, 4)])

    convex = Polygon([Point(1, 1), Point(3, 3), Point(0, 5),
                      Point(-1, 4), Point(-1, 2)])

    assert not polygon.is_convex()
    assert convex.is_convex()
