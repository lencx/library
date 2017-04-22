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

## Utility functions for the canvas package

```js
let $ = new CanvasApp('#myCanvas')
$.drawRect(x, y, width, height, color, isFill, isClear)
$.drawArc(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill, isOnlyArc)
$.drawSector(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill)
$.drawRoundRect(x, y, width, height, radius, color, isFill, tr, br, bl, tl)
$.drawSolidLine(startX, startY, endX, endY, lineWidth, color)
$.drawDashLine(startX, startY, endX, endY, color, setLineDash, lineWidth, lineCap)
$.drawPolygon(centerX, centerY, sideLen, sideNum, color, sideIndent, rotateAngle, isFill)
```