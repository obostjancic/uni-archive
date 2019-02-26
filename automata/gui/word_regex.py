from tkinter import Tk, Frame, Label, Text, Button

from nfa import NFA

root = Tk()
root.wm_title("Regularni izraz")
root.geometry("600x200")
root.config(background="#011C38")

# left frame and its contents
leftFrame = Frame(root, width=300, height=450, bg="#011C38")
leftFrame.grid(row=0, column=0, padx=10, pady=2)

label = Label(leftFrame, text="Unesite regularni izraz.", bg="#011C38",
              fg="white", font=("Candara", 14))
label.grid(row=1, column=0, padx=10, pady=(20, 2))

# creating regex input field
regex_ipf = Text(leftFrame, height=2, width=35)
regex_ipf.grid(row=2, column=0, padx=10, pady=(2, 32))


# right frame and its contents
rightFrame = Frame(root, width=300, height=450, bg="#011C38")
rightFrame.grid(row=0, column=1, padx=10, pady=2)


label1 = Label(rightFrame, text="Tražena riječ:", bg="#011C38",
               fg="white", font=("Candara", 14))
label1.grid(row=1, column=0, padx=10, pady=(20, 2))

# creating input field
word_ipf = Text(rightFrame, height=2, width=35)
word_ipf.grid(row=2, column=0, padx=10, pady=2)


label1 = Label(rightFrame, text="Rezultat:", bg="#011C38",
               fg="white", font=("Candara", 14))
label1.grid(row=3, column=0, padx=10, pady=2)

result_ipf = Text(rightFrame, height=2, width=35)
result_ipf.grid(row=4, column=0, padx=10, pady=2)


def clear_previous_search() -> None:
    """
    Clears any text styling left by previous search. This enables multiple
    searches on one text. Loops through all applied tags and deletes them.
    """
    for tag in word_ipf.tag_names():
        word_ipf.tag_delete(tag)

    result_ipf.delete('1.0', 'end')


def word_in_regex_language() -> None:
    """
    Fetches data form text area and input field.
    Checks if grammar contains word from input field.
    """
    clear_previous_search()

    regex = regex_ipf.get('1.0', 'end').strip()
    word = word_ipf.get('1.0', 'end').strip()

    nfa = NFA(regex)
    recognizes = nfa.recognizes(word)

    if recognizes:
        result_ipf.insert('1.0', 'Riječ pripada regularnom izrazu.')
    else:
        result_ipf.insert('1.0', 'Riječ ne pripada regularnom izrazu.')


search_button = Button(leftFrame, text="Provjeri", fg="white", bg="#5F9EA0",
                       command=word_in_regex_language)
search_button['font'] = ('Candara', 13)
search_button.grid(row=3, column=0, padx=10, pady=2)

root.mainloop()
