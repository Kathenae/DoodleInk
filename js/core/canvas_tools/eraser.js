export default class EraserTool{
  constructor(ctx){
    this.ctx = ctx;
  }
  
  onMove(x, y){
    const size = 50;
    const centerOffset = size / 2;
    this.ctx.clearRect(x - centerOffset, y - centerOffset, size, size);
  }
  
}