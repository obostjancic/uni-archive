"""
Contains unit tests for methods in Delaunay module.
"""
from structures.polygon import Polygon
from structures.line_segment import LineSegment
from structures.point import Point
from structures.triangle import Triangle
from structures.triangulation import Triangulation
from sweep_hull.delaunay import sort_other_points, new_edges, find_pair_edge, \
    empty_circle, add_triangles, delaunay_triangulation


def test_sort_other_points() -> None:
    """ Tests if sort_other_points method works correctly. """

    start_point = Point(0, 0)
    other_points = [Point(4, 3), Point(-1, 2), Point(1, 1), Point(2, 2)]

    sort_points = sort_other_points(other_points, start_point)

    assert sort_points == [Point(1, 1), Point(-1, 2), Point(2, 2), Point(4, 3)]


def test_new_edges() -> None:
    """ Tests if new_edges method works correctly. """

    a, b, c, d = [Point(4, 3), Point(-1, 2), Point(1, 1), Point(2, 1)]
    t_points = [a, b, c, d]
    t_edges = [LineSegment(b, c), LineSegment(c, d), LineSegment(b, d),
               LineSegment(b, a), LineSegment(a, d)]

    point = Point(1, 3)
    assert new_edges(t_points, t_edges, point) == [LineSegment(point, a),
                                                   LineSegment(point, b)]


def test_find_pair_edge() -> None:
    """ Tests if find pair edge method works correctly. """

    a, b, c, d = [Point(4, 3), Point(-1, 2), Point(1, 1), Point(2, 1)]
    triangles = [Triangle(b, c, d), Triangle(b, a, d)]
    triangulation = Triangulation(triangles)

    pair = find_pair_edge(triangulation, LineSegment(b, d))

    assert pair == (LineSegment(c, a), triangles)


def test_empty_circle() -> None:
    """ Tests if empty_circle method works correctly. """

    a, b, c, d = [Point(4, 3), Point(-1, 2), Point(1, 1), Point(2, 1)]

    poly = Polygon([a, b, c])
    poly.make_simple()
    poly.points.append(d)

    assert empty_circle(poly)


def test_add_triangles() -> None:
    """ Tests if add_triangles method works correctly. """

    a, b, c = [Point(4, 3), Point(-1, 2), Point(1, 1)]
    d = Point(2, 1)

    triangles = [Triangle(b, c, a)]
    triangulation = Triangulation(triangles)

    add_triangles(triangulation, d, [b, c, a])
    assert triangulation.triangles == [Triangle(b, c, a), Triangle(a, c, d)]


def test_delaunay_triangulation() -> None:
    """ Tests if delaunay_triangulation method works correctly. """

    a, b, c, d = [Point(4, 3), Point(-1, 2), Point(1, 1), Point(2, 1)]
    polygon = Polygon([a, b, c, d])
    triangulation = delaunay_triangulation(polygon)
    assert triangulation.triangles == [Triangle(c, a, d), Triangle(c, a, b)]