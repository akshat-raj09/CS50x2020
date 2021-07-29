#include <stdio.h>
#include <cs50.h>
#include <string.h>
#include <math.h>
#include <ctype.h>

// function declaration
int count_letters(string s);
int count_words(string s);
int count_sentences(string s);

int main(void)
{
    // variable declaration & initialisation
    float letters = 0, words = 0, sentences = 0, l = 0, s = 0;
    int index = 0;
    // get input from user
    string text = get_string("Text: ");

    // count letters, words, sentences in the given input
    letters = count_letters(text);
    words = count_words(text);
    sentences = count_sentences(text);
    l = (letters / words) * 100;
    s = (sentences / words) * 100;

    // apply values in Coleman-Liau index formula
    index = (int)round(0.0588 * l - 0.296 * s - 15.8);
    if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %i\n", index);
    }

    return 0;
}

// function to count number of letters in a given string
int count_letters(string s)
{
    int count = 0, l = strlen(s);
    for (int i = 0; i < l; i++)
    {
        if (isalnum(s[i]))
        {
            count++;
        }
    }
    return (count);
}

// function to count number of words in a given string
int count_words(string s)
{
    int count = 0, l = strlen(s);
    for (int i = 0; i < l; i++)
    {
        if (s[i] == ' ')
        {
            count++;
        }
    }
    return (count + 1);
}

// function to count number of sentences in a given string
int count_sentences(string s)
{
    int count = 0, l = strlen(s);
    for (int i = 0; i < l; i++)
    {
        if (s[i] == '.' || s[i] == '?' || s[i] == '!')
        {
            count++;
        }
    }
    return (count);
}