"""
    Unit tests of triangulation methods
"""

from structures.line_segment import LineSegment
from structures.point import Point
from structures.polygon import Polygon
from structures.triangle import Triangle
from triangulations.tree import Node, Tree
from triangulations.triangulations import polygon_remainders
from triangulations.triangulations import pick_start_segment
from triangulations.triangulations import rearrange_points
from triangulations.triangulations import triangulate
from triangulations.triangulations import all_triangulations

def test_polygon_remainders() -> None:
    """
    Tests if polygon_remainders works correctly. Tests two possible cases.
    """

    hexagon = Polygon([Point(0, 0), Point(1, 0), Point(2, 0),
                       Point(2, 1), Point(1, 2), Point(0, 1)])

    triangle_1 = Triangle(Point(2, 0), Point(2, 1), Point(1, 2))
    triangle_2 = Triangle(Point(1, 0), Point(2, 0), Point(1, 2))

    remainders_1 = [Polygon([Point(0, 0), Point(1, 0), Point(2, 0),
                             Point(1, 2), Point(0, 1)]), None]

    remainders_2 = [Polygon([Point(1, 0), Point(2, 0),
                             Point(2, 1), Point(1, 2)]),
                    Polygon([Point(0, 0), Point(1, 2), Point(0, 1)])]

    assert polygon_remainders(triangle_1, hexagon) == remainders_1
    assert polygon_remainders(triangle_2, hexagon) == remainders_2


def test_pick_start_segment()-> None:
    """
    Tests if pick_start_segment works correctly. One common and one edge case.
    """

    hex_1 = Polygon([Point(0, 0), Point(1, -1), Point(2, 0),
                     Point(2, 1), Point(1, 2), Point(0, 1)])

    hex_2 = Polygon([Point(0, 0), Point(1, 0), Point(2, 0),
                     Point(2, 1), Point(1, 2), Point(0, 1)])

    assert pick_start_segment(hex_1) == LineSegment(Point(0, 0), Point(1, -1))
    assert pick_start_segment(hex_2) == LineSegment(Point(2, 0), Point(2, 1))


def test_rearrange_points()-> None:
    """
    Tests if rearrange_points works correctly.
    """

    hexagon = Polygon([Point(0, 0), Point(1, -1), Point(2, 0),
                       Point(2, 1), Point(1, 2), Point(0, 1)])

    segment = LineSegment(Point(1, -1), Point(2, 0))

    assert rearrange_points(segment, hexagon) == [Point(1, -1), Point(2, 0),
                                                  Point(2, 1), Point(1, 2),
                                                  Point(0, 1), Point(0, 0)]


def test_triangulate()-> None:
    """
    Tests if rearrange_points works correctly.
    """

    quad = Polygon([Point(0, 0), Point(1, -1), Point(2, 0), Point(2, 1)])
    root = Node([])
    triangulate(quad, root)

    triangulation_1 = [Triangle(Point(0, 0), Point(1, -1), Point(2, 0)),
                       Triangle(Point(0, 0), Point(2, 0), Point(2, 1))]
    triangulation_2 = [Triangle(Point(0, 0), Point(1, -1), Point(2, 1)),
                       Triangle(Point(1, -1), Point(2, 0), Point(2, 1))]

    assert Tree(root).get_leaf_nodes()[0].data == triangulation_1
    assert Tree(root).get_leaf_nodes()[1].data == triangulation_2


def test_all_triangulations()-> None:
    """
    Tests if all_triangulations works correctly.
    """
    quad = Polygon([Point(0, 0), Point(1, -1), Point(2, 0), Point(2, 1)])
    
    all_triangs = [[Triangle(Point(1, -1), Point(2, 0), Point(2, 1)),
                           Triangle(Point(1, -1), Point(2, 1), Point(0, 0))],
                          [Triangle(Point(1, -1), Point(2, 0), Point(0, 0)),
                           Triangle(Point(2, 0), Point(2, 1), Point(0, 0))]]
    
    assert all_triangulations(quad) == all_triangs
