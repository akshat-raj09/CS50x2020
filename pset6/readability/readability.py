from cs50 import get_string

# variable declaration
grade = 0
l = 0
s = 0
words = 0
letter = 0
word_count = 0
sentence = 0

# get text from user
text = get_string("Text: ")

# loop for each character in text & count number of letters , words & sentences
for i in text:
    if not i.isalnum():
        letter = letter + 1
    if i == " ":
        word_count = word_count + 1
    if i == "." or i == "!" or i == "?":
        sentence = sentence + 1
words = word_count + 1
letter = len(text) - letter

# apply the values of letters, words & sentences to get valaue of l & s
l = (letter / words) * 100
s = (sentence / words) * 100

# apply values in Coleman-Liau index formula
grade = round(0.0588 * l - 0.296 * s - 15.8, 0)
if grade >= 16:
    print("Grade 16+")
elif grade < 1:
    print("Before Grade 1")
else:
    print("Grade ", int(grade))