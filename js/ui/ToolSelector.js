import PencilTool from "../core/tools/PencilTool.js";
import LineTool from "../core/tools/LineTool.js";
import RectTool from "../core/tools/RectTool.js";
import EraserTool from "../core/tools/EraserTool.js";

export default class ToolSelector{
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
    this.tools.pencil.settingsMenu = document.getElementById("pencilToolSettings");
    this.tools.pencil.settingsMenu.hidden = true;
    
    this.tools.eraser.button = document.getElementById("eraserButton");
    this.tools.eraser.settingsMenu = document.getElementById("eraserToolSettings");
    this.tools.eraser.settingsMenu.hidden = true;
    
    this.tools.line.button = document.getElementById("lineButton");
    this.tools.line.settingsMenu = document.getElementById("lineToolSettings");
    this.tools.line.settingsMenu.hidden = true;
    
    this.tools.rect.button = document.getElementById("rectButton");
    this.tools.rect.settingsMenu = document.getElementById("rectToolSettings");
    this.tools.rect.settingsMenu.hidden = true;
    
    // Change tool when its button is clicked
    for(let toolName in this.tools){
      let tool = this.tools[toolName];
      this.setupSettigs(tool);
      tool.button.addEventListener("click", (evt) => {
        this.setActiveTool(tool);
      })
      
    }
    
    this.activeTool = this.tools.pencil;
    this.setActiveTool(this.tools.pencil);
  }
  
  setActiveTool(tool){
    this.switchActiveToolButton(tool);
    this.switchActiveToolSettingsMenu(tool);
    this.switchToolSettingsIcon(tool);
    this.activeTool = tool;
  }
  
  switchActiveToolButton(tool){
    if(this.activeTool.button){
      this.activeTool.button.classList.toggle("bg-primary")
    }
    
    if(tool.button){
      tool.button.classList.toggle("bg-primary");
    }
  }
  
  switchActiveToolSettingsMenu(tool){
    
    if(this.activeTool.settingsMenu){
      this.activeTool.settingsMenu.hidden = true;
    }
    
    if(tool.settingsMenu){
      tool.settingsMenu.hidden = false;
      this.enableToolSettingsMenu(true);
    }else{
      this.enableToolSettingsMenu(false);
    }
  }
  
  enableToolSettingsMenu(enabled){
    let menu = document.getElementById("toolSettings");
    let toggleButton = document.getElementById("toolSettingsButton");
    menu.hidden = enabled == false;
    toggleButton.hidden = enabled == false;
  }
  
  switchToolSettingsIcon(tool){
    let settingsButton = document.getElementById("toolSettingsButton");
    let toolSettingsIcon = settingsButton.querySelector("#toolIcon");
    toolSettingsIcon.src = tool.button.querySelector("img").src;
  }
  
  setupSettigs(tool){
    if(tool.settingsMenu == null){
      return;
    }
    
    let settingInputs = tool.settingsMenu.querySelectorAll("input, select");
    
    settingInputs.forEach(input => {
      this.setupToolInputDefault(input, tool);
      input.addEventListener('change', (evt) => this.onToolSettingChanged(evt.target, tool))
    })
    
  }
  
  onToolSettingChanged(settingInput, tool){
    
    let n = settingInput.name;
    let setter = "set" + n[0].toUpperCase() + n.slice(1, n.length);
    let toolHasSetting = tool[setter] != null;
    
    let value = settingInput.value;
    if(settingInput.type == "checkbox"){
      value = settingInput.checked;
    }
    
    if(toolHasSetting){
      tool[setter](value);
    }
  }
  
  setupToolInputDefault(settingInput, tool){
    let n = settingInput.name;
    let getter = "get" + n[0].toUpperCase() + n.slice(1, n.length);
    if(tool[getter]){
      settingInput.value = tool[getter]();
    }
  }
  
  
  getActiveTool(){
    return this.activeTool;
  }
}