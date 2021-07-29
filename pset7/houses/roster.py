from sys import exit, argv
from cs50 import SQL

# check for valadity of command line arguments
if len(argv) != 2:
    print("usage: roster.py slytherin")
    exit(1)

# initiate connection with database students.db
db = SQL("sqlite:///students.db")

# get data from students.db by executing SQL query & store it in rows
rows = db.execute("SELECT first, middle, last, house, birth FROM students WHERE house = ? ORDER BY last", argv[1])

# iterate for each row read from database students.db
for row in rows:
    if row["middle"] == None:
        print(row["first"], row["last"], row["house"], row["birth"])
    else:
        print(row["first"], row["middle"], row["last"], row["house"], row["birth"])

exit(0)
