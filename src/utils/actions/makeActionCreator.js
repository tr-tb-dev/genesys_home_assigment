export function makeActionCreator(type) {
  const fn = (payload) => ({
    type,
    payload,
  })
  Object.defineProperty(fn, 'type', { value: type, writable: false })
  return fn
}
