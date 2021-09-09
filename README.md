# MP3 Player - [Second Weekend Assignment](./original_task.md)

An interactive CLI, to control songs and playlists state object.

### [View Online](https://replit.com/@noamgolani/Mp3PlayerTask?v=1) Version using replit.

### To run locally

      git clone https://github.com/noamgolani/Mp3PlayerTask.git

      cd Mp3PlayerTask

      npm start

### For the tests

      npm install

      npm run test

## About the project

The Mp3 project is composed out of 2 primary files, `index.js` and `cli.js`.

### The API - [index.js](./index.js)

Handles the `player` object containing `songs` and `playlists` arrays.
The implemented functions:

- play/remove/add Song.
- play/create/remove Playlist.
- editPlaylist - removes/adds a song depends on the playlist (if it already has it - removes)
- playlistDuration - calculates the total duration of all songs.
- searchByQuery - searches for all string attributes containing the query string, also playlists.
- searchByDuration - closest song/playlist to duration.
- print song/playlist
- list songs/playlists

### CLI client - [cli.js](./cli.js)

Uses the `player API` and node `Readline` module to build a simple CLI to manage the player state.
The functions available in the CLI are: play, remove, add, playP, removeP, addP, editP, search, searchD, list, listP, exit, help.

## [Original Assignment](./original_task.md)
