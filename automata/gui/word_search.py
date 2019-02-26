"""
 Contains methods for making search word GUI. Uses logic from automaton.py.
"""

from tkinter import Tk, Frame, Label, Text, WORD, Button

from automaton import Automaton

root = Tk()
root.wm_title("Pretraga riječi")
root.geometry("540x450")
root.config(background="#011C38")

# left frame and its contents
leftFrame = Frame(root, width=300, height=400, bg="#011C38")
leftFrame.grid(row=0, column=0, padx=10, pady=2)

label = Label(leftFrame, text="Unesite Vaš tekst ovdje.", bg="#011C38",
              fg="white", font=("Candara", 14))
label.grid(row=0, column=0, padx=10, pady=2)

# creating text area
text_ta = Text(leftFrame, height=25, width=45, wrap=WORD)
text_ta.grid()
# right frame and its contents
rightFrame = Frame(root, width=300, height=400, bg="#011C38")
rightFrame.grid(row=0, column=1, padx=10, pady=2)

label1 = Label(rightFrame, text="Tražena riječ:", bg="#011C38",
               fg="white", font=("Candara", 14))
label1.grid(row=0, column=0, padx=10, pady=2)

# creating input field
word_ipf = Text(rightFrame, height=2, width=23)
word_ipf.grid()


def clear_previous_search() -> None:
    """
    Clears any text styling left by previous search. This enables multiple
    searches on one text. Loops through all applied tags and deletes them.
    """
    for tag in text_ta.tag_names():
        text_ta.tag_delete(tag)


def highlight(start, end) -> None:
    """
    Wrapper function for highlighting text between two specified indices.
    Adds formatted tag to test area.

    Args:
        start: Index of the first char of the search word.
        end: Index of the last char of the search word.
    """
    text_ta.tag_configure('highlight', background='#FFFF00')

    text_ta.tag_add('highlight',
                    '1.0 + {} chars'.format(start),
                    '1.0 + {} chars'.format(end + 1))


def search() -> None:
    """
    Fetches data form text area and input field. Constructs anonymous
    Automaton, then uses its result indices to highliht that pard of the text.
    """
    clear_previous_search()

    text = text_ta.get('1.0', 'end').strip()
    search_word = word_ipf.get('1.0', 'end').strip()

    match_indices = Automaton().search_for_word(search_word, text)
    for start, end in match_indices:
        highlight(start, end)


searchButton = Button(rightFrame, text="Pretraži", fg="white", bg="#5F9EA0",
                      command=search)
searchButton['font'] = ('Candara', 13)
searchButton.grid(row=2, column=0, padx=10, pady=5)

root.mainloop()
