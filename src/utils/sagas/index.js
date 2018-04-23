function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
}

export default delay;