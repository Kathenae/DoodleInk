
export default class RectTool{
  constructor(ctx){
    this.ctx = ctx;
    this.startPoint = {x: 0, y: 0};
    this.endPoint = {x: 0, y: 0}
  }
  
  onStart(x, y){
    this.startPoint.x = x;
    this.startPoint.y = y;
  }
  
  onMove(x, y){
    this.ctx.preview.clean();
    this.endPoint.x = x;
    this.endPoint.y = y;
    this.drawRect(this.startPoint, this.endPoint, this.ctx.preview)
  }
  
  onEnd(x, y){
    this.endPoint.x = x;
    this.endPoint.y = y;
    this.drawRect(this.startPoint, this.endPoint)
    this.ctx.preview.clean();
  }
  
  drawRect(startPoint, endPoint, ctx = this.ctx){
    let rect = this.makeRectBetweenPoints(startPoint, endPoint)
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }
  
  makeRectBetweenPoints(point1, point2){
    let startX = (point1.x < point2.x)? point1.x : point2.x;
    let startY = (point1.y < point2.y)? point1.y : point2.y;
    let endX = (point2.x > point1.x)? point2.x : point1.x;
    let endY = (point2.y > point1.y)? point2.y : point1.y;
    
    return {
      x: startX, 
      y: startY, 
      width: endX - startX, 
      height: endY - startY
    }
  }
  
}