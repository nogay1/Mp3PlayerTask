const player = require('./data');

player.playSong = (songId) => {
  const resultSong = getSongById(songId);
  if (!resultSong) throw new Error('Bad ID');

  const { title, album, artist, duration } = resultSong;

  console.log(
    `Playing ${title} from ${album} by ${artist} | ${formatDuration(duration)}.`
  );
};

const playSong = player.playSong;

function removeSong(id) {
  if (!getSongById(id)) throw new Error('Bad ID');

  player.songs = player.songs.filter((song) => song.id !== id);
  player.playlists.forEach((playlist) => {
    playlist.songs = playlist.songs.filter((songId) => songId !== id);
  });
}

function addSong(title, album, artist, duration, id) {
  if (getSongById(id)) throw new Error('Bad ID');
  if (!id) id = player.generateSongsId();

  if (!title || !album || !artist || !duration)
    throw new Error('Must provide all args');

  duration = durationToSeconds(duration);
  if (!duration || typeof duration !== 'number')
    throw new Error(
      'Failed parsing the duration, please provide in mm:ss format'
    );

  player.songs.push({ title, album, artist, duration, id });
  return id;
}

function removePlaylist(playlistId) {
  if (!getPlaylistById(playlistId)) throw new Error('Bad ID');
  player.playlists = player.playlists.filter(({ id }) => id !== playlistId);
}

function createPlaylist(name, id) {
  if (getPlaylistById(id)) throw new Error('Bad ID');
  if (!id) id = player.generateSongsId();

  if (!name) throw new Error('Must provide name');

  player.playlists.push({ name, id, songs: [] });
  return id;
}

function playPlaylist(id) {
  const playlist = getPlaylistById(id);
  if (!playlist) throw new Error('Bad ID');

  playlist.songs.forEach((song) => {
    playSong(song);
  });
}

function editPlaylist(playlistId, songId) {
  const { playlists } = player;
  playlistId = playlists.findIndex(({ id }) => id === playlistId);
  if (playlistId < 0) throw new Error('Bad playlist ID');
  if (!getSongById(songId)) throw new Error('Bad song ID');

  const indexInPlaylist = playlists[playlistId].songs.indexOf(songId);
  if (indexInPlaylist < 0) playlists[playlistId].songs.push(songId);
  else playlists[playlistId].songs.splice(indexInPlaylist, 1);

  if (playlists[playlistId].songs.length === 0)
    removePlaylist(playlists[playlistId].id);
}

function playlistDuration(id) {
  const playlist = getPlaylistById(id);
  if (!playlist) throw new Error('Bad ID');

  return playlist.songs.reduce(
    (sum, songId) => sum + getSongById(songId).duration,
    0
  );
}

function searchByQuery(query) {
  return {
    songs: getSongByQuery(query).sort((a, b) => a.title.localeCompare(b.title)),
    playlists: getPlaylistByQuery(query).sort((a, b) =>
      a.title.localeCompare(b.title)
    ),
  };
}

function searchByDuration(duration) {
  const seconds = durationToSeconds(duration);
  const best = { time: seconds, obj: null };
  player.playlists.forEach(({ id }) => {
    if (Math.abs(seconds - playlistDuration(id)) < best.time) {
      best.time = Math.abs(playlistDuration(id) - seconds);
      best.obj = getPlaylistById(id);
    }
  });
  player.songs.forEach((song) => {
    if (Math.abs(seconds - song.duration) < best.time) {
      best.time = Math.abs(song.duration - seconds);
      best.obj = song;
    }
  });
  return best.obj;
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
};

const getSongById = (songId) => player.songs.find(({ id }) => id === songId);
const getSongByQuery = (query) =>
  player.songs.filter(
    ({ title, album, artist }) =>
      title.toUpperCase().includes(query.toUpperCase()) ||
      album.toUpperCase().includes(query.toUpperCase()) ||
      artist.toUpperCase().includes(query.toUpperCase())
  );

const getPlaylistById = (playlistId) =>
  player.playlists.find(({ id }) => id === playlistId);
const getPlaylistByQuery = (query) =>
  player.playlists.filter(({ name }) =>
    name.toUpperCase().includes(query.toUpperCase())
  );

const formatDuration = (duration) =>
  ('00' + Math.floor(parseInt(duration) / 60)).slice(-2) +
  ':' +
  ('00' + (parseInt(duration) % 60)).slice(-2);

const durationToSeconds = (duration, [min, sec] = duration.split(':')) =>
  parseInt(min) * 60 + parseInt(sec);
