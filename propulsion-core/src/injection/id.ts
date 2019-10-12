
const ID_MAP = new WeakMap<any, symbol>();


export function getId(object: any): symbol {
  return ID_MAP.get(object) || createId(object);
}

function createId(object: any) {
  const id = Symbol(typeof object === "function" && object.name || JSON.stringify(object));
  ID_MAP.set(object, id);
  return id;
}
