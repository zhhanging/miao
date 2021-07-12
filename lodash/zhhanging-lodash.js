let zhhanging = (function () {
  function trunc(array, size = 1) {
    let result = [];
    for (let i = 0; i < array.length; ) {
      let piece = [];
      let j = 0;
      for (j = 0; j < size; j++) {
        if (!array[i]) break;
        piece.push(array[i]);
        i++;
      }
      result.push(piece);
    }
    return result;
  }
  return {
    trunc: trunc,
  };
})();

// console.log(zhhanging.trunc(["a", "b", "c", "d", "e"], 3));
