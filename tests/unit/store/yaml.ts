export const doneIsNull = `\
list:
  done: ~
  to do: []`;

export const toDoIsNull = `\
list:
  done: []
  to do: ~`;

export const doneNotString = `\
list:
  done:
    - abc
    - ~
  to do: []`;

export const toDoNotString = `\
list:
  done: []
  to do:
    - abc
    - ~`;

export const valid = `\
foo:
  done:
    - a
    - b
  to do:
    - c
bar:
  done: []
  to do:
    - d`;
