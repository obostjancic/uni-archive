"""
Contains models that correspond to tables in the database.
"""
from sqlalchemy import Column, ForeignKey, Integer, Float, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

from db.db_conf import DB_URI

Base = declarative_base()

triangle_point = Table('triangle_point', Base.metadata,
                       Column('triangle', Integer, ForeignKey('triangle.id')),
                       Column('point', Integer, ForeignKey('point.id')))


polygon_point = Table('polygon_point', Base.metadata,
                      Column('polygon', Integer, ForeignKey('polygon.id')),
                      Column('point', Integer, ForeignKey('point.id')))


polygon_triangulation = Table('polygon_triangulation', Base.metadata,
                              Column('polygon', Integer, ForeignKey(
                                     'polygon.id')),
                              Column('triangulation', Integer, ForeignKey(
                                     'triangulation.id')))


triangulation_triangle = Table('triangulation_triangle', Base.metadata,
                               Column('triangle', Integer, ForeignKey(
                                      'triangle.id')),
                               Column('triangulation', Integer, ForeignKey(
                                      'triangulation.id')))


class Point(Base):
    """Model for point table. Represents 2D point"""
    __tablename__ = 'point'

    id = Column(Integer, primary_key=True)
    x = Column(Float)
    y = Column(Float)

    triangles = relationship("Triangle", secondary=triangle_point,
                             back_populates="points")
    polygons = relationship("Polygon", secondary=polygon_point,
                            back_populates="points")

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y


class Triangle(Base):
    """Model for triangle table. Represents 2D triangle."""
    __tablename__ = 'triangle'

    id = Column(Integer, primary_key=True)

    points = relationship("Point", secondary=triangle_point,
                          back_populates="triangles")

    triangulations = relationship("Triangulation",
                                  secondary=triangulation_triangle,
                                  back_populates="triangles")


class Triangulation(Base):
    """
    Model for triangulation table. Represents list of triangles that form
    up one triangulation
    """
    __tablename__ = 'triangulation'

    id = Column(Integer, primary_key=True)

    polygons = relationship("Polygon", secondary=polygon_triangulation,
                            back_populates="triangulations")

    triangles = relationship("Triangle", secondary=triangulation_triangle,
                             back_populates="triangulations")


class Polygon(Base):
    """Model for polygon table. Represents triangulated 2D polygon"""
    __tablename__ = 'polygon'

    id = Column(Integer, primary_key=True)

    points = relationship("Point", secondary=polygon_point,
                          back_populates="polygons")

    triangulations = relationship("Triangulation",
                                  secondary=polygon_triangulation,
                                  back_populates="polygons")


engine = create_engine(DB_URI)
Base.metadata.create_all(engine)