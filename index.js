const yargs = require("yargs");
const pkg = require("./package.json");
const { addNode, removeNode, printNotes } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNode(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    console.log("Here is the list of notes:");
    const notes = await printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  handler({id}) {
    removeNode(id)
  },
});

yargs.parse();
