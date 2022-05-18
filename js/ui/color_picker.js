export default class ColorPicker{
  
  constructor(ctx){
    this.ctx = ctx;
    const colorSlots = document.getElementsByClassName("btn-colorslot");
    this.currentSlot = document.querySelector(".btn-colorslot.selected");
    const defaulColors = ["red", "blue", "green", "yellow", "black", "orange"];
    this.setSelectedSlot(colorSlots[4]);
    
    // Setup slots
    for (let i = 0; i < colorSlots.length; i++) {
      let slot = colorSlots[i];
      slot.style.backgroundColor = defaulColors[i];
      slot.onclick = (evt) => {
        evt.preventDefault();
        this.setSelectedSlot(slot);
        this.applySlotColor();
      }
    }
    
    // color selection
    let colorInput = document.getElementById("colorInput");
    colorInput.onchange = (evt) => {
      this.currentSlot.style.backgroundColor = evt.target.value;
      this.applySlotColor();
    }
    
  }
  
  setSelectedSlot(colorSlot){
    this.currentSlot.classList.toggle("selected");
    colorSlot.classList.toggle("selected");
    this.currentSlot = colorSlot;
  }
  
  applySlotColor(){
    this.ctx.strokeStyle = this.currentSlot.style.backgroundColor;
  }
  
}