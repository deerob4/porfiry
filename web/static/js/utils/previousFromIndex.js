function previousFromIndex(array, value, key = 'id') {
  const index = array.findIndex(x => x[key] === value);
  const previous = array[index - 1][key];

  return previous;
}

export default previousFromIndex;
