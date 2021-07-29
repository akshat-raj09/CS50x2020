-- to list the titles of all movies in which both Johnny Depp and Helena Bonham Carter starred
SELECT movies.title FROM movies JOIN stars
ON movies.id = stars.movie_id JOIN people
ON stars.person_id = people.id
WHERE people.name = "Johnny Depp" AND movies.title IN (
SELECT movies.title FROM movies JOIN stars
ON movies.id = stars.movie_id JOIN people
ON stars.person_id = people.id
WHERE people.name = "Helena Bonham Carter");

-- Another way of doing it: get results from both queries individually & do intersection of the resulted queries
-- SELECT movies.title FROM movies JOIN stars
-- ON movies.id = stars.movie_id JOIN people
-- ON stars.person_id = people.id
-- WHERE people.name = "Johnny Depp"
-- INTERSECT
-- SELECT movies.title FROM movies JOIN stars
-- ON movies.id = stars.movie_id JOIN people
-- ON stars.person_id = people.id
-- WHERE people.name = "Helena Bonham Carter";