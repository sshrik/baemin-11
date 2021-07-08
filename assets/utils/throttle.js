export const throttle = (ms, fn) => {
  let timeoutId = null;

  return function(e){
    if(timeoutId) return;
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(e);
    }, ms);
  };
}

