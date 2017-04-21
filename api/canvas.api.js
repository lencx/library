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
 * @param {Boolean} isFill - default value: `false` [not filled]
 * @example
 * => drawRect(200, 200, 100, 100, 'red') // red rectangle is not filled
 * => drawRect(200, 400, 100, 100, 'green', true) // green rectangle is filled
 * => drawRect(0, 0, 500, 500, 'clear') // clears the specified rectangle area
 */
function drawRect(x, y, width, height, color, isFill, isClear) {
    if(color === 'clear') {
        ctx.clearRect(x, y, width, height)
    } else {
        if(isFill) {
            ctx.fillStyle = color
            ctx.fillRect(x, y, width, height)
        } else {
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
 * @param {Boolean} isFill - default value: `false` [not filled]
 * @param {Boolean} isOnlyArc - default value: `false` [There are connections, the closed arc]
 * @example
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => drawArc(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true, false)
 */
function drawArc(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill, isOnlyArc) {
    if(isFill) {
        ctx.fillStyle = color
        ctx.beginPath()
        arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
        ctx.closePath()
        ctx.fill()
    } else {
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
 * @param {Boolean} isFill - default value: `false` [not filled]
 * @example
 * => drawSector()
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)')
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'top')
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 'bottom', true)
 * => drawSector(200, 200, 100, 0, 80, 'rgba(0, 100, 200, .5)', 80, true, true)
 */
function drawSector(x, y, radius, startDeg, endDeg, color, startPoint, anticlockwise, isFill) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    arcStartPoint(x, y, radius, startDeg, endDeg, startPoint, anticlockwise)
    ctx.closePath()
    if(isFill) {
        ctx.fillStyle = color
        ctx.fill()
    } else {
        ctx.strokeStyle = color
        ctx.stroke()
    }
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