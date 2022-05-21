import ColorSelector from "./ui/ColorSelector.js";
import ToolSelector from "./ui/ToolSelector.js";
import UndoTool from "./core/UndoHandler.js";

// Setup the canvas 
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

// Setup preview canvas, which can be used by tools
// to draw previews of what they will do
const canvasPreview = document.getElementById("canvasPreview");
canvasPreview.width = canvas.width;
canvasPreview.height = canvas.height;
ctx.preview = canvasPreview.getContext("2d");
ctx.preview.lineWidth = 1;
ctx.preview.strokeStyle = "magenta";

// used to clean the preview
ctx.preview.clean = () => {
  ctx.preview.clearRect(0,0, canvas.width, canvas.height);
}

const colorSelector = new ColorSelector(ctx);
const tools = new ToolSelector(ctx);

// canvas drawing events handling,
// Note: we're listening on canvasPreview because its on top of the main canvas
canvasPreview.addEventListener("touchstart", onStart);
canvasPreview.addEventListener("touchmove", onMove);
canvasPreview.addEventListener("touchend", onEnd);
canvasPreview.addEventListener("mousedown", onStart);
canvasPreview.addEventListener("mousemove", onMove);
canvasPreview.addEventListener("mouseup", onEnd);

// Current x, y point
let currentTouchPoint = null;

function onStart(evt){
  evt.preventDefault();
  let touchPoint = getTouchPoint(evt);
  currentTouchPoint = touchPoint;
  undoTool.onPreEdit();
  if(tools.getActiveTool().onStart)
    tools.getActiveTool().onStart(touchPoint.x, touchPoint.y);
}

function onMove(evt){
  evt.preventDefault();
  let touchPoint = getTouchPoint(evt);
  currentTouchPoint = touchPoint;
  if(tools.getActiveTool().onMove)
    tools.getActiveTool().onMove(touchPoint.x, touchPoint.y);
}

function onEnd(evt){
  evt.preventDefault();
  if(tools.getActiveTool().onEnd)
    tools.getActiveTool().onEnd(currentTouchPoint.x, currentTouchPoint.y);
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