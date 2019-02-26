from typing import List

from networkx import DiGraph
from networkx import dfs_preorder_nodes as dfs


def dfs_marked_nodes(digraph: DiGraph, dfs: List) -> List:
    """
    Find nodes from digraph marked by dfs

    Args:
        digraph: DiGraph to iterate through it's vertices
        dfs: List of nodes that depth first search has reached

    Returns: List of marked nodes
    """
    list_of_nodes = []

    for node in digraph:
        if node in dfs:
            list_of_nodes.append(node)

    return list_of_nodes


def prepare(regex: str) -> str:
    """
    Prepares regex for nfa if there is + within. Function replaces expression,
    on which + is applied, with same expression inserted in regex and applies *

    Args:
        regex: passed regex

    Returns: new regex if there is + in it

    """
    for i, char in enumerate(regex):
        if char == '+':

            regex = list(regex)
            regex[i] = '*'
            regex = "".join(regex)

            if regex[i-1] not in ['(', ')', '*', '|']:
                regex = regex[:i] + regex[i-1] + regex[i:]

            elif regex[i-1] == ')':

                string_to_insert = ')'
                stack = [')']

                for j, reverse_ch in enumerate(regex[i-2::-1]):
                    if reverse_ch == '(':
                        string_to_insert = '(' + string_to_insert
                        stack.pop()

                        if len(stack) == 0:
                            regex = regex[:i-j-2] + string_to_insert + regex[i-j-2:]

                    elif reverse_ch == ')':
                        stack.append(')')
                        string_to_insert = ')' + string_to_insert

                    else:
                        string_to_insert = reverse_ch + string_to_insert

            else:
                raise ValueError

    return regex


class NFA:
    def __init__(self, regex: str):
        self.regex = prepare(regex)
        self.m = len(self.regex)
        self.digraph = DiGraph()
        self.digraph.add_nodes_from(range(self.m+1))

        stack = []

        for i in range(self.m):
            left_prev_op_pos = i

            if self.regex[i] == '(' or self.regex[i] == '|':
                stack.append(i)

            elif self.regex[i] == ')':
                or_operator_pos = stack.pop()

                if self.regex[or_operator_pos] == '|':
                    left_prev_op_pos = stack.pop()
                    self.digraph.add_edge(left_prev_op_pos, or_operator_pos+1)
                    self.digraph.add_edge(or_operator_pos, i)

                elif self.regex[or_operator_pos] == '(':
                    left_prev_op_pos = or_operator_pos

                else:
                    assert False

            if i < self.m-1 and self.regex[i+1] == '*':
                self.digraph.add_edge(left_prev_op_pos, i + 1)
                self.digraph.add_edge(i + 1, left_prev_op_pos)

            if self.regex[i] in ['(', ')', '*']:

                self.digraph.add_edge(i, i + 1)

        if len(stack) != 0:
            raise ValueError

    def recognizes(self, txt: str) -> bool:
        """
        Determines whether passed text can be generated from nfa's regex
        Args:
            txt: string to examine

        Returns: true if nfa recognizes txt, false otherwise
        """
        _dfs = list(dfs(self.digraph, 0))
        bag = dfs_marked_nodes(self.digraph, _dfs)

        for char in txt:
            match = []

            for item in bag:

                if item == self.m:
                    continue

                if self.regex[item] == char:
                    match.append(item+1)

            _dfs = []
            for s in match:
                _dfs += list(dfs(self.digraph, s))

            bag = dfs_marked_nodes(self.digraph, _dfs)
            if len(bag) == 0:
                return False

        for item in bag:
            if item == self.m:
                return True

        return False
