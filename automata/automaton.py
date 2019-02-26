from typing import Dict, Tuple, List


class State:
    """
    This class represents a state of automaton.
    """

    def __init__(self, is_initial: bool = None, is_accept: bool = None,
                 transition: dict = None) -> None:
        """
        Constructor.

        Args:
            is_initial: Defines if state is initial or not.
            is_accept: Defines if state is accept or not.
            transition: Defines transition rule for considered state.
        """
        self.is_initial = is_initial
        self.is_accept = is_accept
        self.transition = transition

    def __eq__(self, other: 'State') -> bool:
        """
        Overridden == operator.
        Args:
            other: State which is compared with self.

        Returns:
            True if they are equal, false otherwise.
        """

        if self.is_initial == other.is_initial and self.is_accept \
                == other.is_accept and self.transition == other.transition:
            return True

        return False

    def make_new_state(self, symbol: str) -> Tuple['State', bool]:
        """
        Makes new state for new symbol.

        Args:
            symbol: Letter or interpunction symbol on which automaton is
                    currently reading while reading text.

        Returns: Tuple consisting of next state and reset flag.
        """
        # if new state is defined returns it, otherwise returns self and
        # reset flag
        try:
            new_state = self.transition[symbol]

            return new_state, False
        except KeyError:

            return self, True

    def set_transition_state(self, result_dict: dict, i: int, index: str,
                             word: str) -> None:
        """
        Sets transition of current state (self) to previous state in
        result_dict.

        Args:
            result_dict: Dict of automaton states.
            i: Position of current char in word.
            index: State name (for example, "s0").
            word: Word that automaton searches for.
        """
        prev_state = result_dict[index]
        char = word[i - 1]
        self.transition[char] = prev_state

    def __str__(self) -> str:
        # Treba li nam ovo?
        # ognjen: Nije neophodno ali je generalno praksa da se metode __str__
        #  i __repr__ override-aju. __str__ se poziva prilikom printanja
        # stanja, a __repr__ prilikom printanja kolekcije (npr. liste)
        # stanja. Također pydev debugger koristi ove metode kad se program
        # pokrece u debug mode-u (obrisati kad svi pročitaju).
        """
        Returns: State transition rule as string.
        """

        return str(self.transition)


class Automaton:

    def set_states(self, states: Dict[str, State]) -> None:
        """
        :param states: Sets states of automaton.
        :return: None
        """
        self.states = states
        self.current = states['s0']

    def change_state(self, new_state: State) -> None:
        """
        Changes current state to new state.

        Args:
            new_state: State that will become current.

        """
        self.current = new_state

    def reset(self) -> None:

        """ Resets automaton to initial state. """

        self.current = self.states['s0']

    def create_states(self, word: str) -> Dict[str, State]:
        """
        Creates states for automaton that finds given word.

        Args:
            word: Word that automaton searches for in text.

        Returns:
            Dict of states and their names.
        """
        word = word[::-1]
        result_dict = {}

        for i, _ in enumerate(word):
            if i == 0:
                curr_state = State(False, True, {})

            else:
                curr_state = State(False, False, {})
                curr_state.set_transition_state(result_dict, i, 's' + str(
                    len(word) - i + 1), word)

            result_dict['s' + str(len(word) - i)] = curr_state

        curr_state = State(True, False, {})
        curr_state.set_transition_state(result_dict, 0, 's1', word)
        result_dict['s0'] = curr_state

        return result_dict

    def create_union_states(self, word: str) -> Dict[str, State]:
        words_list = word.split('|')

        result_dicts_list = []
        result_dict = {}

        for word in words_list:
            result_dicts_list.append(self.create_states(word))

        result_dict['s0'] = []
        for i, dict in enumerate(result_dicts_list):
            state = dict['s0']
            del dict['s0']
            result_dict['s0'].append(state)


        return result_dict

    def accepts(self, expression: str) -> bool:
        for i, char in enumerate(expression):
            if type(self.current) is not list:
                new_state, no_state = self.current.make_new_state(char)
                if no_state:
                    return False
                self.change_state(new_state)
            else:
                for curr in self.current:
                    if list(curr.transition.keys())[0] == char:
                        new_state, no_state = curr.make_new_state(char)
                        if no_state:
                            return False
                        self.change_state(new_state)

        return self.current.is_accept


    def search_for_word(self, word: str, text: str) -> List[Tuple[int, int]]:
        """
        Searches for word in text.

        Args:
            word: Word that automaton searches for.
            text: Text in which automaton searches for given word.

        Returns: List of tuples consisting of indices for where word starts
                 and where word ends.
        """

        result_list, word_start_index, word_end_index = [], 0, 0

        self.set_states(self.create_states(word))

        for i, char in enumerate(text):
            new_state, is_reset = self.current.make_new_state(char)

            if new_state:
                self.change_state(new_state)
                if self.current.is_accept:
                    is_reset = True

            if is_reset:

                if self.current.is_accept:
                    word_end_index = i
                    result_list.append((word_start_index, word_end_index))

                word_start_index = i+1
                self.reset()

        return result_list

a = Automaton()
a.set_states(a.create_union_states('bc|d|v'))
print(a.accepts('bcv'))

