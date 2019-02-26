""" Contains interface methods for saving triangulations to database """

from typing import List

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.db_conf import DB_URI
from db.models import Polygon, Triangulation
from db.models import Point
from db.models import Triangle

from structures.point import Point as STPoint
from structures.polygon import Polygon as STPolygon
from structures.triangle import Triangle as STTriangle


engine = create_engine(DB_URI)
DBSession = sessionmaker(bind=engine)
session = DBSession()


def get_or_create_point(db_session: DBSession, point: STPoint):
    """
    If given point exists in table point, returns that instance. If it does
    not exist then creates new record.

    Args:
        db_session: Current database session.
        point: structures.point object for filtering.

    Returns: models.Point from database.
    """

    db_point = db_session.query(Point).filter_by(
        x=point.x, y=point.y).first()

    if db_point:
        return db_point
    else:
        db_point = Point(x=point.x, y=point.y)
        db_session.add(db_point)

        return db_point


def get_or_create_triangle(db_session: DBSession,
                           triangle: STTriangle) -> Triangle:
    """
    If given triangle exists in table triangle, returns that instance. If it
    does not exist then creates new record. Also populates triangle_point table

    Args:
        db_session: Current database session.
        triangle: structures.triangle object for filtering.

    Returns: models.Triangle from database.
    """
    first = get_or_create_point(db_session, triangle.first)
    second = get_or_create_point(db_session, triangle.second)
    third = get_or_create_point(db_session, triangle.third)
    db_triangle = None

    for triangle in db_session.query(Triangle).all():
        if first in triangle.points and second in triangle.points:
            if third in triangle.points:
                db_triangle = triangle
                break

    if db_triangle:
        return db_triangle
    else:
        db_triangle = Triangle()
        db_triangle.points.append(first)
        db_triangle.points.append(second)
        db_triangle.points.append(third)
        db_session.add(db_triangle)

        return db_triangle


def create_triangulation(db_session: DBSession,
                         triangulation: List[STTriangle]) -> Triangulation:
    """
    Creates new triangulation in database. Populates tables: triangulation,
    triangulation_triangle, triangle, triangle_point and point.

    Args:
        db_session: Current database session.
        triangulation: structures.triangle object for filtering.

    Returns: models.Triangulation from database.
    """
    db_triang = Triangulation()
    for triangle in triangulation:
        db_triang.triangles.append(get_or_create_triangle(db_session, triangle))

    return db_triang


def save_triangulations(polygon: STPolygon,
                        triangulations: List[List[STTriangle]]) -> Polygon:

    """
    Saves polygon and its triangulations to database. Populates all tables.

    Args:
        polygon: structures.polygon object that is triangulated
        triangulations: all triangulations of polygon

    Returns: models.Polygon from database.
    """

    db_poly = Polygon()
    for point in polygon.points:
        db_poly.points.append(get_or_create_point(session, point))

    for triangulation in triangulations:
        db_poly.triangulations.append(create_triangulation(session,
                                                           triangulation))

    session.add(db_poly)
    session.commit()
    return db_poly
