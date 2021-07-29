#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{
    // variable declaration & initialisation
    int change = 0, cents = 0;
    float dollars = 0.0;
    // get non negative value of dollars from user
    do
    {
        dollars = get_float("Change Owed : ");
    }
    while (dollars < 0);

    // compute the minimum no. of change required
    cents = round(dollars * 100);
    change = (cents / 25);
    cents = cents % 25;
    change = change + (cents / 10);
    cents = cents % 10;
    change = change + (cents / 5);
    cents = cents % 5;
    change = change + cents;
    printf("%i\n", change);

    return 0;

}