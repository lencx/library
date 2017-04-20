/**
 * Image Carousel
 * @author Lencx
 * @param {Object}
 * => Object: {
 *      selector: string, // Picture collection
 *      // default value: 2000ms
 *      time: number, // Picture automatic switching time
 *      // default value: 0.02
 *      fadeInStep: number // Step length[0 - 1]: The greater the value, the faster the transition.
 *      autoPlay: boolean,
 *      pictureIndex: boolean,
 *      indexStyle: string // [number | disc]
 *    }
 * @example
 * => new Carousel({
 *      selector: '.carousel img', // Picture collection
 *      time: 1000, // Unit milliseconds
 *      fadeInStep: 0.05, // 0 - 1
 *      autoPlay: true,
 *      pictureIndex: true,
 *      indexStyle: 'disc' // or `number`
 *    })
 * Important: please add `carousel` id name to HTML(carousel container).
 * =>  <div id="carousel" class="banner">
 *         // picture list code
 *     </div>
 */
function Carousel(args) {
    const list = document.querySelectorAll(args.selector)
    const listLen = list.length
    let timer
    let numList
    let index = 0

    function fadeOut(el) {
        el.style.opacity = 1
        let t = args.fadeOutStep || .02
        !function fade() {
            (el.style.opacity -= t) < 0
                ? el.style.display = 'none'
                : requestAnimationFrame(fade)
        }()
    }
    function fadeIn(el) {
        el.style.opacity = 0
        el.style.display = 'block'
        let t = args.fadeInStep || .02
        !function fade() {
            let alpha = parseFloat(el.style.opacity)
            if(!((alpha += t) > 1)) {
                el.style.opacity = alpha
                requestAnimationFrame(fade)
            }
        }()
    }

    function creatEl(el, selector, name) {
        let _el = document.createElement(el)
        _el.setAttribute(selector, name)
        return _el
    }

    // Create picture index
    function createNum() {
        // const numEl = document.createElement('ul')
        // numEl.setAttribute('class', 'carousel-num')
        let numEl = creatEl('ul', 'class', 'carousel-num')
        let li = ''
        for(let i=0; i<listLen; i++) {
            switch(args.indexStyle) {
                case 'number':
                    li += '<li class="num" data-index="'+i+'">'+(i+1)+'</li>'
                    break
                case 'disc':
                    li += '<li class="disc" data-index="'+i+'"></li>'
                    break
            }
        }
        numEl.innerHTML = li
        document.querySelector('#carousel').appendChild(numEl)
        numList = document.querySelectorAll('#carousel .carousel-num li')
        numEl.style.marginLeft = -numEl.offsetWidth / 2 + 'px' 
    }
    args.pictureIndex ? createNum() : ''

    // Create prev & next
    !function switchBtn() {
        let switchBtn = creatEl('div', 'class', 'switch-btn')
        document.querySelector('#carousel').appendChild(switchBtn)
        let btn = '<span class="prev"></span><span class="next"></span>'
        switchBtn.innerHTML = btn
    }()

    // Picture
    function pictureEl() {
        list.forEach(function(i) {
            i.style.display = 'none'
            i.style.opacity = 0
        })
        // list[index].style.display = 'block'
        fadeIn(list[index])
    }

    // Picture index
    function pictureIndex() {
        if(args.pictureIndex) {
            numList.forEach(function(i) {
                // i.removeAttribute('class', 'on')
                i.classList.remove('on')
            })
            numList[index].classList.add('on')
        }
    }

    function time() {
        timer = setInterval(function(){
            index++
            if(index === listLen) {
                index = 0
            }  
            pictureEl()
            pictureIndex()
        }, args.time)
    }

    !function init() {
        for(let i=0,len=list.length; i<len; i++) {
            if(i === 0) {
                list[i].style.display = 'block'
                args.pictureIndex ? numList[i].classList.add('on') : ''
            } else {
                list[i].style.display = 'none'
            }
        }
    }()

    function mouse() {
        if(args.pictureIndex) {
            numList.forEach(function(i) {
                i.addEventListener('mouseover', function() {
                    let _index = i.attributes['data-index'].value
                    index = _index
                    clearInterval(timer)
                    pictureEl(list[index])
                    pictureIndex()
                })
                i.addEventListener('mouseout', function() {
                    args.autoPlay ? time() : ''
                })
            })   
        }
    }
    
    // Auto play
    function autoPlay() {
        time()
        mouse()
    }
    args.autoPlay ? autoPlay() : mouse()

    // Click prev or next
    let btnAll = document.querySelectorAll('#carousel .switch-btn span')
    function clickBtn(i) {
        btnAll[i].addEventListener('click', function() {
            clearInterval(timer)
            if(i === 0) {
                if(index === 0) index = listLen
                index--
            } else {
                index++
                if(index === listLen) index = 0
            }
            pictureEl()
            pictureIndex()
            time()
        })
    }
    clickBtn(0)
    clickBtn(1)
}