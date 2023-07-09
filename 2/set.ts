export default {

  intersect: (setA: Set<any>, setB: Set<any>) => {
    const _out = new Set()
    for (const item of setB) {
      if (setA.has(item)) { _out.add(item) }
    }
    return _out
  },

  union: (setA: Set<any>, setB: Set<any>) => {
    const _out = new Set(setA)
    for (const item of setB) {
      _out.add(item)
    }
    return _out
  },

  difference: (setA: Set<any>, setB: Set<any>) => {
    const _out = new Set(setA)
    for (const item of setB) {
      _out.delete(item)
    }
    return _out
  }
}
