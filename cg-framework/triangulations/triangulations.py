from typing import List

from structures.line_segment import LineSegment
from structures.point import Point
from structures.polygon import Polygon
from structures.triangle import Triangle

from triangulations.tree import Tree, Node

from util import orientation


def polygon_remainders(triangle: Triangle, polygon: Polygon) -> List[Polygon]:
    """
    From a given polygon, and a triangle within it, creates smaller remainder or
    two of them (depending on the position of the triangle within the polygon.)
    
    Args:
        triangle: Triangle object that lies within polygon.
        polygon: Convex polygon.

    Returns:
        One or two smaller polygon remainders.
    """
    diagonals = [segment for segment in triangle.get_sides() if
                 polygon.has_diagonal(segment)]

    if len(diagonals) == 1:
        remainder_points = list(polygon.points)
        triangle_points = triangle.get_points()

        for point in triangle_points:
            if not diagonals[0].does_contain(point):
                remainder_points.remove(point)

        return [Polygon(remainder_points), None]

    else:
        if diagonals[1].does_contain(diagonals[0].first):
            common_point = diagonals[0].first
        else:
            common_point = diagonals[0].second

        common_point_index = polygon.points.index(common_point)

        return [Polygon(polygon.points[1:common_point_index+1]), Polygon(
            [polygon.points[0]] + polygon.points[common_point_index:])]


def extend_triangulation(parent: Node, points: List[Point]) -> List[Triangle]:
    """
    Gets list of triangulations from parent and appends new triangle to it.
    
    Args:
        parent: Parent node.
        points: Points of the new triangle.

    Returns:
        List of triangles.
    """
    triangles_so_far = list(parent.data)
    triangles_so_far.append(Triangle(points[0], points[1], points[2]))

    return triangles_so_far


def pick_start_segment(polygon: Polygon) -> LineSegment:
    points_count = len(polygon.points)

    if points_count > 3:

        for i in range(points_count):
            ref_points = (polygon.points[(i - 1) % points_count],
                          polygon.points[i % points_count],
                          polygon.points[(i + 1) % points_count],
                          polygon.points[(i + 2) % points_count])

            or_1 = orientation(ref_points[0], ref_points[1], ref_points[2])
            or_2 = orientation(ref_points[1], ref_points[2], ref_points[3])

            if or_1 != 0 and or_2 != 0:
                return LineSegment(ref_points[1], ref_points[2])
        raise ValueError("Polygon consists only out of collinear points!")
    else:
        raise ValueError("Polygon size is less than 3!")


def merge_triangulations(first: Node, second: Node) -> None:
    """
    For nodes whose children contain incomplete triangulations,
    generates all possible complete triangulations and appends them to the
    first tree.

    Args:
        first: Root of the first subtree.
        second: Root of the second subtree.
    """
    first_leaf_nodes = Tree(first).get_leaf_nodes()
    second_leaf_nodes = Tree(second).get_leaf_nodes()
    for leaf_1 in first_leaf_nodes:
        for leaf_2 in second_leaf_nodes:
            leaf_1.add_child(Node(leaf_1.data + leaf_2.data))


def rearrange_points(segment: LineSegment, polygon: Polygon) -> List[Point]:
    second_index = polygon.points.index(segment.second)
    first_index = polygon.points.index(segment.first)
    before_points = polygon.points[:first_index]
    after_points = polygon.points[second_index + 1:]

    return [polygon.points[first_index], polygon.points[
        second_index]] + after_points + before_points


def triangulate(polygon: Polygon, parent: Node) -> Node:
    """
    Performs recursive triangulation of a polygon. Incomplete triangulations
    are put in tree that has parent as root. Complete triangulations are leaf
    nodes of that tree.

    Args:
        polygon: Polygon that will be triangulated.
        parent: Root of tree that will contain triangulations

    Returns: Leaf nodes if polygon is actually triangle.
    """
    if len(polygon.points) == 3:
        child = Node(extend_triangulation(parent, polygon.points[:3]))
        parent.add_child(child)

        return child

    segment = pick_start_segment(polygon)
    polygon.points = rearrange_points(segment, polygon)

    for point in polygon.points[2:]:
        first_triangle = Triangle(segment.first, segment.second, point)

        remainders = polygon_remainders(first_triangle, polygon)
        sub_root = triangulate(Polygon([segment.first, segment.second,
                                        point]), parent)
        triangulate(remainders[0], sub_root)

        if remainders[1]:
            second_remainder_root = Node([])
            triangulate(remainders[1], second_remainder_root)

            merge_triangulations(sub_root, second_remainder_root)


def all_triangulations(polygon: Polygon) -> List[List[Triangle]]:
    """
    Wrapper function for recursive "triangulate" function.
    
    Args:
        polygon: Polygon that will be triangulated.

    Returns:
        List of all possible triangulations of this polygon.
    """
    polygon.make_simple()
    tree = Tree(Node([]))
    triangulate(polygon, tree.root)

    return [node.data for node in tree.get_leaf_nodes()]
