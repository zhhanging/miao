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

  function uniqBy(array, iteratee) {}

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

  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
    uniq: uniq,

    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
  };
})();

// var array = [1, [2, [3, [4]], 5]];
// console.log(zhhanging.flatten(array));
// console.log(zhhanging.flattenDepth(array, 2));
