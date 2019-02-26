from typing import List

from structures.line_segment import LineSegment
from structures.triangle import Triangle
#TODO doc

class Triangulation:
    # TODO doc
    def __init__(self, triangles: List[Triangle]) -> None:
        # TODO doc
        self.triangles = triangles

    def get_edges(self) -> List[LineSegment]:
        # TODO doc
        edges = []
        for triangle in self.triangles:
            for edge in triangle.get_sides():
                if edge in edges:
                    edge.frontier = False
                else:
                    edges.append(edge)

        return edges

    def add(self, triangle: Triangle) -> None:
        # TODO doc
        self.triangles.append(triangle)

    def remove(self, triangle: Triangle) -> None:
        # TODO doc
        self.triangles.remove(triangle)