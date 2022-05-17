export default class PencilTool{
  constructor(ctx){
    this.ctx = ctx;
  }
  
  onStart(x, y){
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  
  onMove(x, y){
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  
  onEnd(x, y){
    this.ctx.closePath();
  }
  
}