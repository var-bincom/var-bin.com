// calculateWorker.js

onmessage = (evt) => {
  const work = 10000000;
  console.time("Array initialize");
  let a = new Array(work);
  let sum = 0;

  for (let i = 0; i < work; i++) {
    a[i] = i * i;
    sum += i * i;
  }
  self.postMessage(sum);
  console.timeEnd("Array initialize");
}
