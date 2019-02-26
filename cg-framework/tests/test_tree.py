"""
    Unit tests of Tree class methods
"""

from triangulations.tree import Node, Tree

def test_depth_first_traversal() -> None:
    """
    Tests if depth_first_traversal works correctly.
    """
    a, b, c, d = Node("a"), Node("b"), Node("c"), Node("d")

    a.add_child(b)
    a.add_child(c)
    c.add_child(d)
    tree = Tree(a)

    assert tree.depth_first_traversal() == [a, b, c, d]


def test_breadth_first_traversal() -> None:
    """
    Tests if breadth_first_traversal works correctly.
    """

    a, b, c, d = Node("a"), Node("b"), Node("c"), Node("d")

    a.add_child(b)
    a.add_child(c)
    c.add_child(d)
    tree = Tree(a)

    assert tree.breadth_first_traversal() == [a, b, c, d]


def test_get_nodes() -> None:
    """
    Tests if get_nodes works correctly.
    """

    a, b, c, d = Node("a"), Node("b"), Node("c"), Node("d")

    a.add_child(b)
    a.add_child(c)
    c.add_child(d)
    tree = Tree(a)

    assert tree.get_nodes() == [a, b, c, d]


def test_get_leaf_nodes() -> None:
    """
    Tests if get_leaf_nodes works correctly.
    """

    a, b, c, d = Node("a"), Node("b"), Node("c"), Node("d")

    a.add_child(b)
    a.add_child(c)
    c.add_child(d)
    tree = Tree(a)

    assert tree.get_leaf_nodes() == [b, d]
