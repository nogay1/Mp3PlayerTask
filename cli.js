const player = require('./index');

const parseCommand = () => {
  try {
    const [command, ...args] = process.argv.slice(2);
    if (!commands[command]) throw new Error('bad command');
    const { action } = commands[command];
    action(...args);
  } catch (err) {
    if (err.message === 'bad command') console.log('For help write: cli help');
    else console.log(err.message);
  }
};

const helpFunction = (arg) => {
  if (!arg) {
    console.log(
      `The commands are: play, romove, add, playP, removeP, addP,editP, search, searchD, list, listP \nFor specific command info type: cli help [command]`
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
  help: {
    help: 'what',
    action: helpFunction,
  },
};

parseCommand();
