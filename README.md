# MP3 Player - [Second Weekend Assignment](./original_task.md)

An interactive cli, to control a songs and playlists state object.

## About the project

The Mp3 project, is composed out of 2 primary files. The `index.js` and `cli.js`.

### The API - [index.js](./index.js)

handles the `player` object containing a `songs` array and `playlists` array.
The implemented functions:

- play/remove/add Song.
- play/create/remove Playlist.
- editPlaylist - removes/adds a song depends on the playlist (if it already has it - removes)
- playlistDuration - calculates the total duration of all songs.
- searchByQuery - searches for all strign atributes containing the query string, also playlists.
- searchByDuration - closest song/playlist to duration.
- print song/playlist
- list songs/playlists

### CLI client - [cli.js](./cli.js)

Uses the `player API` and node `readline` to build a simple CLI to manage the playler state.
The functions eveliable in the cli are: play, remove, add, playP, removeP, addP, editP, search, searchD, list, listP, exit, help.

## [Original Assignment](./original_task.md)
