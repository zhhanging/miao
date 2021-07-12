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

  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    uniq: uniq,
    uniqBy: uniqBy,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    groupBy: groupBy,
    keyBy: keyBy,
    forEach: forEach,
  };
})();

