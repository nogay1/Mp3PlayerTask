const player = require('./index');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'PLAYER>',
});
console.log("Welcome to the Player CLI, for help type 'help'");

readInterface.prompt();

readInterface
  .on('line', (line) => {
    const [command, ...args] = line.split(' ');
    try {
      if (!commands[command]) throw new Error('bad command');
      const { action } = commands[command];
      action(...args);
    } catch (err) {
      if (err.message === 'bad command') console.log('For help type: help');
      else console.log(err.message);
    }
    readInterface.prompt();
  })
  .on('close', () => {
    console.log('Thank you for using player');
    process.exit(0);
  });

const helpFunction = (arg) => {
  if (!arg) {
    console.log(
      `The commands are: play, remove, add, playP, removeP, addP, editP, search, searchD, list, listP, exit \nFor specific command info type: help [command]`
    );
  } else {
    if (!commands[arg]) throw new Error(`No such command: ${arg}`);
    console.log(commands[arg].help);
  }
};

const commands = {
  play: {
    help: `
    Plays a song by its id.
    Format: play [song ID]
    `,
    action: (arg) => {
      player.playSong(parseInt(arg));
    },
  },
  remove: {
    help: `
    Removes a song by its id.
    Format: remove [song ID]
    `,
    action: (arg) => {
      player.removeSong(parseInt(arg));
      console.log(`Removed song with id: ${arg}`);
    },
  },
  add: {
    help: `
    Adds a new song
    Format: add [title] [artist] [album] [duration | mm:ss]
    `,
    action: (...args) => {
      player.addSong(...args);
      console.log('Added song');
    },
  },
  playP: {
    help: `
    Plays a playlist by its id.
    Format: playP [playlist ID]
    `,
    action: (arg) => {
      player.playPlaylist(parseInt(arg));
    },
  },
  removeP: {
    help: `
    Removes a playlist by its id.
    Format: removeP [playlist ID]
    `,
    action: (arg) => {
      player.removePlaylist(parseInt(arg));
      console.log(`Removed playlist with id: ${arg}`);
    },
  },
  addP: {
    help: `
    Adds a new empty playlist
    Format: addP [name]
    `,
    action: (...args) => {
      player.createPlaylist(...args);
      console.log('Added playlist');
    },
  },
  editP: {
    help: `
    Edit a playlist, if the song alredy exists removes it otherwise adds it.
    If the song removed is the last song of the playlist the entire playlist is removed.
    Format: editP [playlist ID] [song ID]
    `,
    action: (...args) => {
      if (!args || args.length < 2) throw new Error('Must provide 2 IDs');
      player.editPlaylist(parseInt(args[0]), parseInt(args[1]));
      console.log(`Edited playlist with ID: ${args[0]}`);
    },
  },
  search: {
    help: `
    Search a song/playlist with a query
    Format: search [query] [only songs/playlist: s | p]
    `,
    action: (...args) => {
      if (!args[0]) throw new Error('Must provide a query');
      const results = player.searchByQuery(args[0]);
      results.songs.forEach(({ id }) => {
        player.printSong(id);
      });
      results.playlists.forEach(({ id }) => {
        player.printPlaylist(id);
      });
    },
  },
  searchD: {
    help: `
    Search a song/playlist by duration, returns a single result.
    Format: searchD [duration mm:ss]
    `,
    action: (arg) => {
      const result = player.searchByDuration(arg);
      if (result.hasOwnProperty('album')) player.printSong(result.id);
      else player.printPlaylist(result.id);
    },
  },
  list: {
    help: `
    List all songs in the player.
    Format: list
    `,
    action: player.listSongs,
  },
  listP: {
    help: `
    List all playlists in the player.
    Format: listP
    `,
    action: player.listPlaylists,
  },
  help: {
    help: 'what',
    action: helpFunction,
  },
  exit: {
    help: 'Exits the cli',
    action: () => {
      process.exit(0);
    },
  },
};
