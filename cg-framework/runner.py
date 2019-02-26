from time import time
from tkinter import *
from tkinter import messagebox

from conf import *

from structures.line_segment import LineSegment
from structures.point import Point
from structures.polygon import Polygon
from sweep_hull.delaunay import delaunay_triangulation

points = []


def callback(event):
    canvas = event.widget
    x, y = canvas.canvasx(event.x), canvas.canvasx(event.y)
    point = translate_coord_from_canvas(x, y)
    point.draw(canvas)
    points.append(point)


def translate_coord_from_canvas(x: int, y: int) -> Point:
    return Point(x - CENTER, -(y - CENTER))


def make_polygon() -> None:
    polygon = Polygon(points)
    polygon.draw(canvas)


def make_simple_polygon() -> None:
    polygon = Polygon(points)
    polygon.make_simple()
    polygon.draw(canvas)


def is_convex() -> None:
    polygon = Polygon(points)
    polygon.draw(canvas)
    if polygon.is_convex():
        messagebox.showinfo("Result", "Polygon IS convex")
    else:
        messagebox.showinfo("Result", "Polygon IS NOT convex")


def make_convex_hull() -> None:
    polygon = Polygon(points)
    polygon.make_convex_hull()
    polygon.draw(canvas)


def contains_point() -> None:
    polygon = Polygon(points[0: len(points) - 1])
    polygon.draw(canvas)
    if polygon.does_contain(points[-1]):
        messagebox.showinfo("Result", "Point is INSIDE polygon")
    else:
        messagebox.showinfo("Result", "Point is OUTSIDE polygon")


def line_segs() -> None:
    first = LineSegment(points[0], points[1])
    second = LineSegment(points[2], points[3])
    first.draw(canvas)
    second.draw(canvas)
    if first.does_intersect_or_touch(second):
        messagebox.showinfo("Result", "Segments DO intersect")
    else:
        messagebox.showinfo("Result", "Segments DO NOT intersect")


def clear() -> None:
    del points[:]
    canvas.delete("all")
    canvas.create_line(0, CENTER, CANVAS_DIM, CENTER, width=1, fill="black")
    canvas.create_line(CENTER, 0, CENTER, CANVAS_DIM, width=1, fill="black")


def delaunay() -> None:
    polygon = Polygon(points)
    triangulation = delaunay_triangulation(polygon)
    for triangle in triangulation.triangles:
        triangle.draw(canvas)


root = Tk()

root.title("CG framework")
root.geometry(SCREEN_RESOLUTION)

canvas = Canvas(root, width=CANVAS_DIM, height=CANVAS_DIM)
canvas.grid(row=0, column=0)
canvas.bind("<Button-1>", callback)
canvas.create_line(0, CENTER, CANVAS_DIM, CENTER, width=1, fill="black")
canvas.create_line(CENTER, 0, CENTER, CANVAS_DIM, width=1, fill="black")

sidebar = Frame(root, width=160, height=SCREEN_HEIGHT)
sidebar.grid(row=0, column=1)


Button(sidebar, text='Make polygon',
       command=make_polygon, padx=59, pady=5).grid(row=0, column=1)
Frame(sidebar, height=5).grid(row=1, column=1)
Button(sidebar, text='Make simple polygon',
       command=make_simple_polygon, padx=43, pady=5).grid(row=2, column=1)
Frame(sidebar, height=5).grid(row=3, column=1)
Button(sidebar, text='Is convex?',
       command=is_convex, padx=66, pady=5).grid(row=4, column=1)
Frame(sidebar, height=5).grid(row=5, column=1)
Button(sidebar, text='Make convex hull',
       command=make_convex_hull, padx=51, pady=5).grid(row=6, column=1)
Frame(sidebar, height=5).grid(row=7, column=1)
Button(sidebar, text='Contains point',
       command=contains_point, padx=58, pady=5).grid(row=8, column=1)
Frame(sidebar, height=5).grid(row=9, column=1)
Button(sidebar, text='Does intersect?',
       command=line_segs, padx=55, pady=5).grid(row=10, column=1)
Frame(sidebar, height=5).grid(row=11, column=1)
Button(sidebar, text='Clear',
       command=clear, padx=80, pady=5).grid(row=12, column=1)
Frame(sidebar, height=5).grid(row=13, column=1)
Button(sidebar, text='Delaunay',
       command=delaunay, padx=70, pady=5).grid(row=14, column=1)

root.mainloop()
