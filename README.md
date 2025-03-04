# Game Library API

## Overview
This repo is the backend server for a library management concept app for use by a board game cafe. It serves two front ends, and handles CRUD operations for games, tags (searchable catagories), and users

Public Frontend Repo: https://github.com/JakeBrowning90/game-library-public
Private Frontend Repo: https://github.com/JakeBrowning90/game-library-private

In addition to CRUD operations, the server also handles user authentication by issuing JSON web tokens to users when they login, and checking the validity of tokens when users attempt to perform any actions besides "reading" data. 

## Technologies
Node.js, Express, Prisma ORM, Passport.js, jsonwebtoken

## Challenges/To-dos
Validation bugfixes: I've still run into occasional errors when submitting new objects from the front end, but haven't been able to pin down the cause or consistently recreate the issues. This may be an issue with connection to the database on Neon, but will require more extensive testing.

Query efficiency: "read_game_many" and "read_game_circ" both use overly-long conditional findMany statements. This is because of issues where prisma is unable to return the query if missing arguments for player count or tags despite knowing to skip queries for title or weight if they are empty strings. I tried following the Prisma docs and using "Prisma.skip" but it failed to work as expected. I think there must be a more efficient way to query the DB and not have issues if a certain filter is not used for a given query. 

-Future features: fetch box art, get info from Board Game Geek, link to similar games on Game Detail page.

## How to use
Please check the front end sites to make requests to this server.

## Credits
TBA - Thanks to friends for feedback on design and potential future features.
