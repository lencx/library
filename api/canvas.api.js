/**
 * Utility functions for the canvas package
 * @author Lencx
 * @license Apache-2.0
 */

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
 * => drawRect(200, 200, 100, 100, 'red') // red rectangle is not filled
 * => drawRect(200, 400, 100, 100, 'green', true) // green rectangle is filled
 * => drawRect(0, 0, 500, 500, 'clear') // clears the specified rectangle area
 * => drawRect(200, 200, 200, 100, 'red', 10) // not filled and line width is `10`
 */
function drawRect(x, y, width, height, color, isFill, isClear) {
    if(color === 'clear') {
        ctx.clearRect(x, y, width, height)
    } else {
        if(isFill === true) {
            ctx.fillStyle = color
            ctx.fillRect(x, y, width, height)
        } else {
            if(typeof isFill === 'number') ctx.lineWidth = isFill
            ctx.strokeStyle = color
            ctx.strokeRect(x, y, width, height)
        }
    }
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
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true, false)
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, 10, false) // not filled and line widtth is `10`
 */
function drawArc(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill, isOnlyArc) {
    if(isFill === true) {
        ctx.fillStyle = color
        ctx.beginPath()
        arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
        ctx.closePath()
        ctx.fill()
    } else {
        if(typeof isFill === 'number') ctx.lineWidth = isFill
        ctx.strokeStyle = color
        ctx.beginPath()
        arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
        !isOnlyArc ? ctx.closePath() : ''
        ctx.stroke()
    }
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
 * => drawSector()
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true)
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, 5) // not filled and line width is `5`
 */
function drawSector(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
    ctx.closePath()
    if(isFill === true) {
        ctx.fillStyle = color
        ctx.fill()
    } else {
        if(typeof isFill === 'number') ctx.lineWidth = isFill
        ctx.strokeStyle = color
        ctx.stroke()
    }
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
 * => drawRoundRect(200, 200, 100, 200, 10, '#00f', true, null, 2, undefined, 4) // top-right and bottom-left enable rounded. `2` and `4` can be replaced with `String`
 * => drawRoundRect(200, 200, 100, 200, 10, '#00f', true)
 * => drawRoundRect(200, 200, 100, 200, 10, '#00f', 5) // not filled and line width is `5`
 */
function drawRoundRect(x, y, width, height, radius, color, isFill, tr, br, bl, tl) {
    ctx.beginPath()
    let xr = x + radius
    let xw = x + width
    let yr = y + radius
    let yw = y + width
    let yh = y + height
    tl || tr || br || bl ? ctx.moveTo(x, y) : ctx.moveTo(xr, y)
    tr === undefined || tr === null ? ctx.arcTo(xw, y, xw, yr, radius) : ctx.lineTo(xw, y)
    br === undefined || br === null  ? ctx.arcTo(xw, yh, xw - radius, yh, radius) : ctx.lineTo(xw, yh)
    bl === undefined || bl === null  ? ctx.arcTo(x, yh, x, yh - radius, radius) : ctx.lineTo(x, yh)
    tl === undefined || tl === null  ? ctx.arcTo(x, y, xr, y, radius) : ctx.lineTo(x, y)
    ctx.closePath()
    if(isFill === true) {
        ctx.fillStyle = color
        ctx.fill()
    } else {
        if(typeof isFill === 'number') ctx.lineWidth = isFill
        ctx.strokeStyle = color
        ctx.stroke()
    }
}

/**
 * Draw Solid Line
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {Number} lineWidth
 * @param {String} color
 */
function drawSolidLine(startX, startY, endX, endY, lineWidth, color) {
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.restore() // restore to the default state
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
function arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise) {
    if(startPoint === undefined) ctx.arc(x, y, radius, getAngle(startDeg), getAngle(endDeg), anticlockwise)
    switch(startPoint) {
        case 'top':
            ctx.arc(x, y, radius, getAngle(startDeg - 90), getAngle(endDeg - 90), anticlockwise)
            break
        case 'right':
            ctx.arc(x, y, radius, getAngle(startDeg), getAngle(endDeg), anticlockwise)
            break
        case 'bottom':
            ctx.arc(x, y, radius, getAngle(startDeg + 90), getAngle(endDeg + 90), anticlockwise)
            break
        case 'left':
            ctx.arc(x, y, radius, getAngle(startDeg + 180), getAngle(endDeg + 180), anticlockwise)
            break
        default:
            ctx.arc(x, y, radius, getAngle(startDeg + startPoint - 90), getAngle(endDeg + startPoint - 90), anticlockwise)
    }
}