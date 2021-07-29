#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint8_t BYTE;
const int SIZE = 512;

int main(int argc, char *argv[])
{
    // check if user has not typed the filename as commandline arguments
    if (argc != 2)
    {
        printf("Usage: recover [forensic-image]\n");
        return 1;
    }

    // open the filename provoded by the user at commandline
    FILE *card = fopen(argv[1], "r");

    // check if the card pointer is pointing to NULL
    if (card == NULL)
    {
        printf("File cannot be opened\n");
        return 1;
    }

    // create a buffer pointer which points to dynamically allocated memory of size 512*1 bytes
    BYTE *buffer = malloc(sizeof(BYTE) * SIZE);

    // check if the pointer to buffer is pointing to NULL
    if (buffer == NULL)
    {
        printf("Not enough memory for the program to run\n");
        return 1;
    }

    FILE *new_jpeg = NULL;
    int image_number = 0; // initial number of image

    while (fread(buffer, sizeof(BYTE) * SIZE, 1, card))
    {
        // check for JPEG signature - starts with 0xff 0xd8 0xff 0xe[0 to f]
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] >= 0xe0 && buffer[3] <= 0xef))
        {
            // check for previous file
            if (new_jpeg != NULL)
            {
                fclose(new_jpeg);
            }

            // prepare filename of new file
            char filename[8];
            sprintf(filename, "%03i.jpg", image_number);
            image_number += 1;

            // open new file and write jpeg
            new_jpeg = fopen(filename, "w");
            if (new_jpeg == NULL)
            {
                printf("No memory available for recovering images\n");
                return 1;
            }
            fwrite(buffer, sizeof(BYTE) * SIZE, 1, new_jpeg);
        }
        else
        {
            if (new_jpeg == NULL)
            {
                continue;
            }
            // keep writing to the new file
            fwrite(buffer, sizeof(BYTE) * SIZE, 1, new_jpeg);
        }
    }

    if (new_jpeg != NULL)
    {
        fclose(new_jpeg);
    }
    free(buffer);
    fclose(card);

    return 0;
}