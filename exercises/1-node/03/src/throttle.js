function throttle(ms, fn) {
  let lastStamp = 0
  return (...args) => {
    const now = Date.now()
    if (now - lastStamp < ms) return
    lastStamp = now
    return fn(...args)
  }
}

module.exports = throttle
