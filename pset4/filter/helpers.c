#include "helpers.h"
#include <math.h>
#include <cs50.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    int avg = 0;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            avg = round((image[i][j].rgbtRed + image[i][j].rgbtGreen + image[i][j].rgbtBlue) / 3.0f);
            image[i][j].rgbtRed = avg;
            image[i][j].rgbtGreen = avg;
            image[i][j].rgbtBlue = avg;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    int sred = 0, sgreen = 0, sblue = 0;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // apply the formula given in problem
            sred = round(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue);
            // check for invalid value of red (i.e. > 255)
            if (sred > 255)
            {
                sred = 255;
            }
            sgreen = round(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue);
            // check for invalid value of green (i.e. > 255)
            if (sgreen > 255)
            {
                sgreen = 255;
            }
            sblue = round(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue);
            // check for invalid value of blue (i.e. > 255)
            if (sblue > 255)
            {
                sblue = 255;
            }
            image[i][j].rgbtRed = sred;
            image[i][j].rgbtGreen = sgreen;
            image[i][j].rgbtBlue = sblue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int tempR = 0, tempG = 0, tempB = 0;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width / 2; j++)
        {
            //swap [i][j] with [i][width - 1 - j]
            tempR = image[i][j].rgbtRed;
            image[i][j].rgbtRed = image[i][width - 1 - j].rgbtRed;
            image[i][width - 1 - j].rgbtRed = tempR;

            tempG = image[i][j].rgbtGreen;
            image[i][j].rgbtGreen = image[i][width - 1 - j].rgbtGreen;
            image[i][width - 1 - j].rgbtGreen = tempG;

            tempB = image[i][j].rgbtBlue;
            image[i][j].rgbtBlue = image[i][width - 1 - j].rgbtBlue;
            image[i][width - 1 - j].rgbtBlue = tempB;
        }
    }
    return;
}

// function to check valid pixel value
bool valid(int new_i, int new_j, int height, int width)
{
    return (new_i >= 0 && new_i < height && new_j >= 0 && new_j < width);
}

// function to blur the pixel
RGBTRIPLE get_blur(int i, int j, int height, int width, RGBTRIPLE image[height][width])
{
    // declare new object of struct RGBTRIPLE
    RGBTRIPLE blur;
    int new_i = 0, new_j = 0, R = 0, G = 0, B = 0, count =  0;
    for (int di = -1; di <= 1; di++)
    {
        for (int dj = -1; dj <= 1; dj++)
        {
            // find adjacent values of current pixel
            new_i = i + di;
            new_j = j + dj;
            if (valid(new_i, new_j, height, width))
            {
                count++;
                R = R + image[new_i][new_j].rgbtRed;
                G = G + image[new_i][new_j].rgbtGreen;
                B = B + image[new_i][new_j].rgbtBlue;
            }
        }
    }
    // find average value of red green blue of all adjacent pixels
    blur.rgbtRed = round((float) R / count);
    blur.rgbtGreen = round((float) G / count);
    blur.rgbtBlue = round((float) B / count);
    return blur;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE new_img[height][width];
    int avgR = 0, avgG = 0, avgB = 0;
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            new_img[i][j] = get_blur(i, j, height, width, image);
        }
    }
    // copy the new_img (blurred) to original image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j] = new_img[i][j];
        }
    }
    return;
}