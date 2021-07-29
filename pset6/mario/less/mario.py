from cs50 import get_int

height = get_int("Height: ")
# check that if value of height entered is from 1 to 8
while True:
    if height < 1 or height > 8:
        height = get_int("Height: ")
    else:
        break

# prints a pyramid of given height
for i in range(1, height + 1):
    print(" " * (height - i), end="")
    print("#" * (i))
