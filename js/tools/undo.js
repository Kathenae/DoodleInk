export default class UndoTool{
  constructor(ctx){
    this.ctx = ctx;
    this.editHistory = [];
  }
  
  onPreEdit(){
    this._storeImageState();
  }
  
  undo(){
    this._restorePreviousImageState();
  }
  
  _storeImageState(){
    let width = this.ctx.canvas.width;
    let height = this.ctx.canvas.height;
    let imageData = this.ctx.getImageData(0, 0, width, height);
    this.editHistory.push(imageData);
  }

  _restorePreviousImageState(){
    let imageData = this.editHistory.pop();
    if(imageData){
      this.ctx.putImageData(imageData, 0, 0);
    }
  }
}