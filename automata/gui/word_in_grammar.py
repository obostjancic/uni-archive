from tkinter import Tk, Frame, Label, Text, WORD, Button

from grammar import Grammar

root = Tk()
root.wm_title("Pripadnost gramatici")
root.geometry("620x450")
root.config(background="#011C38")

# left frame and its contents
leftFrame = Frame(root, width=300, height=400, bg="#011C38")
leftFrame.grid(row=0, column=0, padx=10, pady=2)

label = Label(leftFrame, text="Unesite Vašu gramatiku ovdje.", bg="#011C38",
              fg="white", font=("Candara", 14))
label.grid(row=0, column=0, padx=10, pady=2)

# creating text area
text_ta = Text(leftFrame, height=25, width=45, wrap=WORD)
text_ta.grid()
# right frame and its contents
rightFrame = Frame(root, width=350, height=400, bg="#011C38")
rightFrame.grid(row=0, column=1, padx=10, pady=2)

label1 = Label(rightFrame, text="Tražena riječ:", bg="#011C38",
               fg="white", font=("Candara", 14))
label1.grid(row=0, column=0, padx=10, pady=2)

word_ipf = Text(rightFrame, height=2, width=23)
word_ipf.grid()

label2 = Label(rightFrame, text="Rezultat:", bg="#011C38",
               fg="white", font=("Candara", 14))
label2.grid(row=20, column=0, padx=10, pady=2)

# creating input field
word_ipf_result = Text(rightFrame, height=2, width=34)
word_ipf_result.grid()


def clear_previous_search() -> None:
    """
    Clears any text styling left by previous search. This enables multiple
    searches on one text. Loops through all applied tags and deletes them.
    """
    for tag in text_ta.tag_names():
        text_ta.tag_delete(tag)

    word_ipf_result.delete('1.0', 'end')


def search() -> None:
    """
    Fetches data form text area and input field.
    Checks if grammar contains word from input field.
    """
    clear_previous_search()

    rules = text_ta.get('1.0', 'end').strip()
    search_word = word_ipf.get('1.0', 'end').strip()

    grammar = Grammar(rules)
    result = grammar.contains(search_word)

    if result:
        word_ipf_result.insert('1.0','Gramatika sadrži unesenu riječ.')
    else:
        word_ipf_result.insert('1.0', 'Gramatika ne sadrži unesenu riječ.')
        

searchButton = Button(rightFrame, text="Provjeri", fg="white", bg="#5F9EA0",
                      command=search)
searchButton['font'] = ('Candara', 13)
searchButton.grid(row=2, column=0, padx=10, pady=5)

root.mainloop()