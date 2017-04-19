/**
 * Image Carousel
 * @author Lencx
 * @param {Object} 
 * => {
 *      selector: string,
 *      time: number, // ms
 *      fadeInTime: number // ms
 *    }
 * @example
 * => new Carousel({
 *      selector: '.banner img', // Picture collection
 *      time: 2000,
 *      fadeInTime: 2000
 *    })
 */
function Carousel(ags) {
    const list = document.querySelectorAll(ags.selector)
    const listLen = list.length
    let index = 0
    function fadeOut(el) {
        el.style.opacity = 1
        let t = ags.fadeOutTime/100000 || .02
        !function fade() {
            if ((el.style.opacity -= t) < 0) {
                el.style.display = 'none'
            } else {
                requestAnimationFrame(fade)
            }
        }()
    }
    function fadeIn(el) {
        el.style.opacity = 0
        el.style.display = 'block'
        let t = ags.fadeInTime/100000 || .02
        !function fade() {
            let alpha = parseFloat(el.style.opacity)
            if(!((alpha += t) > 1)) {
                el.style.opacity = alpha
                requestAnimationFrame(fade)
            }
        }()
    }
    !function init() {
        for(let i=0,len=list.length; i<len; i++) {
            if(i === 0) {
                list[i].style.display = 'block'
            } else {
                list[i].style.display = 'none'
            }
        }
    }()
    !function play() {
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
        }, ags.time)
    }()
}