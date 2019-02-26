"""
Contains methods for generation of Delaunay triangulation of a set of points.
"""

from typing import List, Tuple

from numpy.linalg import det

from structures.line_segment import LineSegment
from structures.point import Point
from structures.polygon import Polygon
from structures.triangle import Triangle
from structures.triangulation import Triangulation


def find_start_point(points: List[Point]) -> Point:
    """
    Finds starting point for sweep hull algorithm.

    Args:
        points: List of points in 2D plane.

    Returns: First point in the list.
    """
    return points[0]


def sort_other_points(points: List[Point], start_point: Point) -> List[Point]:
    """
    Sorts all points in ascending order by their euclidean distance from
    starting point.

    Args:
        points: List of points in 2D plane.
        start_point: Point from which distance to every other point is
        calculated.

    Returns: Sorted list of points.

    """
    def _radial_key(_point: Point):
        """
        Defines comparison key for sorting.

        Args:
            _point: Some point.

        Returns: Euclidean distance from starting point.

        """
        return _point.euclidean_dist_squared(start_point)

    points.sort(key=_radial_key)

    return points


def new_edges(t_points: List[Point], t_edges: List[LineSegment],
              point: Point) -> List[LineSegment]:
    """
    Makes valid edges from one point to all points in triangulation so far.
    Args:
        t_points: Points in triangulation
        t_edges: Edges in triangulation
        point: Point that is not yet in triangulation.

    Returns: List of valid LineSegments.

    """
    n_edges = []
    for tri_p in t_points:
        new_edge = LineSegment(point, tri_p)
        valid = True

        for edge in t_edges:
            if edge.strict_intersect(new_edge):
                valid = False
                break

        if valid:
            n_edges.append(new_edge)

    return n_edges


def find_pair_edge(triangulation: Triangulation, edge: LineSegment) -> Tuple[
                   LineSegment, List[Triangle]]:
    """
    For edge that is diagonal of a convex quadrilateral in triangulation,
    finds other diagonal of that quadrilateral.

    Args:
        triangulation: Current triangulation
        edge: Some non frontier edge in triangulation.

    Returns: Other diagonal if quadrilateral is convex, edge if it is concave.

    """
    faces = []

    for triangle in triangulation.triangles:
        if edge in triangle.get_sides() or edge.reversed() in \
                triangle.get_sides():
            faces.append(triangle)

    if len(faces) != 2:
        return edge, faces

    endpoints = []
    for triangle in faces:
        for point in triangle.get_points():
            if not edge.does_contain(point):
                endpoints.append(point)

    return LineSegment(endpoints[0], endpoints[1]), faces


def flip_edges(triangulation: Triangulation, edges_to_flip: List[
               LineSegment]) -> None:
    """
    For list of potential illegal edges, flips all that should be flipped.

    Args:
        triangulation: Current triangulation
        edges_to_flip: List of potential illegal edges.

    """
    for edge in edges_to_flip:
        flip_edge(triangulation, edge)


def flip_edge(triangulation: Triangulation, edge: LineSegment) -> None:
    """
    If edge is illegal, replaces it with its pair and recursivly flips
    neighboring edges if they need flipping, else leaves this as they are.

    Args:
        triangulation: Current triangulation.
        edge: Potential illegal edge.

    """
    pair, faces = find_pair_edge(triangulation, edge)

    quad = Polygon([edge.first, pair.first, edge.second])
    quad.make_simple()
    quad.points.append(pair.second)

    if not empty_circle(quad) and len(faces) == 2:
        triangulation.remove(faces[0])
        triangulation.remove(faces[1])
        triangulation.add(Triangle(pair.first, pair.second, edge.first))
        triangulation.add(Triangle(pair.first, pair.second, edge.second))

        for triangle in faces:
            for _edge in triangle.get_sides():
                if not _edge.is_equal_undirected(pair) and \
                        not _edge.is_equal_undirected(edge):
                    flip_edge(triangulation, _edge)


def empty_circle(quad: Polygon) -> bool:
    """
    Tests if circle that contains points a b and c, also contains point d.
    If it does, then the edge ac is illegal and ould be replaced with edge bc.

    Args:
        quad: quadrilateral in triangulation.

    Returns: True if circle is empty, false otherwise.
    """

    a, b, c, d = quad.points
    matrix = [[a.x, a.y, a.x * a.x + a.y * a.y, 1],
              [b.x, b.y, b.x * b.x + b.y * b.y, 1],
              [c.x, c.y, c.x * c.x + c.y * c.y, 1],
              [d.x, d.y, d.x * d.x + d.y * d.y, 1]]

    return det(matrix) < 0


def add_triangles(triangulation: Triangulation, point: Point,
                  t_points: List[Point]) -> None:

    """
    Adds triangles from new point to triangulation.

    Args:
        triangulation: Current triangulation.
        point: New point that is not yet in triangulation.
        t_points: Points in triangulation.

    """
    t_edges = triangulation.get_edges()
    n_edges = new_edges(t_points, t_edges, point)
    edges_to_flip = []

    for edge_1 in n_edges:
        for edge_2 in n_edges:

            if edge_1 == edge_2: 
                break

            tri_edge = LineSegment(edge_1.second, edge_2.second)

            if tri_edge in t_edges:
                tri_edge = t_edges[t_edges.index(tri_edge)]
            elif tri_edge.reversed() in t_edges:
                tri_edge = t_edges[t_edges.index(tri_edge.reversed())]
            else:
                continue

            tri_edge.frontier = False

            edges_to_flip.append(tri_edge)
            tri_1 = Triangle(edge_1.second, edge_2.second, point)
            triangulation.add(tri_1)
    
    flip_edges(triangulation, edges_to_flip)


def delaunay_triangulation(polygon: Polygon) -> Triangulation:
    """
    Generates Delaunay triangulation from a given set of points.

    Args:
        polygon: Polygon object that contains list of points in 2D plane.

    Returns: Triangulation object containing list of triangles that form
             Delaunay triangulation of passed polygon.

    """
    polygon.make_simple()
    start_point = find_start_point(polygon.points)
    polygon.points = sort_other_points(polygon.points, start_point)

    first, second, third = polygon.points[:3]
    triangulation = Triangulation([Triangle(first, second, third)])

    for point in polygon.points[3:]:
        index = polygon.points.index(point)
        add_triangles(triangulation, point, polygon.points[:index])

    return triangulation
