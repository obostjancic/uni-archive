"""
    Representation of 2D line - with helper methods
"""

from collections import namedtuple


class Line(namedtuple('Line', ['k', 'n'])):

    """ Representation of 2D line """

    def __eq__(self, other: 'Line') -> bool:
        """
        Determines if two lines (self and other) are the same.

        Args:
            other: Another line object

        Returns:
            bool: True if lines are the same, False otherwise
        """

        return self.k == other.k and self.n == other.n

    def does_intersect(self, other: 'Line') -> bool:
        """
        Determines if two lines (self and other) intersect

        Args:
            other: Another line object

        Returns:
            bool: True if lines intersect, False otherwise
        """

        return self.k != other.k or self == other

    def __str__(self) -> str:
        """
        Returns: Explicit line equation as string.
        """

        return "Line: y = " + str(self.k) + " * x + " + str(self.n)
