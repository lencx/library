/**
 * JavaScript UX
 * @author Lencx
 * @license Apache-2.0
 * {@link https://github.com/lencx/library/blob/master/api/lx.js}
 */
'use strict';

/**
 * Send phone code
 * @param {Object} opts
 * @example
 * => sendCode({
 *      el: '#phoneCode'
 *      initText: '获取验证码',
 *      waitText: '重发 %d s',
 *      endText: '重新发送',
 *      reacquireTime: 60
 *    })
 */
function sendCode(opts) {
    if(!opts) opts = {}
    let _args = {
        el: document.querySelector(opts.el) || document.body,
        initText: opts.initText || '获取验证码',
        waitText: opts.waitText || '重新发送 %d s',
        endText: opts.endText || '重新发送',
        reacquireTime: opts.reacquireTime || 10
    }
    let btn = document.createElement('button')
    btn.setAttribute('id', 'send-code')
    btn.innerHTML = _args.initText
    _args.el.appendChild(btn)
    btn.addEventListener('click', function() {
        let t = 0
        let time = _args.reacquireTime
        let timer
        let str = _args.waitText.split(new RegExp(/%d/gi))
        timer = setInterval(function() {
            btn.innerHTML = `${str[0]}${time-t}${str[1]}`
            btn.setAttribute('disabled', 'true')
            btn.classList.add('send-code-disable')
            t<=time ? t++ : restore()
        }, 1000)
        function restore() {
            clearInterval(timer)
            btn.innerHTML = _args.endText
            btn.removeAttribute('disabled')
            btn.classList.remove('send-code-disable')
        }
    })
}

/**
 * Download File
 * @param {String} filename
 * @param {Any} content
 * @example
 * => downloadFile('1.txt', 'test .....')
 */
function downloadFile(filename, content) {
    let link = document.createElement('a')
    let blob = new Blob([content])
    link.download = filename
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(blob)
}


/**
 * jQuery Accordion
 * @param {String} selector - contanier
 * @param {String} selector - click element
 * @param {Boolean} open - open the number of content
 * => false: Only open one
 * => true: All content is not collapsed
 * @example
 * => css
 * #accordion .item {
 *     display: none;
 * }
 * #accordion li:first-child .item {
 *     display: block;
 * }
 * => html
 * <div id='accordion'>
 *     <ul>
 *         <li>
 *             <div class='link'>Click 1</div> 
 *             <div class='item'>Collapse content 1</div> 
 *         </li>
 *         <li>
 *             <div class='link'>Click 2</div> 
 *             <div class='item'>Collapse content 2</div> 
 *         </li>
 *     </ul>
 * </div>
 * => js
 * new Accordion({
 *     el: $('#accordion'),
 *     clickEl: '.link',
 *     mulit: false
 * })
 */
class Accordion {
    constructor(opts) {
        this.el = opts.el
        this.mulit = opts.mulit || false
        this.el.find(opts.clickEl).on('click', {
            el: this.el,
            mulit: this.mulit
        }, this.dropdown)
    }
    dropdown (e) {
        let $el = e.data.el,
            $this = $(this),
            $next = $(this).next()
        $next.slideToggle()
        $this.parent().toggleClass('on')
        if(!e.data.mulit) {
            $el.find('.item').not($next).slideUp().parent().removeClass('on')
        }
    }
}