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