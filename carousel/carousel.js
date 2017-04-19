/**
 * Image Carousel
 * @author Lencx
 * @param {Object}
 * => Object: {
 *      selector: string,
 *      // defalut value: 2000ms
 *      time: number,
 *      // default value: 0.02
 *      fadeInStep: number // 0 - 1: The greater the value, the faster the transition.
 *      autoPlay: boolean,
 *      pictureIndex: boolean,
 *      indexStyle: string // number | disc
 *    }
 * @example
 * => new Carousel({
 *      selector: '.carousel img', // Picture collection
 *      time: 1000,
 *      fadeInStep: 0.05,
 *      autoPlay: true,
 *      pictureIndex: true,
 *      indexStyle: disc // or number
 *    })
 * Important: please add `carousel` id name to HTML(carousel container).
 * <div id="carousel" class="banner">
 *     // picture list code
 * </div>
 */
function Carousel(args) {
    const list = document.querySelectorAll(args.selector)
    const listLen = list.length
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

    // Create picture index
    function createNum() {
        const numEl = document.createElement('ul')
        numEl.setAttribute('class', 'carousel-num')
        let li = ''
        for(let i=0; i<listLen; i++) {
            switch(args.indexStyle) {
                case 'number':
                    li += '<li class="num">'+(i+1)+'</li>'
                    break
                case 'disc':
                    li += '<li class="disc"></li>'
                    break
            }
        }
        numEl.innerHTML = li
        document.querySelector('#carousel').appendChild(numEl)
        numList = document.querySelectorAll('#carousel .carousel-num li')
    }
    args.pictureIndex ? createNum() : ''

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
    
    // Auto play
    function autoPlay() {
        setInterval(function(){
            index++
            if(index === listLen) {
                index = 0
            }
            list.forEach(function(i) {
                i.style.display = 'none'
                i.style.opacity = 0
            })
            // list[index].style.display = 'block'
            fadeIn(list[index])

            if(args.pictureIndex) {
                // picture index
                numList.forEach(function(i) {
                    // i.removeAttribute('class', 'on')
                    i.classList.remove('on')
                })
                numList[index].classList.add('on')
            }
        }, args.time)
    }
    args.autoPlay ? autoPlay() : ''
}