let zhhanging = (function () {
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
  return {
    chunk: chunk,
  };
})();

// console.log(zhhanging.chunk(['a', 'b', 'c', 'd'], 6));
