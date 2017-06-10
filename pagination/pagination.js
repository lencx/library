function Pagination(selector, args) {
    const o = {
        code: '',
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
            let prev = document.querySelector('#pagination .prev').classList
            let next = document.querySelector('#pagination .next').classList
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
                if (+a[i].innerHTML === o.curr) a[i].className = 'curr'
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
            nav[0].addEventListener('click', o.Prev, false)
            nav[1].addEventListener('click', o.Next, false)
        },
        FirstLast(e) {
            const firstLast = e.getElementsByTagName('b')
            firstLast[0].addEventListener('click', o.firstPage, false)
            firstLast[1].addEventListener('click', o.lastPage, false)
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
            let jumpNum =document.querySelector('#pagination input')
            jumpNum.addEventListener('keyup', (e) => {
                let key = event.which || event.keyCode || event.charCode
                if(key === 13) {
                    let val = parseInt(jumpNum.value)
                    if(!isNaN(val) && val>= 1 && val <= o.total) {
                        o.curr = val
                        o.DisableBtn()
                        o.e.getElementsByTagName('a')[val-1].className = 'curr'
                    } else {
                        alert(`Please enter a number from 1 - ${o.total}`)
                    }
                    o.Start()
                }
            })
        },
        Create(e) {
            const html = [
                '<b>First Page</b>',
                '<a class="prev">&#9668;</a>',
                '<span></span>',
                '<a class="next">&#9658;</a>',
                '<b>Last Page</b>',
                '<p class="jump">Jump <input type="text"> page</p>'
            ];
            e.innerHTML = html.join('')
            o.e = e.getElementsByTagName('span')[0];
            o.Buttons(e)
            o.FirstLast(e)
            o.Jump(e)
        },
        Init(e, data) {
            o.Extend(data)
            o.Create(e)
            o.Start()
        }
    }
    const init = () => {
        o.Init(selector, args)
    }
    document.addEventListener('DOMContentLoaded', init, false)
}

// new Pagination(document.getElementById('pagination'), {
//     total: 10,
//     curr: 1,
//     step: 2
// })