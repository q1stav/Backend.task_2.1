const fs = require("fs/promises");
const path = require("path");
const chalk=require('chalk')

const notesPath = path.join(__dirname, "db.json");

async function addNode(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  notes.forEach((note) => {
    console.log(note.id, "  ", note.title);
  });
}

async function removeNode(requiredIndex) {
    const notes = await getNotes();
    let num=notes.findIndex((note,index)=>note.id==requiredIndex)
    num===-1 ? console.log(chalk.red('id not found')):notes.splice(num,1)
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNode,
  printNotes,
  removeNode,
};
