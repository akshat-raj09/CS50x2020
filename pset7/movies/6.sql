-- to determine the average rating of all movies released in 2012
SELECT AVG(rating) FROM ratings
JOIN movies ON ratings.movie_id = movies.id
WHERE movies.year = 2012;
-- Another way of doing it through nested queries
-- SELECT AVG(rating) FROM ratings WHERE movie_id IN (SELECT id FROM movies WHERE year = 2012);