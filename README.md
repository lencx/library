# JavaScript Libraries

## [Carousel Demo](https://lencx.github.io/demo/carousel/)

```js
new Carousel({
    selector: '#carousel', // container
    elCollection: '#carousel img', // get elements collection
    time: 3000, // ms
    fadeInStep: 0.02, // 0 - 1
    autoPlay: true,
    navIndex: true,
    indexStyle: 'disc' // disc | number
})
```