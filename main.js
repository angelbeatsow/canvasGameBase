let isTest = true;  //trueだとタッチ情報を上部に表示

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let touch = {x:0,y:0,"type":null};

//タッチ座標を取得するeventListennerを設定
function setEventListenner(){
  canvas.addEventListener('touchmove',(event)=>{
    var eventType = event.type;
    var x = 0, y = 0;
    const offset = canvas.getBoundingClientRect();
  	x = event.changedTouches[0].pageX;
    y = event.changedTouches[0].pageY;
    x = x - offset.left - window.pageXOffset;
    y = y - offset.top - window.pageYOffset;
    touch.type = eventType;
    touch.x = Math.floor(x);
    touch.y = Math.floor(y);
  });
    
  canvas.addEventListener('touchstart',(event)=>{
    var eventType = event.type;
    var x = 0, y = 0;
    const offset = canvas.getBoundingClientRect();
  	x = event.changedTouches[0].pageX;
    y = event.changedTouches[0].pageY;
    x = x - offset.left - window.pageXOffset;
    y = y - offset.top - window.pageYOffset;
    touch.type = eventType;
    touch.x = Math.floor(x);
    touch.y = Math.floor(y);
  });
    
  canvas.addEventListener('touchend',(event)=>{
    var eventType = event.type;
    var x = 0, y = 0;
    const offset = canvas.getBoundingClientRect();
  	x = event.changedTouches[0].pageX;
    y = event.changedTouches[0].pageY;
    x = x - offset.left - window.pageXOffset;
    y = y - offset.top - window.pageYOffset;
    touch.type = eventType;
    touch.x = Math.floor(x);
    touch.y = Math.floor(y);
  });
}
setEventListenner();

class Game {
  constructor(){
    this.scene ;
    this.objects = [];
  }
  
  update(){
    this.objects = [];
    
    if(isTest){
      document.getElementById("testSpan01").innerText = "x:" + touch.x;
      document.getElementById("testSpan02").innerText = "y:" + touch.y;
      document.getElementById("testSpan03").innerText = "type:" + touch.type;
    }
    
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }
  
  addText(_text,_x = 0,_y = 0){
    this.objects.push(new Text(_text,_x,_y));
  }
};

class Scene{
  constructor(){
    this.objects = [];
  }
};

class TitleScene extends Scene{
  constructor(){
    super();
  }
};

let game = new Game();

function mainLoop (){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  game.update();
  
  requestAnimationFrame(mainLoop);
};
mainLoop();
