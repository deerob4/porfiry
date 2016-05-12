function nextId(array, key = 'id') {
  // Collect all the ids in the array.
  const ids = array.reduce((arr, obj) => [...arr, obj[key]], []);
  // Finds the next biggest value in an array.
  return Math.max(...ids) + 1;
}

export default nextId;
