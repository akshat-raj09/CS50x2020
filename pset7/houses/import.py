from sys import exit, argv
from cs50 import SQL
import csv

# check for valadity of command line arguments
if len(argv) != 2:
    print("usage: import.py characters.csv")
    exit(1)
name = []

# initiate connection with database students.db
db = SQL("sqlite:///students.db")

# open the csv file provided at commandline
with open(argv[1], "r") as file:
    reader = csv.DictReader(file)

    # iterate for each row in csv file
    for row in reader:
        name = row["name"].split()
        house = row["house"]
        birth = row["birth"]

        # insert data read from csv file into students table inside students.db
        if len(name) == 2:
            db.execute("INSERT INTO students (first, middle, last, house, birth) values (?, ?, ?, ?, ?)",
                       name[0], None, name[1], house, birth)
        if len(name) == 3:
            db.execute("INSERT INTO students (first, middle, last, house, birth) values (?, ?, ?, ?, ?)",
                       name[0], name[1], name[2], house, birth)

exit(0)