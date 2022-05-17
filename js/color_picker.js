export default class ColorPicker{
  
  constructor(ctx){
    this.ctx = ctx;
    const colorSlots = document.getElementsByClassName("btn-colorslot");
    this.currentSlot = document.querySelector(".btn-colorslot.selected");
    const defaulColors = ["red", "blue", "green", "yellow", "black", "orange"];
    this.setSelectedSlot(colorSlots[4]);
    
    //Setup slots
    for (let i = 0; i < colorSlots.length; i++) {
      let slot = colorSlots[i];
      slot.style.backgroundColor = defaulColors[i];
      slot.onclick = (evt) => {
        evt.preventDefault();
        this.setSelectedSlot(slot);
      }
    }
    
  }
  
  setSelectedSlot(colorSlot){
    this.currentSlot.classList.toggle("selected");
    colorSlot.classList.toggle("selected");
    this.currentSlot = colorSlot;
    this.ctx.strokeStyle = colorSlot.style.backgroundColor;
  }
  
}