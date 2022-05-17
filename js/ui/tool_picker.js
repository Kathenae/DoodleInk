import PencilTool from "../core/canvas_tools/pencil.js";
import LineTool from "../core/canvas_tools/line.js";
import RectTool from "../core/canvas_tools/rect.js";
import EraserTool from "../core/canvas_tools/eraser.js";

export default class ToolPicker{
  constructor(ctx){
  
    // Initialize canvas tools
    this.tools = {
      pencil: new PencilTool(ctx),
      eraser : new EraserTool(ctx),
      line: new LineTool(ctx),
      rect : new RectTool(ctx),
    }
    
    // Setup tool buttons
    this.tools.pencil.button = document.getElementById("pencilButton");
    this.tools.eraser.button = document.getElementById("eraserButton");
    this.tools.line.button = document.getElementById("lineButton");
    this.tools.rect.button = document.getElementById("rectButton");
    
    // Change tool when its button is clicked
    for(var toolName in this.tools){
      let tool = this.tools[toolName];
      tool.button.addEventListener("click", (evt) => {
        this.changeCurrentTool(tool);
      })
    }
    
    this.currentTool = this.tools.pencil;
  }
  
  changeCurrentTool(tool){
    if(this.currentTool.button){
      this.currentTool.button.classList.toggle("bg-primary")
    }
    
    if(tool.button){
      tool.button.classList.toggle("bg-primary");
    }
    
    this.currentTool = tool;
  }
  
  getCurrentTool(){
    return this.currentTool;
  }
}