var zhhanging = (function () {
  function chunk(array, size = 1) {
    let result = [];
    for (let i = 0; i < array.length; ) {
      let piece = [];
      for (let j = 0; j < size; j++) {
        if (!array[i]) break;
        piece.push(array[i]);
        i++;
      }
      result.push(piece);
    }
    return result;
  }

  function compact(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i]);
      }
    }
    return result;
  }

  function difference(array, ...values) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let found = false;
      for (let j = 0; j < values.length; j++) {
        if (values[j].includes(item)) {
          found = true;
          break;
        }
      }
      if (!found) result.push(item);
    }
    return result;
  }

  function differenceBy(array, values, iteratee) {
    if (typeof iteratee !== "function") {
      iteratee = property(iteratee);
    }
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let found = false;
      for (let j = 0; j < values.length; j++) {
        if (iteratee(item) === iteratee(values[j])) {
          found = true;
          break;
        }
      }
      if (!found) result.push(item);
    }
    return result;
  }

  function uniq(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (!result.includes(array[i])) {
        result.push(array[i]);
      }
    }
    return result;
  }

  function findProperty(name) {
    return function (object) {
      return object[name];
    };
  }

  function findPropertyDeep(path) {
    let paths = path.split(".");

    return function (object) {
      for (let path of paths) {
        object = object[path];
      }
      return object;
    };
  }

  function property(path) {
    if (path.includes(".")) {
      return findPropertyDeep(path);
    } else {
      return findProperty(path);
    }
  }

  function uniqBy(array, iteratee) {
    let result = [];
    let uniqSet = new Set();
    if (typeof iteratee !== "function") {
      iteratee = findProperty(iteratee);
    }
    for (let i = 0; i < array.length; i++) {
      let uniqVal = iteratee(array[i]);
      if (!uniqSet.has(uniqVal)) {
        uniqSet.add(uniqVal);
        result.push(array[i]);
      }
    }
    return result;
  }

  function flatten(array) {
    return flattenDepth(array, 1);
  }

  function flattenDeep(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result = result.concat(flattenDeep(array[i]));
      } else {
        result.push(array[i]);
      }
    }
    return result;
  }

  function flattenDepth(array, depth = 1) {
    if (depth === 0) return array;
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result = result.concat(flattenDepth(array[i], depth - 1));
      } else {
        result.push(array[i]);
      }
    }
    return result;
  }

  function groupBy(collection, iteratee) {
    if (typeof iteratee !== "function") {
      iteratee = findProperty(iteratee);
    }
    let result = {};
    for (let i = 0; i < collection.length; i++) {
      uniqVal = iteratee(collection[i]);
      if (!(uniqVal in result)) {
        result[uniqVal] = [collection[i]];
      } else {
        result[uniqVal].push(collection[i]);
      }
    }
    return result;
  }

  function keyBy(collection, iteratee) {
    if (typeof iteratee !== "function") {
      iteratee = findProperty(iteratee);
    }
    let result = {};
    if (Array.isArray(collection)) {
      for (item of collection) {
        result[iteratee(item)] = item;
      }
    } else {
      for (key in collection) {
        result[iteratee(collection[key])] = collection[key];
      }
    }
    return result;
  }

  function forEach(collection, iteratee) {
    if (typeof iteratee !== "function") {
      iteratee = findProperty(iteratee);
    }
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection);
      }
    } else {
      for (key in collection) {
        iteratee(collection[key], key, collection);
      }
    }
    return collection;
  }

  function map(collection, iteratee) {
    if (typeof iteratee !== "function") {
      iteratee = property(iteratee);
    }
    result = [];
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        result.push(iteratee(collection[i], i, collection));
      }
    } else {
      for (key in collection) {
        result.push(iteratee(collection[key], key, collection));
      }
    }
    return result;
  }

  function isEqual(value, other) {
    if (value === other) return true;
    if (
      value == null ||
      typeof value != "object" ||
      other == null ||
      typeof other != "object"
    )
      return false;
    let keysValue = Object.keys(value);
    let keysOther = Object.keys(other);
    if (keysValue.length !== keysOther.length) return false;
    for (let key of keysValue) {
      if (!keysOther.includes(key) || !isEqual(value[key], other[key]))
        return false;
    }

    return true;
  }

  function matches(source) {
    return function (object) {
      for (let key in source) {
        if (!isEqual(source[key], object[key])) return false;
      }
      return true;
    };
  }

  function matchesProperty(path, srcValue) {
    return function (object) {
      return isEqual(property(path)(object), srcValue);
    };
  }

  function filter(collection, predicate) {
    if (typeof predicate === "string") {
      predicate = property(predicate);
    }
    if (Array.isArray(predicate)) {
      predicate = matchesProperty(...predicate);
    }
    if (typeof predicate === "object") {
      predicate = matches(predicate);
    }
    result = [];
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i], i, collection)) {
          result.push(collection[i]);
        }
      }
    } else {
      for (key in collection) {
        if (predicate(collection[key], key, collection)) {
          result.push(collection[key]);
        }
      }
    }
    return result;
  }

  function every(collection, predicate) {
    if (typeof predicate === "string") {
      predicate = property(predicate);
    }
    if (Array.isArray(predicate)) {
      predicate = matchesProperty(...predicate);
    }
    if (typeof predicate === "object") {
      predicate = matches(predicate);
    }
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (!predicate(collection[i], i, collection)) {
          return false;
        }
      }
    } else {
      for (key in collection) {
        if (!predicate(collection[key], key, collection)) {
          return false;
        }
      }
    }
    return true;
  }

  function some(collection, predicate) {
    if (typeof predicate === "string") {
      predicate = property(predicate);
    }
    if (Array.isArray(predicate)) {
      predicate = matchesProperty(...predicate);
    }
    if (typeof predicate === "object") {
      predicate = matches(predicate);
    }
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i], i, collection)) {
          return true;
        }
      }
    } else {
      for (key in collection) {
        if (predicate(collection[key], key, collection)) {
          return true;
        }
      }
    }
    return false;
  }

  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }

  function parseJson(string) {
    if (!string.length) {
      throw SyntaxError("Unexpected end of JSON input");
    }
    let i = 0;
    return parseValue();
    function parseValue() {
      skip();
      if (string[i] === '"') {
        return parseString();
      }
      if (string[i] === "[") {
        return parseArray();
      }
      if (string[i] === "{") {
        return parseObject();
      }
      if (string[i] === "t" || string[i] === "f") {
        return parseBoolean();
      }
      if (string[i] === "n") {
        return parseNull();
      }
      return parseNumber();
    }
    function parseBoolean() {
      if (string[i] === "t") {
        if (string.substr(i, 4) === "true") {
          i += 4;
          skip();
          seeEnd();
          return true;
        }
        throw SyntaxError(`Invalid Value: ${string.substr(i, 4)}`);
      } else if (string[i] === "f") {
        if (string.substr(i, 5) === "false") {
          i += 5;
          skip();
          seeEnd();
          return false;
        }
        throw SyntaxError(`Invalid Value: ${string.substr(i, 5)}`);
      }
    }
    function parseNull() {
      if (string[i] === "n") {
        if (string.substr(i, 4) === "null") {
          i += 4;
          skip();
          seeEnd();
          return null;
        }
        throw SyntaxError(`Invalid Value: ${string.substr(i, 4)}`);
      }
    }
    function parseString() {
      i++; // skip the '"' at the beginning
      let result = "";
      while (string[i] !== '"') {
        result += string[i];
        i++;
      }
      i++; // skip the '"' at the end
      skip();
      return result;
    }
    function parseNumber() {
      let numStr = "";
      while (string[i] >= "0" && string[i] <= "9") {
        numStr += string[i];
        i++;
      }
      return Number(numStr);
    }
    function parseArray() {
      let result = [];
      i++; // skip the "[" at the beginning of the array
      skip();
      while (string[i] !== "]") {
        if (string[i] == ",") {
          i++;
          skip();
        }
        let value = parseValue();
        skip();
        result.push(value);
      }
      skip();
      i++; // skip the "]" at the end of the array
      return result;
    }
    function parseObject() {
      let result = {};
      i++; // skip the "{" at the beginning of the object
      skip();
      while (string[i] !== "}") {
        skip();
        if (string[i] == ",") {
          i++;
          skip();
        }
        let key = parseValue();
        skip();
        i++;
        skip();
        let value = parseValue();
        skip();
        result[key] = value;
      }
      i++; //
      return result;
    }
    function skip() {
      while (string[i] === " " || string[i] === "\n" || string[i] === "\t") {
        i++;
      }
    }
    function seeEnd() {
      if (i == string.length) return;
      if (string[i] == "," || string[i] == "]" || string[i] == "}") {
        return;
      }
      throw SyntaxError(`Unexpected Token ${string[i]} at ${i}`);
    }
  }

  function stringifyJson(object) {
    if (object === undefined) {
      return;
    }
    if (typeof object != "object") {
      if (typeof object == "string") {
        return '"' + object + '"';
      }
      return String(object);
    }
    if (object === null) {
      return null;
    }
    if (Array.isArray(object)) {
      let result = "[";
      for (item of object) {
        result += stringifyJson(item);
        result += ",";
      }
      result = result.slice(0, result.length - 1);
      result += "]";
      return result;
    } else {
      let result = "{";
      for (key in object) {
        result += `"${key}":${stringifyJson(object[key])}`;
        result += ",";
      }
      result = result.slice(0, result.length - 1);
      result += "}";
      return result;
    }
  }

  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    differenceBy: differenceBy,
    uniq: uniq,
    uniqBy: uniqBy,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
    isEqual: isEqual,
    matches: matches,
    property: property,
    map: map,
    filter: filter,
    every: every,
    some: some,
    fill: fill,

    parseJson: parseJson,
    stringifyJson: stringifyJson,
  };
})();
