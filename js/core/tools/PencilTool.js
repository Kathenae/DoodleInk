export default class PencilTool{
  constructor(ctx){
    this.ctx = ctx;
    this.size = 5;
  }
  
  onStart(x, y){
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }
  
  onMove(x, y){
    this.ctx.lineWidth = this.size;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  
  onEnd(x, y){
    this.ctx.closePath();
  }
  
  setSize(value){
    this.size = Number(value);
  }
  
  getSize(){
    return this.size;
  }
  
}