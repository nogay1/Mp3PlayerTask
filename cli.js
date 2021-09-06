const player = require('./index');

const parseCommand = () => {
  try {
    const [command, ...args] = process.argv.slice(2);
    if (!commands[command]) throw new Error('bad command');
    const { help, action } = commands[command];
    action(...args);
  } catch (err) {
    if (err.message === 'bad command') console.log('For help write: cli help');
    else console.log(err.message);
  }
};

const helpFunction = (arg) => {
  if (!arg) {
    console.log(
      `The commands are: play, romove, add, playP, removeP, addP, search, searchD, list, listP \nFor specific command info type: cli help [command]`
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
    help: 'play [song ID]',
    action: (arg) => {
      player.playSong(parseInt(arg));
    },
  },
  help: {
    help: 'what',
    action: helpFunction,
  },
};

parseCommand();
