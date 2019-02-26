from db.dal import save_triangulations
from structures.point import Point
from structures.polygon import Polygon
from triangulations.triangulations import all_triangulations

_5gon = Polygon([Point(4, 2), Point(1, 0), Point(2, 4),
                 Point(0, 2), Point(3, 0)])

_6gon = Polygon([Point(0, 3), Point(3, 0), Point(3, 6),
                 Point(1, 1), Point(6, 2), Point(5, 4)])

_7gon = Polygon([Point(3, 1), Point(4, 6), Point(1, 1), Point(0, 4),
                 Point(2, 8), Point(2, 0), Point(0, 3), ])

_8gon = Polygon([Point(0, 0), Point(4, 4), Point(2, 3), Point(5, 2),
                 Point(0, 1), Point(1, 0), Point(4, 1), Point(5, 3)])

_9gon = Polygon([Point(0, 0), Point(4, 4), Point(2, 1), Point(3, 9),
                 Point(5, 5), Point(0, 3), Point(3, 2), Point(4, 8),
                 Point(1, 5)])

_10gon = Polygon([Point(1, 0), Point(5, 4), Point(2, 0), Point(3, 8),
                  Point(5, 3), Point(0, 3), Point(4, 2), Point(4, 6),
                  Point(0, 5), Point(1, 7)])

_11gon = Polygon([Point(1, 1), Point(5, 4), Point(2, 0), Point(3, 8),
                  Point(4, 1), Point(0, 3), Point(5, 3), Point(4, 6),
                  Point(0, 6), Point(2, 9), Point(1, 9)])

print("{}: {}".format(len(_5gon.points), len(all_triangulations(_5gon))))
print("{}: {}".format(len(_6gon.points), len(all_triangulations(_6gon))))
print("{}: {}".format(len(_7gon.points), len(all_triangulations(_7gon))))
print("{}: {}".format(len(_8gon.points), len(all_triangulations(_8gon))))
print("{}: {}".format(len(_9gon.points), len(all_triangulations(_9gon))))
print("{}: {}".format(len(_10gon.points), len(all_triangulations(_10gon))))
print("{}: {}".format(len(_11gon.points), len(all_triangulations(_11gon))))

save_triangulations(_5gon, all_triangulations(_5gon))
