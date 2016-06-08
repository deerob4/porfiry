function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t/ 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);

  return {
    minutes,
    seconds,
    total: t,
  };
}

export default getTimeRemaining;
