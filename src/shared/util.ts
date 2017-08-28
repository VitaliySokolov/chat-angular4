export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  ).replace(/\s+/g, '');
}

export function pascalize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, letter => letter.toUpperCase())
    .replace(/\s+/g, '');
}

export function array2object(array: any[], key: any) {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
}
