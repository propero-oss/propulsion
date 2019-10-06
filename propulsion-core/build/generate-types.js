const fs = require("fs");


function generateTupleTypes() {
  const count = 10;
  const filename = "./src/types/tuple/_generated.ts";
  const content = tupleTypes(count);
  fs.writeFileSync(filename, content);
}




function tupleTypes(count) {
  return [
    tupleType(count),
    tuplePushType(count),
    tuplePopType(count),
    tupleShiftType(count),
    tupleUnshiftType(count)
  ].join("\n") + "\n";
}


function prefix(s) {
  return (i) => `${s}${i}`;
}

function add(n) {
  return (i) => i + n;
}

function times(count) {
  return {
    map(fn) {
      const r = [];
      for (let i = 0; i < count; ++i)
        r.push(fn(i));
      return r;
    }
  };
}

const T = prefix("T");
const inferT = prefix("infer T");



function tupleType(count) {
  return "export type TupleType<T> = T extends ["
    + times(count).map(inferT).join(",")
    + "]?["
    + times(count).map(T).join(",")
    + "]:T;";
}

function tupleShiftType(count) {
  return "export type TupleShiftType<T> = T extends ["
    + times(count).map(inferT).join(",")
    + "]?["
    + times(count-1).map(add(1)).map(T).join(",")
    + "]:T;";
}

function tupleUnshiftType(count) {
  return "export type TupleUnshiftType<T, E> = T extends ["
    + times(count).map(inferT).join(",")
    + "]?[E,"
    + times(count).map(T).join(",")
    + "]:T;"
}

function tuplePushType(count) {
  return "export type TuplePushType<T, E> = "
    + times(count).map(
      i => "T extends ["
        + times(i).map(inferT).join(",")
        + "]?["
        + times(i).map(T).concat("E").join(",")
        + "]"
      ).join(":")
    + ":T;";
}

function tuplePopType(count) {
  return "export type TuplePopType<T> = "
    + times(count + 1).map(
      (i) => "T extends ["
        + times(++i).map(inferT).join(",")
        + "]?["
        + times(i - 1).map(T).join(",")
        + "]"
      ).join(":")
    + ":T;"
}


generateTupleTypes();
