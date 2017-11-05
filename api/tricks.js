function is(type) {
    return Object.prototype.toString.call(type)
}

/**
 * Is Array
 * @param {Any} val 
 */
function isArr(val) {
    return is(val) == '[object Array]'
}

/**
 * Is Function
 * @param {Any} val 
 */
function isFunc(val) {
    return is(val) == '[object Function]'
}

/**
 * Is Boolean
 * @param {Any} val 
 */
function isBool(val) {
    return is(val) == '[object Boolean]'
}

/**
 * Is RegExp
 * @param {Any} val 
 */
function isRegExp(val) {
    return is(val) == '[object RegExp]'
}


function Obj(...args) {
    if(this instanceof Obj) {
        for(let i of args) {
            this[i] = i
        }
    } else {
        return new Obj(...args)
    }
}

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments)
    }
}

function bind2(fn, context) {
    let args = Array.prototype.slice.call(arguments, 2)
    return function() {
        let innerArgs = Array.prototype.slice.call(arguments)
        let finalArgs = args.concat(innerArgs)
        return fn.apply(context, finalArgs)
    }
}

function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    return function() {
        let innerArgs = Array.prototype.slice.call(arguments)
        let finalArgs = args.concat(innerArgs)
        return fn.apply(null, finalArgs)
    }
}

const factorial = n => {
    if(n < 2) return 1
    return n * factorial(n - 1)
}

/**
 * Optimizable
 */
const factorial2 = (n, accum = 1) => {
    if(n < 2) return accum
    return factorial2(n - 1, n * accum)
}

/**
 * Object Freeze
 * @param {Any} args 
 * @example
 * const createPoint = (x, y) => freeze([x, y])
 * const movePointBy = ([x, y], dx, dy) => freeze([x + dx, y + dy])
 * let point = createPoint(2, 6)
 * point = movePointBy(point, 3, 5)
 * console.log(point) // [5, 11]
 * point = movePointBy(point, 4, -7)
 * console.log(point) // [9, 4]
 */
function freeze(...args) {
	return Object.freeze(...args)
}


/******************************** Demo ********************************/
const map = fn => arr => arr.map(fn)
const pluck = key => obj => obj[key]
const multiply = x => y => x * y
const compose = pluck => discount => tax => tax

const discount = multiply(.8)
const tax = multiply(1.05)

const carts = [{
    name: 'prod 1',
    price: 10
}, {
    name: 'prod 2',
    price: 8
}]

let getCarts = new Promise((res, rej) => {
    res(carts)
})

getCarts
    .then(map(pluck('price')))
    .then(map(discount))
    .then(map(tax))
    .then(data => console.log(data))
