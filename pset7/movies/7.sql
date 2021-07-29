-- to list all movies released in 2010 and their ratings, in descending order by rating. For movies with the same rating, order them alphabetically by title
SELECT movies.title, ratings.rating FROM movies JOIN ratings
ON movies.id = ratings.movie_id
WHERE year = 2010
ORDER BY ratings.rating DESC, movies.title;
-- Another way of doing it
-- SELECT movies.title, ratings.rating FROM movies, ratings WHERE movies.id = ratings.movie_id AND movies.year = 2010 ORDER BY ratings.rating DESC, movies.title;