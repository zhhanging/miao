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

  return {
    chunk: chunk,
    compact: compact,
  };
})();

// console.log(zhhanging.compact([0, 1, false, 2, "", 3, NaN, undefined]));
