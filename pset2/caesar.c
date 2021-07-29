// necessary header files declared
#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

// main function starts
int main(int argc, string argv[])
{
    //variable declaration
    int count = 0;
    int key = 0, txt_len = 0;
    string text;

    // check if no additional command line arguments are passed
    if (argc <= 1)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // check if more than two command line arguments are passed
    else if (argc > 2)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // else if exactly 2 command line arguments are passed then proceed
    else
    {
        int n = strlen(argv[1]), k[n], p = n;
        for (int i = 0; i < n; i++)
        {
            if (isdigit(argv[1][i]))
            {
                count++;
            }
        }
        if (count == n)
        {
            printf("");
        }
        else
        {
            printf("Usage: ./caesar key\n");
            return 1;
        }

        // convert key(string) passed as command line argument to key(int)
        for (int i = 0; i < n; i++)
        {
            k[i] = ((int) argv[1][i]) - 48;
            key = key + k[i] * pow(10, p - 1);
            p--;
        }
        key = key % 26;

        // get message to be encrypted
        text = get_string("plaintext: ");
        txt_len = strlen(text);
        char cipher[txt_len];

        // apply caesar cipher based on the provided key
        for (int i = 0; i < txt_len; i++)
        {
            if (isalpha(text[i]))
            {
                if (isupper(text[i]))
                {
                    cipher[i] = (char)((int) text[i] + key);
                    if (!isupper(cipher[i]))
                    {
                        cipher[i] = (char)((int)cipher[i] - 26);
                    }
                }
                if (islower(text[i]))
                {
                    cipher[i] = (char)((int) text[i] + key);
                    if (!islower(cipher[i]))
                    {
                        cipher[i] = (char)((int)cipher[i] - 26);
                    }
                }
            }
            else
            {
                cipher[i] = text[i];
            }
        }

        // print the encrypted text
        printf("ciphertext: ");
        for (int i = 0; i < txt_len; i++)
        {
            printf("%c", cipher[i]);
        }
        printf("\n");
        return 0;
    }
}