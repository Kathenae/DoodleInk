export default class LineTool {
  constructor(ctx){
    this.ctx = ctx;
    this.startX = 0;
    this.startY = 0;
    this.lineWidth = 5;
  }
  
  onStart(x, y){
    this.startX = x;
    this.startY = y;
  }
  
  onMove(x, y){
    this.ctx.preview.clean();
    this.ctx.preview.beginPath();
    this.ctx.preview.moveTo(this.startX, this.startY);
    this.ctx.preview.lineTo(x, y);
    this.ctx.preview.stroke();
  }
  
  onEnd(x, y){
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    
    this.ctx.preview.clean();
  }
  
  setLineWidth(value){
    if(Number(value)){
      this.ctx.lineWidth = Number(value);
    }
  }
  
  getLineWidth(){
    return this.ctx.lineWidth;
  }
  
  setStrokeStyle(value){
    console.log(value);
  }
  
  getStrokeStyle(){
    return "lines"
  }
}