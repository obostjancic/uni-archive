"""
    Unit tests of LineSegment class methods
"""
from structures.point import Point
from structures.line_segment import LineSegment


def test__eq__() -> None:
    """
        Tests if overriden __eq__ method works correctly
    """
    point_1 = Point(1, 2)
    point_2 = Point(-2, -4)
    point_3 = Point(3, 3)
    point_4 = Point(0, 0)
    line_segment_1 = LineSegment(first=point_1, second=point_2)
    line_segment_2 = LineSegment(first=point_1, second=point_2)
    line_segment_3 = LineSegment(first=point_3, second=point_4)

    assert line_segment_1 == line_segment_2
    assert not line_segment_1 == line_segment_3


def test_contains_point() -> None:
    """
        Tests if contains_point determines relationship between line_segment 
        and point correctly. Tests both common and edge cases.
    """
    point_1 = Point(1, 2)
    point_2 = Point(-2, -4)
    point_3 = Point(3, 3)
    point_4 = Point(0, 0)

    line_segment = LineSegment(first=point_1, second=point_2)

    assert line_segment.does_contain(point_1)
    assert line_segment.does_contain(point_2)
    assert not line_segment.does_contain(point_3)
    assert line_segment.does_contain(point_4)


def test_does_intersect() -> None:
    """
        Tests if does_intersect works correctly.
        Tests both common and edge cases.
    """

    line_segment_1 = LineSegment(first=Point(1, 1), second=Point(4, 4))
    reversed_segment = LineSegment(first=Point(4, 4), second=Point(1, 1))
    line_segment_2 = LineSegment(first=Point(1, 1), second=Point(-2, -4))
    line_segment_3 = LineSegment(first=Point(3, 3), second=Point(5, 5))
    line_segment_4 = LineSegment(first=Point(1, 0), second=Point(5, -5))

    assert line_segment_1.does_intersect_or_touch(reversed_segment)
    assert line_segment_1.does_intersect_or_touch(line_segment_2)
    assert line_segment_1.does_intersect_or_touch(line_segment_3)
    assert not line_segment_1.does_intersect_or_touch(line_segment_4)
