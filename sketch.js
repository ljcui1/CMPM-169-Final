let drawArea;

let palette;

let capture;
let takePic;

let img;
let imgSel = false;
let start = true;

let drawing;
let restart = true;

let b;
let p;
let e;

let camOrImg = true;

let savePng;
let disk;

let b_size;
let p_size;
let e_size;

let currBrush = "brush";

let pencil;
let brush;
let eraser;
let redo;

let cam;
let sel;

let hueDown;
let hueUp;
let hu;

let satDown;
let satUp;
let sat;

let brightDown;
let brightUp;
let bright;

let pixelShuf;
let pixel;

let size;
let val = 5;

let currR;
let currG;
let currB;

function setup() {
  createCanvas(1000, 825);
  colorPicker();
  
  frameRate(1000);
  
  background(200, 200, 200);
  
  b = true;
  p = false;
  e = false;
  
  currR = 0;
  currG = 0;
  currB = 0;
  
  brush = new toolButton(width/50, (height/33) + (height/82.5), width/20, 2 * (height/33), "🖌", b);
  pencil = new toolButton (17 * (width/200), (height/33) + (height/82.5), width/20, 2 * (height/33), "✐", p);
  eraser = new toolButton(width/50, 4 * (height/33), width/20, 2 * (height/33), "⌧", e);
  redo = new toolButton(17 * (width/200), 4 * (height/33), width/20, 2 * (height/33), "✖", restart);
  
  sel = new toolButton(width/50, 14 * (height/33), 6 * (width/50), 30, "📂", imgSel);
  cam = new toolButton(width/50, 16 * (height/33), 6 * (width/50), 30, "📸", camOrImg);
  disk = new toolButton(width/50, 18 * (height/33), 6 * (width/50), 30, "💾", savePng);
  
  hueDown = new toolButton(width/50, 20.5 * (height/33), 2.5 * (width/50), 30, "<", hu);
  hueUp = new toolButton(4.5 * (width/50), 20.5 * (height/33), 2.5 * (width/50), 30, ">", hu);
  satDown = new toolButton(width/50, 23 * (height/33), 2.5 * (width/50), 30, "<", sat);
  satUp = new toolButton(4.5 * (width/50), 23 * (height/33), 2.5 * (width/50), 30, ">", sat);
  brightDown = new toolButton(width/50, 25.5 * (height/33), 2.5 * (width/50), 30, "<", bright);
  brightUp = new toolButton(4.5 * (width/50), 25.5 * (height/33), 2.5 * (width/50), 30, ">", bright);
  
  pixelShuf = new toolButton(width/50, 29 * (height/33), 6 * (width/50), 50, "🔀", pixel);
  
  
  size = new sizeSlider(width/50, 12 * (height/33), 6 * (width/50), 2 * (height/165), currBrush);
  
  capture = createCapture(VIDEO);
  capture.hide();
  
}

function draw() {
  //frame
  if(restart == true && camOrImg == false){
    stroke(150, 150, 150);
    fill(255, 255, 255);
    rect(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33));
    
    restart = false;
  }else if(restart == true && camOrImg == true){
    image(capture, width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33));
    cam.display();
    if(takePic){
      restart = false;
    }
  }
  
  /*fill(200);
  rect(0, 0, width, height/33);
  rect(0, 27 * (height/33), width, 6 * (height/33));
  rect(0, 0, 3 * (width/20), height);*/
  
  brush.display();
  pencil.display();
  eraser.display();
  redo.display();
  sel.display();
  cam.display();
  disk.display();
  hueDown.display();
  hueUp.display();
  satDown.display();
  satUp.display();
  brightDown.display();
  brightUp.display();
  pixelShuf.display();
  
  image(palette, (2 * width/5) + width/40, (4 * height/5) + height/27.5, width/2 + width/20, height/7.5 + height/165);
  noFill();
  stroke(0);
  rect(17 * (width/40), 138 * (height/165), 11 * (width/20), 23 * (height/165));
  
  fill(currR, currG, currB);
  rect(61 * (width/200), 138 * (height/165), width/10, 4 * (height/33));
  
  stroke(0);
  textSize(15);
  strokeWeight(0);
  text("Current Color", 71 * (width/200), 161 * (height/165));
  text("Hue", 4 * (width/50), 20 * (height/33))
  text("Saturation", 4 * (width/50), 22.5 * (height/33))
  text("Brightness", 4 * (width/50), 25 * (height/33))
  
  size.display();
  
  //info
  fill(0);
  noStroke();
  textSize(18);
  text("🖌 Brush Tool\n✐ Pencil Tool\n⌧ Eraser Tool\n✖ Clear Canvas", 3 * width/40, 46 * (height/165));
  
  if(start){
    if(img != null){
      image(img, width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33));
      imgSel = true;
      start = false;
    }
  }
  
  
  
}

function mousePressed(){
  brush.handleClick();
  pencil.handleClick();
  eraser.handleClick();
  redo.handleClick();
  sel.handleClick();
  cam.handleClick();
  disk.handleClick();
  hueDown.handleClick();
  hueUp.handleClick();
  satDown.handleClick();
  satUp.handleClick();
  brightDown.handleClick();
  brightUp.handleClick();
  pixelShuf.handleClick();
  
  if(mouseX >= 17 * (width/40) && mouseX < palette.width + 17 * (width/40) && mouseY >= 138 * (height/165) && mouseY < palette.height + 138 * (height/165)){
    //colorMode(RGB, 255);
    const currColor = palette.get(mouseX - 17 * (width/40), mouseY - 138 * (height/165));
    console.log(currColor);
    currR = red(currColor);
    currG = green(currColor);
    currB = blue(currColor);
    
    
  }
  
  size.moved();
  
 
}

function mouseDragged(){
  yellDraw();
 
}

function saveToPNG(fileName){
  let capturedPixels = get(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33));
  capturedPixels.save(fileName, 'png');
}

function selectImage(){
  let input = createFileInput(handleFile);
  input.position(width/10 + width/20, height/33);
}

function handleFile(file){
  if(file.type === 'image'){
    img = loadImage(file.data, () => {
      start = true;
      let input = select('input[type="file"]');
      input.remove();
    });
    
  }else{
    alert('Please select an image file.');
  }
}

function pixelShuffle(x, y, w, h){
  let areaPixels = [];
  
  for(let i = x; i < x + w; i++){
    for(let j = y; j < y + h; j++){
      areaPixels.push(get(i, j));
    }
  }
  
  for(let i = areaPixels.length - 1; i > 0; i--){
    let j = int(random(i + 1));
    let temp = areaPixels[i];
    areaPixels[i] = areaPixels[j];
    areaPixels[j] = temp;
  }
  
  let index = 0;
  for(let i = x; i < x + w; i++){
    for(let j = y; j < y + h; j++){
      set(i, j, areaPixels[index]);
      index++;
    }
  }
  updatePixels();
}

function Hued(x, y, w, h, deltaHue){
  console.log(`Hued called with x=${x}, y=${y}, w=${w}, h=${h}, deltaHue=${deltaHue}`);
  
  colorMode(HSB, 260, 100, 100, 255);
  
  
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      let c = get(i, j);

      let newHue = (hue(c) + deltaHue) % 360;
      let newColor = color(newHue, saturation(c), brightness(c), alpha(c));

      set(i, j, newColor);
    }
  }

  updatePixels();
  colorMode(RGB, 255);
  
}

function Saturationed(x, y, w, h, deltaSaturation){
  colorMode(HSB, 260, 100, 100, 255);
  
  
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      let c = get(i, j);

      let newSaturation = constrain(saturation(c) + deltaSaturation, 0, 100);
      let newColor = color(hue(c), newSaturation, brightness(c), alpha(c));

      set(i, j, newColor);
    }
  }

  updatePixels();
  colorMode(RGB, 255);
  
}

function Brightnessed(x, y, w, h, deltaBrightness){
  colorMode(HSB, 260, 100, 100, 255);
  
  
  for (let i = x; i < x + w; i++) {
    for (let j = y; j < y + h; j++) {
      let c = get(i, j);

      let newBrightness = constrain(brightness(c) + deltaBrightness, 0, 100);
      let newColor = color(hue(c), saturation(c), newBrightness, alpha(c));

      set(i, j, newColor);
    }
  }

  updatePixels();
  colorMode(RGB, 255);
  
}

function colorPicker(){
  palette = createGraphics(width/2 + width/20, height/7.5 + height/165);
  palette.colorMode(HSB);
  palette.noStroke();
  
  for(let i = 0; i < palette.width; i++){
    for(let j = 0; j < palette.height; j++){
      const h = palette.map(i, 0, palette.width, 0, 360);
      const s = palette.map(j, 0, palette.height, 100, 0);
      const b = palette.map(i * j, 0, palette.width * palette.height, 100, 0);
      palette.fill(palette.color(h, s, b));
      palette.rect(i, j, 1, 1);
    }
  }
}

function yellDraw(){
  if(mouseX >= width/10 + width/20 && mouseX <= (9 * width/10) + (3 * width/40) && mouseY >= height/33 && mouseY <= (27 * height/33)){
    noStroke();
    console.log("color:" + currR + ", " + currG + ", " + currB);
    if(b){
      fill(currR, currG, currB);
      circle(mouseX, mouseY, val);
      currBrush = "brush";
      console.log("brush");
    }else if(p){
      fill(currR, currG, currB);
      rect(mouseX, mouseY, val, val);
      currBrush = "pencil";
      console.log("pencil");
    }else if(e){
      fill(255);
      circle(mouseX, mouseY, val);
      currBrush = "eraser";
      console.log("eraser");
    }
  }
}

//tool button class
class toolButton {
  constructor(x, y, w, h, label, onClick){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClick = onClick;
    this.hovered = false;
    
  }
  
  display(){
    if(mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h){
      this.hovered = true;
      fill(210);
      
    }else{
      this.hovered = false;
      fill(200);
    }
    
    //actual button
    rect(this.x, this.y, this.w, this.h);
    if(this.label == "📂" || this.label == "📸" || this.label == "💾"){
      textSize(25);
    }else{
      textSize(40);
    }
    
    textAlign(CENTER, CENTER);
    fill(0);
    text(this.label, this.x + this.w/2, this.y + this.h/2);
    
     //shading
    stroke(255);
    line(this.x, this.y, this.x + this.w, this.y);
    line(this.x, this.y, this.x, this.y + this.h);
    
    stroke(0);
    line(this.x + this.w, this.y, this.x + this.w, this.y + this.h);
    line(this.x + this.w, this.y + this.h, this.x, this.y + this.h);
    
    
  }
  
  handleClick(){
    if(this.hovered){
      restart = false;
      if(this.label == "🖌"){
        b = true;
        p = false;
        e = false;
      }else if(this.label == "✐"){
        p = true;
        b = false;
        e = false;
      }else if(this.label == "⌧"){
        e = true;
        b = false;
        p = false;
      }else if(this.label == "✖"){
        takePic = false;
        restart = true;
      }else if(this.label == "📂"){
        camOrImg = false;
        imgSel = false;
        selectImage();
        
      }else if(this.label == "📸"){
        if(camOrImg == false){
          camOrImg = true;
          takePic = false;
          restart = true;
        }else{
          takePic = true;
        }
      }else if(this.label == "💾"){
        let fileName = "Painting_" + year() + nf(month(), 2) + nf(day(),2) + "_" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
        saveToPNG(fileName);
      }else if(this.label == "<"){
        if(this.y == (21 * (height/33))){
          Hued(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), -0.1);
        }else if(this.y == (24 * (height/33))){
          Saturationed(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), -0.1);
        }else if(this.y == (27 * (height/33))){
          Brightnessed(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), -0.1);
        }
      }else if(this.label == ">"){
        if(this.y == (21 * (height/33))){
          Hued(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), 0.1);
        }else if(this.y == (24 * (height/33))){
          Saturationed(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), 0.1);
        }else if(this.y == (27 * (height/33))){
          Brightnessed(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33), 0.1);
        }
      }else if(this.label == "🔀"){
        pixelShuffle(width/10 + width/20, height/33, (8 * width/10) + width/40, (26 * height/33));
      }
    }
  }
  
}

class sizeSlider{
  constructor(x, y, w, h, txt){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
  }
  
  display(){
    
    fill(currR, currG, currB);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    stroke(0);
    rect(map(val, 0, 100, this.x, this.x + this.w - 10), this.y, 10, this.h);
    
    fill(0);
    textSize(15);
    text(this.txt, this.x + this.w/2, this.y + this.h + 15);
    text(val, this.x + this.w/2, this.y - 10);
  }
  
  moved(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      fill(200);
      rect(this.x, this.y - 20, 120, 30);
      val = floor(map(constrain(mouseX, this.x, this.x + this.w), this.x, this.x + this.w, 0, 100));
    }
  }
  
}

