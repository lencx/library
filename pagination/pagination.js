function Pagination(args, cb) {
    const o = {
        code: '',
        el: args.el,
        Extend(data={}) {
            o.total = data.total || 300;
            o.curr = data.curr || 1;
            o.step = data.step || 3;
        },
        Add(s, f) {
            for (let i = s; i < f; i++) {
                o.code += `<a>${i}</a>`;
            }
        },
        Last() {
            o.code += `<i>...</i><a>${o.total-2}</a><a>${o.total-1}</a><a>${o.total}</a>`;
        },
        First() {
            o.code += '<a>1</a><a>2</a><a>3</a><i>...</i>';
        },
        DisableBtn() {
            let prev = document.querySelector(`${o.el} .prev`).classList
            let next = document.querySelector(`${o.el} .next`).classList
            if(o.curr === 1) {
                prev.add('disable')
                next.remove('disable')
            } else if(o.curr === o.total) {
                prev.remove('disable')
                next.add('disable')
            } else {
                prev.remove('disable')
                next.remove('disable')
            }
        },
        Click() {
            o.curr = +this.innerHTML;
            o.DisableBtn()
            o.Start()
        },
        Prev() {
            o.curr--;
            o.DisableBtn()
            if (o.curr < 1) {
                o.curr = 1;
                this.classList.add('disable')
            }
            o.Start()
        },
        Next() {
            o.curr++;
            o.DisableBtn()
            if (o.curr > o.total) {
                o.curr = o.total;
                this.classList.add('disable')
            }
            o.Start()
        },
        Bind() {
            const a = o.e.getElementsByTagName('a')
            for (let i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === o.curr) {
                    a[i].className = 'curr'
                    cb(a[i])
                }
                a[i].addEventListener('click', o.Click, false)
            }
        },
        End() {
            o.e.innerHTML = o.code;
            o.code = '';
            o.Bind()
        },
        Start() {
            if (o.total < o.step * 2 + 6) {
                o.Add(1, o.total + 1)
            }
            else if (o.curr < o.step * 2 + 1) {
                o.Add(1, o.step * 2 + 4)
                o.Last()
            }
            else if (o.curr > o.total - o.step * 2) {
                o.First()
                o.Add(o.total - o.step * 2 - 2, o.total + 1)
            }
            else {
                o.First()
                o.Add(o.curr - o.step, o.curr + o.step + 1)
                o.Last()
            }
            o.End()
        },
        Buttons(e) {
            const nav = e.getElementsByTagName('a')
            nav[1].addEventListener('click', o.Prev, false)
            nav[2].addEventListener('click', o.Next, false)

            nav[0].addEventListener('click', o.firstPage, false)
            nav[3].addEventListener('click', o.lastPage, false)
        },
        firstPage() {
            o.curr = 1;
            o.DisableBtn()
            o.Start()
        },
        lastPage() {
            o.curr = o.total;
            o.DisableBtn()
            o.Start()
        },
        Jump() {
            let jumpNum =document.querySelector(`${o.el} input`)
            jumpNum.addEventListener('keyup', (e) => {
                let key = event.which || event.keyCode || event.charCode
                if(key === 13) {
                    let val = parseInt(jumpNum.value)
                    if(!isNaN(val) && val>= 1 && val <= o.total) {
                        o.curr = val
                        o.Start()
                        o.DisableBtn()
                    } else {
                        alert(`Please enter a number from 1 - ${o.total}`)
                    }
                }
            })
        },
        Create(e) {
            const html = [
                '<a class="first">First Page</a>',
                '<a class="prev">&#9668;</a>',
                '<span class="page"></span>',
                '<a class="next">&#9658;</a>',
                '<a class="last">Last Page</a>',
                '<p class="jump">Jump <input type="text"> page</p>'
            ];
            e.innerHTML = html.join('')
            o.e = e.getElementsByTagName('span')[0];
            o.Buttons(e)
            o.Jump(e)
        },
        Init(data) {
            let e = document.querySelector(data.el)
            o.Extend(data)
            o.Create(e)
            o.Start()
        }
    }
    const init = () => {
        o.Init(args)
    }
    document.addEventListener('DOMContentLoaded', init, false)
}

/******
new Pagination({
    el: '#pagination',
    total: 25,
    curr: 1,
    step: 3
}, (e) => {
    console.log(e)
})
******/