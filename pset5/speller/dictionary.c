// Implements a dictionary's functionality

#include <stdbool.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <strings.h>
#include <stdio.h>
#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table
const unsigned int N = 26;

// Hash table
node *table[N];
unsigned int total_words = 0;

// Returns true if word is in dictionary else false
bool check(const char *word)
{
    int index = hash(word);
    for (node *cursor = table[index]; cursor != NULL; cursor = cursor -> next)
    {
        if (strcasecmp(cursor -> word, word) == 0)
        {
            return true;
        }
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // http://www.cse.yorku.ca/~oz/hash.html
    unsigned long hash = 5381;
    int c;
    while ((c = tolower(*word++)))
    {
        // << is the left shift operator
        // http://www.fredosaurus.com/notes-cpp/expressions/bitops.html
        hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    }
    return (unsigned int)(hash % N);
}

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    unsigned int index = 0;

    // open the dictionary file
    FILE *file = fopen(dictionary, "r");
    if (file == NULL)
    {
        printf("unable to load dictionary into memory");
        return false;
    }
    char word[LENGTH + 1];
    while (fscanf(file, "%s", word) != EOF)
    {
        // create a new node
        node *n = malloc(sizeof(node));

        // copy the word read from dictionary to newly created node
        strcpy(n -> word, word);
        total_words++;

        // get the index of the word read from dictionary using hash()
        index = hash(word);

        // insert the node to proper index of hash table
        n -> next = table[index];
        table[index] = n;
    }
    fclose(file);
    return true;
}

// Returns number of words in dictionary if loaded else 0 if not yet loaded
unsigned int size(void)
{
    return total_words;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    node *tmp, *cursor;
    for (int i = 0; i <= N; i++)
    {
        cursor = table[i];
        tmp = table[i];
        while (cursor != NULL)
        {
            cursor = cursor -> next;
            free(tmp);
            tmp = cursor;
        }
    }
    return true;
}
