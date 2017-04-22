/**
 * Utility functions for the canvas package
 * @author Lencx
 * @license Apache-2.0
 */

'use strict';

function CanvasApp(selector) {
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext('2d')
}
// Usage:
// let $ = new CanvasApp('#myCanvas')

/**
 * Draw Rect
 * [filled rectangle | rectangle outline | clears the specified rectangle area]
 * @param {Object} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} [color | clear]
 * @param {Boolean|Number} isFill | lineWidth - default value: `false` [not filled]
 * @example
 * => $.drawRect(200, 200, 100, 100, 'red') // red rectangle is not filled
 * => $.drawRect(200, 400, 100, 100, 'green', true) // green rectangle is filled
 * => $.drawRect(0, 0, 500, 500, 'clear') // clears the specified rectangle area
 * => $.drawRect(200, 200, 200, 100, 'red', 10) // not filled and line width is `10`
 */
CanvasApp.prototype.drawRect = function(x, y, width, height, color, isFill) {
    if(color === 'clear') {
        this.ctx.clearRect(x, y, width, height)
    } else {
        if(isFill === true) {
            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, width, height)
        } else {
            if(typeof isFill === 'number') this.ctx.lineWidth = isFill
            this.ctx.strokeStyle = color
            this.ctx.strokeRect(x, y, width, height)
        }
    }
    this.ctx.restore()
}

/**
 * Draw Arc
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} startDeg
 * @param {Number} endDeg
 * @param {String} color
 * @param {String|Number} startPoint - String: [top | right | bottom | left] | Number: [0 - 360]
 * @param {Boolean} anticlockwise - default value: `false` [clockwise]
 * @param {Boolean|Number} isFill | lineWidth - default value: `false` [not filled]
 * @param {Boolean} isOnlyArc - default value: `false` [There are connections, the closed arc]
 * @example
 * => $.drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => $.drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => $.drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => $.drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true, false)
 * => $.drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, 10, false) // not filled and line widtth is `10`
 */
CanvasApp.prototype.drawArc = function(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill, isOnlyArc) {
    if(isFill === true) {
        this.ctx.fillStyle = color
        this.ctx.beginPath()
        this.arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
        this.ctx.closePath()
        this.ctx.fill()
    } else {
        if(typeof isFill === 'number') this.ctx.lineWidth = isFill
        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
        !isOnlyArc ? this.ctx.closePath() : ''
        this.ctx.stroke()
    }
    this.ctx.restore()
}

/**
 * Draw Sector
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} startDeg
 * @param {Number} endDeg
 * @param {String} color
 * @param {String|Number} startPoint - default value: `90deg` [clockwise] | String: [top | right | bottom | left] | Number: [0 - 360]
 * @param {Boolean} anticlockwise - default value: `false` [clockwise]
 * @param {Boolean|Number} isFill | lineWidth - default value: `false` [not filled]
 * @example
 * => $.drawSector()
 * => $.drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => $.drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => $.drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => $.drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true)
 * => $.drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, 5) // not filled and line width is `5`
 */
CanvasApp.prototype.drawSector = function(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill) {
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
    this.ctx.closePath()
    if(isFill === true) {
        this.ctx.fillStyle = color
        this.ctx.fill()
    } else {
        if(typeof isFill === 'number') this.ctx.lineWidth = isFill
        this.ctx.strokeStyle = color
        this.ctx.stroke()
    }
    this.ctx.restore()
}

/**
 * Draw Rounded Rect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} radius
 * @param {String} color
 * @param {Boolean|Number} isFill | lineWidth - default value: `false` [not filled]
 * @param {String|Number} tr [top-right] - `undefined` or `null` is enable rounded, in the remaining cases, rounded corners are disabled
 * @param {String|Number} br [bottom-right] - as with the above usage
 * @param {String|Number} bl [bottom-left] - as with the above usage
 * @param {String|Number} tl [top-left] - as with the above usage
 * @example
 * => $.drawRoundRect(200, 200, 100, 200, 10, '#00f', true, null, 2, undefined, 4) // top-right and bottom-left enable rounded. `2` and `4` can be replaced with `String`
 * => $.drawRoundRect(200, 200, 100, 200, 10, '#00f', true)
 * => $.drawRoundRect(200, 200, 100, 200, 10, '#00f', 5) // not filled and line width is `5`
 */
CanvasApp.prototype.drawRoundRect = function(x, y, width, height, radius, color, isFill, tr, br, bl, tl) {
    this.ctx.beginPath()
    let xr = x + radius
    let xw = x + width
    let yr = y + radius
    let yw = y + width
    let yh = y + height
    tl || tr || br || bl ? this.ctx.moveTo(x, y) : this.ctx.moveTo(xr, y)
    tr === undefined || tr === null ? this.ctx.arcTo(xw, y, xw, yr, radius) : this.ctx.lineTo(xw, y)
    br === undefined || br === null ? this.ctx.arcTo(xw, yh, xw - radius, yh, radius) : this.ctx.lineTo(xw, yh)
    bl === undefined || bl === null ? this.ctx.arcTo(x, yh, x, yh - radius, radius) : this.ctx.lineTo(x, yh)
    tl === undefined || tl === null ? this.ctx.arcTo(x, y, xr, y, radius) : this.ctx.lineTo(x, y)
    this.ctx.closePath()
    if(isFill === true) {
        this.ctx.fillStyle = color
        this.ctx.fill()
    } else {
        if(typeof isFill === 'number') this.ctx.lineWidth = isFill
        this.ctx.strokeStyle = color
        this.ctx.stroke()
    }
    this.ctx.restore()
}

/**
 * Draw Polygon
 * @param {Number} centerX
 * @param {Number} centerY
 * @param {Number} sideLen - side length
 * @param {Number} sideNum - Polygon number
 * @param {String} color
 * @param {Number} sideIndent [0 - 1] - default value: 0.38 // `1` is a regular polygon
 * @param {Number} rotateAngle - rotate angle [0 - 360] default value: `270`
 * @param {Boolean|Number} isFill | lineWidth - default value: `false` [not filled]
 * @example
 * => $.drawPolygon(200, 200, 150, 5, '#000', .38, 270, true) // Five-pointed star and filled
 * => $.drawPolygon(200, 200, 150, 5, '#000', 1, 270, 10) // Positive pentagon
 * => $.drawPolygon(200, 200, 150, 3, '#000', 1, 270, true) // Regular triangle
 */
CanvasApp.prototype.drawPolygon = function(centerX, centerY, sideLen, sideNum, color, sideIndent, rotateAngle, isFill) {
    let sideIndentRadius = sideLen * (sideIndent || .38)
    sideIndent === 1 ? sideNum = sideNum / 2 : sideNum
    let rotate = rotateAngle ? rotateAngle * Math.PI / 180 : -Math.PI / 2
    let angle = Math.PI / sideNum

    this.ctx.save()
    this.ctx.beginPath()
    let x = centerX + Math.cos(rotate) * sideLen
    let y = centerY + Math.sin(rotate) * sideLen
    this.ctx.moveTo(x, y)
    for(let i=0; i<=sideNum*2; i++) {
        let r = angle * i + rotate
        let len = (i % 2) ? sideIndentRadius : sideLen
        let x = centerX + Math.cos(r) * len
        let y = centerY + Math.sin(r) * len
        this.ctx.lineTo(x, y)
    }
    this.ctx.closePath()
    if(isFill === true) {
        this.fillStyle = color
        this.ctx.fill()
    } else {
        if(typeof isFill === 'number') this.ctx.lineWidth = isFill
        this.ctx.strokeStyle = color
        this.ctx.stroke()
    }
    this.ctx.restore()
}

/**
 * Draw Solid Line
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {String} color
 * @param {Number} lineWidth
 * @param {String} lineCap - [butt | round | square]
 * @example
 * => $.drawSolidLine(100, 100, 200, 200, 'red', 5)
 * => $.drawSolidLine(100, 100, 300, 200, 'red', 8, 'round')
 */
CanvasApp.prototype.drawSolidLine = function(startX, startY, endX, endY, color, lineWidth, lineCap) {
    this.ctx.save()
    this.ctx.strokeStyle = color
    lineCap ? this.ctx.lineCap = lineCap : ''
    this.ctx.lineWidth = lineWidth
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX, endY)
    this.ctx.stroke()
    this.ctx.restore() // restore to the default state
}

/**
 * Draw Dash Line
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {String} color
 * @param {Array} setLineDash - default value: [4, 8]  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
 * @param {Number} lineWidth
 * @param {String} lineCap - [butt | round | square]
 * @example
 * $.drawDashLine(100, 200, 600, 600, 'red', [10, 15], 5)
 * $.drawDashLine(100, 200, 500, 600, 'green', [5, 10, 20], 3)
 * $.drawDashLine(100, 200, 500, 600, 'green', [5, 15, 20], 5, 'round')
 */
CanvasApp.prototype.drawDashLine = function(startX, startY, endX, endY, color, setLineDash, lineWidth, lineCap) {
    this.ctx.save()
    this.ctx.lineWidth = lineWidth
    lineCap ? this.ctx.lineCap = lineCap : ''
    this.ctx.strokeStyle = color
    this.ctx.beginPath()
    setLineDash ? this.ctx.setLineDash(setLineDash) : this.ctx.setLineDash([4, 8])
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX, endY)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.restore()
}

/*************************************************************************************/
/**
 * Deg => Angle
 * @param {Number} deg
 * @return {Number} angle
 */
function getAngle(deg) {
    return Math.PI * deg / 180
}

/**
 * Arc Starting Ponit
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} startDeg
 * @param {Number} endDeg
 * @param {String} color
 * @param {String|Number} startPoint - default value: `90deg` [clockwise] | String: [top | right | bottom | left] | Number: [0 - 360]
 * @param {Boolean} anticlockwise - default value: `false` [clockwise]
 */
CanvasApp.prototype.arcStartPoint = function(x, y, radius, startDeg, endDeg, startPoint, anticlockwise) {
    if(startPoint === undefined) this.ctx.arc(x, y, radius, getAngle(startDeg), getAngle(endDeg), anticlockwise)
    switch(startPoint) {
        case 'top':
            this.ctx.arc(x, y, radius, getAngle(startDeg - 90), getAngle(endDeg - 90), anticlockwise)
            break
        case 'right':
            this.ctx.arc(x, y, radius, getAngle(startDeg), getAngle(endDeg), anticlockwise)
            break
        case 'bottom':
            this.ctx.arc(x, y, radius, getAngle(startDeg + 90), getAngle(endDeg + 90), anticlockwise)
            break
        case 'left':
            this.ctx.arc(x, y, radius, getAngle(startDeg + 180), getAngle(endDeg + 180), anticlockwise)
            break
        default:
            this.ctx.arc(x, y, radius, getAngle(startDeg + startPoint - 90), getAngle(endDeg + startPoint - 90), anticlockwise)
    }
}