export default class EraserTool{
  constructor(ctx){
    this.ctx = ctx;
    this.size = 50;
  }
  
  onMove(x, y){
    const centerOffset = this.size / 2;
    x = x - centerOffset;
    y = y - centerOffset;
    this.ctx.clearRect(x, y, this.size, this.size);
    
    this.ctx.preview.clean();
    this.ctx.preview.strokeStyle = "black";
    this.ctx.preview.fillStyle = "white";
    this.ctx.preview.lineWidth = 1;
    this.ctx.preview.strokeRect(x, y, this.size, this.size);
  }
  
  onEnd(x, y){
    this.ctx.preview.clean();
  }
  
  setSize(value){
    this.size = Number(value);
  }
  
  getSize(){
    return this.size;
  }
  
}