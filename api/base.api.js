/**
 * JavaScript base
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
