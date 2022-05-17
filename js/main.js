
import ColorPicker from "./color_picker.js";
import ToolPicker from "./tool_picker.js"
import UndoTool from "./tools/undo.js";

// Setup the canvas 
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

const colorPicker = new ColorPicker(ctx);
const tools = new ToolPicker(ctx);

// canvas drawing events handling
canvas.addEventListener("touchstart", onStart);
canvas.addEventListener("touchmove", onMove);
canvas.addEventListener("touchend", onEnd);
canvas.addEventListener("mousedown", onStart);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", onEnd);

// Current x, y point
let currentTouchPoint = null;

function onStart(evt){
  evt.preventDefault();
  let touchPoint = getTouchPoint(evt);
  currentTouchPoint = touchPoint;
  undoTool.onPreEdit();
  if(tools.getCurrentTool().onStart)
    tools.getCurrentTool().onStart(touchPoint.x, touchPoint.y);
}

function onMove(evt){
  evt.preventDefault();
  let touchPoint = getTouchPoint(evt);
  currentTouchPoint = touchPoint;
  if(tools.getCurrentTool().onMove)
    tools.getCurrentTool().onMove(touchPoint.x, touchPoint.y);
}

function onEnd(evt){
  evt.preventDefault();
  if(tools.getCurrentTool().onEnd)
    tools.getCurrentTool().onEnd(currentTouchPoint.x, currentTouchPoint.y);
  currentTouchPoint = null;
}

function getTouchPoint(evt){
  if(evt.touches){
    return {x : evt.touches[0].clientX, y : evt.touches[0].clientY }
  }
  else if(evt.clientX && evt.clientY){
    return {x : evt.clientX, y : evt.clientY }
  }
}


// Save, clear abd undo handling
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const undoButton = document.getElementById("undoButton");

saveButton.onclick = () => {
  saveButton.setAttribute('download', 'doodle.png');
  saveButton.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}

clearButton.onclick = (evt) => {
  undoTool.onPreEdit();
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

const undoTool = new UndoTool(ctx);
undoButton.onclick = (evt) => {
  evt.preventDefault();
  undoTool.undo();
}

