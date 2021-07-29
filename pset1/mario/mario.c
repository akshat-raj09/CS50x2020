#include <stdio.h>
#include <cs50.h>

int main(void)
{
    int n = 0;  // declare a variable n
    // get value of Height from user between 1 to 8
    do
    {
        n = get_int("Height : ");
    }
    while (n < 1 || n > 8);

    //Print pyramid
    for (int i = 1; i <= n; i++)
    {
        for (int j = n - i; j >= 1; j--)
        {
            printf(" ");
        }
        for (int k = 1; k <= i; k++)
        {
            printf("#");
        }
        printf("\n");
    }

    return 0;
}