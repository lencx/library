/**
 * JavaScript Common Methods
 * @author Lencx
 * @license Apache-2.0
 * {@link https://github.com/lencx/library/blob/master/api/base.api.js}
 */
'use strict';

/*******************************************************
 * HTML
 *******************************************************/

/**
 * has class
 * @param {Object} el - get HTML element selector
 * @param {String} cls - class name
 * @return {Boolean}
 */
function hasClass(el, cls) {
    if(!el || !cls) return false
    el.classList
        ? el.classList.contains(cls)
        : el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
    console.log(el.classList.contains(cls))
}

/**
 * add class
 * @param {Object} el - get HTML element selector
 * @param {String} cls - class name
 */
function addClass(el, cls) {
    el.classList
        ? el.classList.add(cls)
        : !hasClass(el, cls) ? el.className += ''+cls : ''
}

/**
 * remove class
 * @param {Object} el - get HTML element selector
 * @param {String} cls - class name
 */
function removeClass(el, cls) {
    el.classList
        ? el.classList.remove(cls)
        : el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}

/**
 * create element
 * @param {String} createEl - element name
 * @param {String} selector - id || class || none
 * @example
 * => createEl('span')
 * => createEl('span', '#span-id')
 * => createEl('span', '.span-class')
 */
function createEl(createEl, selector) {
    let _el = document.createElement(createEl)
    if(selector !== undefined) {
        if(new RegExp(/^#/).test(selector)) _el.setAttribute('id', selector.split('#')[1])
        else if(new RegExp(/^./).test(selector)) _el.setAttribute('class', selector.split('.')[1])
        return _el
    } else {
        return _el
    }
}

/**
 * The template inserts the data
 * @param {Object} selector - HTML Element
 * @param {Object} selector - HTML Element (Insert position)
 * @param {Object} data - replace the template data
 * @example
 * => html
 *  <template>
 *      <span>{name}</span>
 *      <span>{age}</span>
 *  </template>
 *  <p></p>
 * 
 * => js
 *  tpl('template', 'p', {
 *      name: 'Len',
 *      age: 24
 *  })
 */
function tpl(html, inserts, data) {
    let _html = document.querySelector(html).innerHTML.replace(/\{\w+\}/g, str => {
        let prop = str.replace(/\{|\}/g, '')
        return data[prop] || ''
    })
    return document.querySelector(inserts).innerHTML = _html
}

/*******************************************************
 * CSS
 *******************************************************/

/**
 * Get RGB
 * @param {String} color
 * @example
 * => getRgb('#aac')
 * => getRgb('#cc8811')
 * => getRgb('#AAbb11')
 */
function getRgb(color) {
    function int(num) {
        return parseInt(num, 16)
    }
    function rep(str) {
        return str.toString().repeat(2)
    }
    let _str
    if(/^#([0-9a-fA-F]{6})/.test(color) && color.length === 7 || /^#([0-9a-fA-F]{3})/.test(color) && color.length === 4) {
        if(color.length === 7) {
            _str = color.match(/^#([\w]{2})([\w]{2})([\w]{2})/)
            return `rgb(${int(_str[1])}, ${int(_str[2])}, ${int(_str[3])})`
        } else {
            _str = color.match(/^#(\w)(\w)(\w)/)
            return `rgb(${int(rep(_str[1]))}, ${int(rep(_str[2]))}, ${int(rep(_str[3]))})`
        }
    } else {
        return console.log('Invalid hex, please enter a legal color value, for example: `#ffa`, `#00a`, `#CCAAbb` or `#00aaCC` etc.')
    }
}

/** Random Color
 * @return {String}
 */
function randomColor() {
    return '#'+(0+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
}

/**
 * Random Hsla
 * @param {Number} saturation => 0 - 100
 * @param {Number} lightness => 0 - 100
 * @param {Number} alpha => 0 - 1
 * @return {String} Defaults: hsla(random, 80, 60, 1)
 * @example
 * // randomHsla() => hsla(random, 80, 60, 1)
 * // randomHsla({l: 70, a: .3}) => hsla(random, 80, 70, .3)
 * // randomHsla({a: .5}) => hsla(random, 80, 60, .5)
 */
function randomHsla({s=80, l=60, a=1}) {
    // return 'hsla('+Math.ceil(Math.random()*360)+', '+s+'%, '+l+'%,'+a+')'
    return `hsla(${Math.ceil(Math.random()*360)}, ${s}%, ${l}%, ${a})`
}

/*******************************************************
 * Array
 *******************************************************/
/**
 * Unique values in an array
 * @param {Array} arr
 * @return {Array}
 * @example
 * // let arr = [1, 2, 1, 3, 2]
 * // unique(arr) // [1, 2, 3]
 * // unique2(arr) // [1, 2, 3]
 */
// ES5
function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
}
// ES6
function unique2(arr) {
    return [...new Set(arr)]
}

/**
 * Array Items Count
 * @param {Array} arr
 * @return {Array} Array[Object: {item, n}]
 * @example
 * // let a = [1, 2, 3, 1, 2, 1, 6, 0]
 * // arrCount(a)
 */
function arrCount(arr) {
    let countArr = new Set()
    function unique2(arr) {
        return [...new Set(arr)]
    }
    unique2(arr).some(item => {
        let n = 0
        arr.some(i => {
            if(item === i) n++
        })
        countArr.add({item, n})
    })
    return [...countArr]
}

/*******************************************************
 * Events
 *******************************************************/

/**
 * transform end
 * @param {Object} e - selector
 * @param {Function} cb - callback function
 * @example
 * => let testEl = document.querySelector('div')
 *    transformEnd(testEl, function() {
 *      // code ...
 *    })
 */
function transformEnd(e, cb) {
    function whichTransitionEvent() {
        let t,
            el = document.createElement('fakeelement'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }
        for(t in transitions) {
            if(el.style[t] !== undefined) return transitions[t] 
        }
    }
    let transitionE = whichTransitionEvent()
    transitionE && e.addEventListener(transitionE, cb)
}

/**
 * angle conversion radians
 * @param {Number} deg - angle
 */
function getAngle(deg) {
    return  deg * Math.PI / 180
}

/**
 * bind event to element
 * @param {Object} el - get HTML element selector
 * @param {String} event - events name
 * @param {Function} cb - callback function
 * @example
 * => let btn = document.querySelector('button')
 * => bind(btn, 'click', function() {
 *      // code ...
 *    })
 */
function bind(el, event, cb) {
    if(typeof addEventListener === 'function') {
        el.addEventListener(event, cb, false)
    } else if(el.attachEvent) {
        el.attachEvent('on' + event, cb)
    }
}

/**
 * Device type judgment
 * @param {String} type - Device type [Android, iPad, iPhone, Mac, Win, Linux, Mobile, wx(wechat)]
 * @param {Function || Null} cb - Callback execution of this device
 * @example
 * // usage alias
 *  type | alias
 *  ------------------
 *  android => android
 *  iPad => ipad
 *  iPhone => iphone
 *  Macintosh => mac
 *  Windows => win
 *  Linux => linux
 *  Mobile => mobile
 *  MicroMessenger => wx(wechat)
 * 
 * => deviceType('mac') // true or false
 * => deviceType('iphone', () => {
 *        // code
 *    })
 * => deviceType('wx', () => {
 *        // code
 *    })
 * => deviceType('wx', () => {
 *      deviceType('iphone', () => {
 *          alert('is wechat && iphone')
 *      })
 *    })
 */
function deviceType(type, cb) {
    let ua = navigator.userAgent
    let device = [
        'Android',
        'iPad',
        'iPhone',
        'Macintosh',
        'Windows',
        'Linux',
        'Mobile',
        'MicroMessenger'
    ]
    function callback() {
        cb === undefined ? console.log(true) : cb()
    }
    if(type===('wx'||'wechat') && new RegExp('MicroMessenger').test(ua)) {
        callback()
        console.log(false)
        return
    } else {
        device.some(i => {
            if(new RegExp(type, 'i').test(i) && new RegExp(i).test(ua)) {
                callback()
                return
            }
        })
    }
}


/********************************** Other ***************************/

typeof document.createElement('canvas').getContext === "function"

function isWeixinBrowser(){
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}
function isMobile() {
    /Mobile/i.test(navigator.userAgent)
}

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f) {return setTimeout(f, 1000/60)}

window.cancelAnimationFrame = window.cancelAnimationFrame
|| window.mozCancelAnimationFrame
|| function(requestID) {clearTimeout(requestID)}