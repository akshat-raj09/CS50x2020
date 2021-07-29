# import get_float function from cs50
from cs50 import get_float

# get non negative value of dollars from user
dollars = get_float("Change Owed : ")
while True:
    if dollars < 0:
        dollars = get_float("Change Owed : ")
    else:
        break

# compute the minimum no. of change required
cents = round(dollars * 100, 2)
change = int(cents / 25)
cents = int(cents % 25)
change = change + int(cents / 10)
cents = int(cents % 10)
change = change + int(cents / 5)
cents = int(cents % 5)
change = change + cents
print(change)