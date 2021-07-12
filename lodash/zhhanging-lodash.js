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

  function difference(array, values = []) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let found = false;
      for (let j = 0; j < values.length; j++) {
        if (item === values[j]) {
          found = true;
          break;
        }
      }
      if (!found) result.push(item);
    }
    return result;
  }

  return {
    chunk: chunk,
    compact: compact,
    difference: difference,
  };
})();

// console.log(zhhanging.difference([2, 1, 5], [2, 3, 4]));
