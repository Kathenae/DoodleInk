export default class LineTool {
  constructor(ctx){
    this.ctx = ctx;
    this.startX = 0;
    this.startY = 0;
  }
  
  onStart(x, y){
    this.startX = x;
    this.startY = y;
  }
  
  onEnd(x, y){
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  
}