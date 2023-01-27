#!/usr/bin/env node
const fs = require('fs');

const filename = process.argv[2];
if (!filename || ['--help', '-h'].includes(filename)) {
  console.error('Usage: convert.js <filename>');
  process.exit(1);
}

const json = JSON.parse(fs.readFileSync(filename, 'utf8'));

const converted = {
  todoLists: json.todos.map((todo) => ({
    name: todo.title,
    items: todo.items.map((item) => ({
      content: item.description,
      done: item.done,
    })),
  })),
};

console.log(JSON.stringify(converted, null, 2));
