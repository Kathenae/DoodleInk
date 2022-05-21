
export default class RectTool{
  constructor(ctx){
    this.ctx = ctx;
    this.startPoint = {x: 0, y: 0};
    this.endPoint = {x: 0, y: 0};
    this.borderWidth = 5;
    this.borderRadius = 0;
    this.filled = false;
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
    let rect = this.makeRectBetweenPoints(startPoint, endPoint);
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = this.ctx.strokeStyle;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    
    if(this.filled){
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
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
  
  setBorderWidth(value){
    this.borderWidth = Number(value);
  }
  
  getBorderWidth(){
    return this.borderWidth;
  }
  
  setCornerRadius(value){
    this.cornerRadius = Number(value);
  }
  
  getBorderRadius(){
    return this.cornerRadius;
  }
  
  setFilled(value){
    this.filled = Boolean(value);
  }
  
  getFilled(){
    return this.filled;
  }
  
}