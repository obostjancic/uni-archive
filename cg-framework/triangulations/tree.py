"""
Contains node and tree classes, created as a data structure for functions of
triangulate.py. Can be used as a standalone.
"""

from typing import List, Deque
from collections import deque


class Node:

    def __init__(self, data) -> None:
        """
        Creates node object. Initializes its children to empty list.

        Args:
            data: Any data that node object should contain.
        """
        self.data = data
        self.children = []

    def add_child(self, child) -> None:
        """
        Appends another node object as a child of self.

        Args:
            child: Another Node object.
        """
        self.children.append(child)

    def is_leaf(self) -> bool:
        """
        Returns: True if self does not have any children. False otherwise.
        """
        return not self.children

    def __repr__(self):
        return str(self.data)


class Tree:

    def __init__(self, root: Node) -> None:
        """
        Creates new Tree object
        Args:
            root: Node that will be the root of self.
        """
        self.root = root

    def depth_first_traversal(self) -> List[Node]:
        """
        Performs depth first traversal of the tree.

        Returns:
            List of all nodes in the tree.
        """
        nodes_to_visit, visited = list(self.root.children[::-1]), []

        def _dft(stack: List[Node], current: Node) -> None:
            """
            Performs recursive depth first traversal of the tree.

            Args:
                stack: Stack containing nodes that will be visited.

            """
            visited.append(current)
            for child in current.children:
                if child not in visited:
                    _dft(stack, child)

        _dft(nodes_to_visit, self.root)
        return visited

    def breadth_first_traversal(self) -> List[Node]:
        """
        Performs breadth first traversal of the tree.

        Returns:
            List of all nodes in the tree.
        """
        nodes_to_visit, visited = deque(self.root.children), []

        def _bft(queue: Deque[Node], current: Node) ->None:
            """

            Performs recursive breath first traversal of the tree.

            Args:
                queue: Queue containing nodes that will be visited.

            """
            visited.append(current)
            for child in current.children:
                if child not in visited:
                    _bft(queue, child)

        _bft(nodes_to_visit, self.root)
        return visited

    def get_nodes(self, algorithm: str="bft") -> List['Node']:
        """
        Wrapper for tree traversals.

        Args:
            algorithm: Traversal algorithm that will be used.
                       "bft" - breadth first traversal
                       "dft" - depth first traversal.

        Returns: List of all nodes in the tree.
        """
        if algorithm == "bft":
            return self.breadth_first_traversal()

        elif algorithm == "dft":
            return self.depth_first_traversal()

        else:
            return []

    def get_leaf_nodes(self, algorithm: str="bft") -> List['Node']:
        """
        Get ol nodes in tree self that do not have any children.
        Args:
            algorithm: Traversal algorithm that will be used.
                       "bft" - breadth first traversal
                       "dft" - depth first traversal.

        Returns: List of nodes that do not have any children
        """
        return [node for node in self.get_nodes(algorithm) if node.is_leaf()]
