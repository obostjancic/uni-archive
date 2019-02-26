"""
    Unit tests of Line class methods
"""
from structures.line import Line


def test_does_intersect() -> None:
    """
        Tests if does_intersect works correctly.
    """
    line_1 = Line(k=1, n=0)
    line_2 = Line(k=2.5, n=1)
    line_3 = Line(k=2.5, n=3)

    assert line_1.does_intersect(line_1) == True
    assert line_1.does_intersect(line_2) == True
    assert line_2.does_intersect(line_3) == False

