const assert = require('assert')
const makeMatcher = require('./match.js')

const m = makeMatcher(['rust', 'c++', 'F1', 'machine learning', '@karpathy', '  ', ''])
assert(m('Learning Rust this week'))
assert(m('#rust is great'))
assert(m('c++ templates'))
assert(m('f1 race today'))
assert(m('new Machine Learning paper'))
assert(m('Andrej Karpathy @karpathy · 2h'))
assert(!m('trusty old car'))       // no partial-word hits
assert(!m('F150 truck'))
assert(!m('cooking pasta'))
assert(makeMatcher([])('anything'))
assert(makeMatcher(['', ' '])('anything'))
assert(makeMatcher(['a.b'])('a.b') && !makeMatcher(['a.b'])('axb')) // regex chars escaped
console.log('ok')
