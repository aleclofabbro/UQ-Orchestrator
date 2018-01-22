// https://developer.mozilla.org/en-US/docs/Web/API/History_API
window.addEventListener('popstate', e => {
  console.log('POP', e.state);
});
const stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', 'bar.html');
