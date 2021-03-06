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
 * => createEl('div', '#toggle.btn')
 */
function createEl(createEl, selector) {
    let _el = document.createElement(createEl)
    if(selector !== undefined) {
        let _s = selector.match(/#(\w|-)+|\.(\w|-)+/g)
        _s.some(i => {
            if(/#/.test(i)) _el.setAttribute('id', i.split('#')[1])
            else if(/./.test(i)) _el.setAttribute('class', i.split('.')[1])
        })
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
 * Hexcode to RGB
 * @param {String} hex - color
 * {@link https://github.com/Chalarangelo/30-seconds-of-code#hexcode-to-rgb}
 * @example
 *  hexToRgb('#acd') => rgb(170, 204, 221)
 *  hexToRgb('#aaccdd') => rgb(170, 204, 221)
 */
const hexToRgb = hex => {
    let _hex = hex.slice(1)
    let h
    h = parseInt(_hex.length === 3
            ? Array.prototype.map.call(_hex, i => h += i.repeat(2))[2].slice(9)
            : _hex
        , 16)
    return `rgb(${h >> 16}, ${(h & 0x00ff00) >> 8}, ${h & 0x0000ff})`
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

/*
 *  Modify the pseudo-class style
 * *********************
<style>
h1::after {
    width: 20px;
    height: 20px;
    content: '';
    display: block;
    background: red;
}
</style>
<h1></h1>
<script>
document.styleSheets[0].addRule('h1::after','width: 50px')
</script> 
*/


/**
 * Toggle Class
 * @param {eventType} envent type
 * @param {String} HTML tag
 * @param {String} class name
 * @example
 * => html
 * <button class='btn'>Click</button>
 * 
 * => js
 * toggleClass('click', '.btn', 'on')
 */
function toggleClass(eventType, el, classname) {
    let _el = document.querySelector(el)
    _el.addEventListener(eventType, () => {
        _el.classList.contains(classname)
            ? _el.classList.remove(classname)
            : _el.classList.add(classname)
    })
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


/**
 * Template data is filled
 * @example
 * => html
 * <template>
 *    <li>
 *      <span style='background:#eee;'>{{id}}</span>
 *      <span>{{title}}</span>
 *    </li>
 *  </template>
 *  <ul></ul>
 * 
 * => js
 * getData({
 *     url: '/api/articles/page?code=apply_article&size=10&page=1',
 *     target: 'ul',
 *     el: 'template',
 *     cb: function(res, str) {
 *        res.data.data.some(i => {
 *            // console.log(arguments)
 *           str += tpl(arguments[2], {
 *               title: i.title,
 *               id: i.eid
 *           })
 *        })
 *        return str
 *    }
 * })
 */
 /**
  * @param {String} html
  * @param {Object} data
  */
function tpl(html, data) {
    return document.querySelector(html).innerHTML.replace(/{{\w+}}/g, str => {
        let prop = str.replace(/{{|}}/g, '')
        return data[prop] || ''
    })
}
/**
 * @param {Object} args (url:string | target:string | el:string | cb:function)
 */
function getData(args) {
    // https://github.com/axios/axios
    axios.get(args.url)
        .then(res => {
            let _html = ''
            return document.querySelector(args.target).innerHTML = args.cb(res, _html, args.el)
        })
}

/**
 * Generated UUID
 * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function gUUID() {
    let d = new Date().getTime()
    if(typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}


/**
 * Set Cookie
 * @param {String} key - name
 * @param {String} val - value
 */
function setCookie(key, val) {
    document.cookie = `${key}=${val}`
}

/**
 * Get Cookie
 * @param {String} key - name
 */
function getCookie(key) {
    let _key = `${key}=`
    let _val
    document.cookie.split(';').some(i => {
        let _v = i.trim()
        return _val = _v.indexOf(key) === 0
            ? _v.substring(_key.length, _v.length)
            : void 0
    })
    return _val
}

/**
 * Boolean string to Boolean
 * @param {String} str - true/false
 */
function toBool(str) {
    return (/^true$/i.test(str))
}

/**
 * Set localStorage
 * @param {String} key - name
 * @param {String|Number|Object|Array} val - value
 */
function setStorage(key, val) {
    localStorage.setItem(key, Object.prototype.toString.call(val) === '[object Object]' || '[object Array]'
        ? JSON.stringify(val) : val
    )
}

/**
 * Get localStorage
 * @param {String} key - name
 */
function getStorage(key) {
    let _key = localStorage.getItem(key)
    let _reg = {
        int: /^-?\d+$/,
        float: /^(-?\d+)(\.\d+)$/,
        bool: /^(true)|(false)$/i,
        obj: /^\[?\{|\}\]?$/,
    }
    function regexp(reg) {
        return reg.test(_key)
    }
    if(regexp(_reg.int)) {
        _key = parseInt(_key)
    }
    if(regexp(_reg.float)) {
        _key = parseFloat(_key)
    }
    if(regexp(_reg.bool)) {
        _key = toBool(_key)
    }
    if(regexp(_reg.obj)) {
        _key = JSON.parse(_key)
    }
    return _key
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