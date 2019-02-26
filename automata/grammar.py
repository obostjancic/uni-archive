from typing import Dict, List


class Grammar:
    """
    Class representing Context free language grammar.
    """
    def __init__(self, rules: str) -> None:
        """
        Initializes Grammar object. Uses 'make_rules' helper method.

        Args:
            rules: String of rules with '\n' as delimiter between multiple
            rules.
        """
        self.rules = self.make_rules(rules)
        self.stack = ['S']
        self.result = None

    def extract_variables(self, rule: str) -> List[str]:
        """
        Loops trough the rule, extracting variables (terminators).

        Args:
            rule: One of the rules in grammar.

        Returns:
            List of variables appearing in that rule.
        """
        variables = []
        for char in rule:

            if char in self.rules.keys():
                variables.append(char)

        return variables

    def make_rules(self, rules: str) -> Dict[str, str]:
        """
        Transforms string of rules in to a dictionary. Splits rules by '\n',
        then by '->' or '|'.
        Args:
            rules: String of rules with '\n' as delimiter.

        Returns:
            Dictionary of rules.
        """
        productions = rules.split('\n')
        rules_dict = {}

        for production in productions:
            var, value = "".join(production.split()).split("->")
            values = value.split('|')
            if var in rules_dict:
                rules_dict[var] += values
            else:
                rules_dict[var] = values

        return rules_dict

    def follow_rule(self, word: str) -> None:
        """
        Follows one rule, then recursively follows additional rules.
        Args:
            word: Word to be checked if it is a part of grammar defined by
            rules dictionary.

        Returns:
            None, but places result in self.stack.
        """
        if not self.stack or self.result:
            return None

        current = self.stack.pop()
        backup = current

        if current == word:
            self.result = current

        variables = self.extract_variables(current)

        for var in variables:

            for rule in self.rules[var]:
                current = backup
                current = current.replace(var, rule)

                if len(current) > len(word):
                    continue
                self.stack.append(current)

        self.follow_rule(word)

    def contains(self, word: str) -> bool:
        """
        Wrapper function for testing if word is a part of grammar.
        Args:
            word: word to be tested.

        Returns:
            True if a word is a part of grammar, false otherwise.
        """
        self.follow_rule(word)
        return self.result is not None
