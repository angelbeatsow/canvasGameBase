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
  constructor(_scene){
    this.scene = _scene ;
    this.objects = [];
    this.fade = {flag : 0,frame : 0,nextScene :null};
    this.fadeFrame = 60;
    this.dontTouch = false;//タッチイベントを発生させないかどうか
  }

  canTouchevent(){
    if(this.dontTouch)return false;
    if(this.fade.flag != 0)return false;
    return true;
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
    this.scene.update();

    if(this.fade.flag != 0){
      //フェードアウト、フェードインの処理
      if(this.fade.flag == 1){
        this.fade.frame++;
        let _opa = this.fade.frame / (this.fadeFrame /2);//画面を覆う黒の透明度
        if(_opa > 1){
          //折り返し
          _opa = 1;
          this.fade.flag = 2;
          if(this.fade.nextScene != null){
            this.scene = this.fade.nextScene;
            this.fade.nextScene = null;
          }  
        }
        let _b = new Rect(0,0,canvas.width,canvas.height,"black",_opa);
        _b.update();
      }else if(this.fade.flag == 2){
        this.fade.frame--;
        let _opa = (this.fade.frame) / (this.fadeFrame /2);//画面を覆う黒の透明度
        if(_opa < 0){
          _opa = 0;
          this.fade.flag = 0;
          this.fade.frame = 0;
        }
        let _b = new Rect(0, 0, canvas.width, canvas.height, "black", _opa);
        _b.update();
      }
    }
  }
  
  fadeFunction(_nextScene = null){
    this.fade = {flag :1,frame:0,nextScene:_nextScene};
  }
};

class Scene{
  constructor(){
    this.basicObjects = [];
    this.objects = [];
  }

  update(){
    this.objects = [];
    this.setObjects();
    if(game.canTouchevent()){
      this.touchevent();
    }

    for (var i = 0; i < this.basicObjects.length; i++) {
      this.basicObjects[i].update();
    }
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }

  setObjects(){}  //オーバーライドする

  touchevent(){
    for (var i = 0; i < this.basicObjects.length; i++) {
      if(this.basicObjects[i].isTouch())this.basicObjects[i].touchevent();
    }
    for (var i = 0; i < this.objects.length; i++) {
      if(this.objects[i].isTouch())this.objects[i].touchevent();
    }
  }

  addRect(_x,_y,_w,_h,_color = "white",_position = null,_touchevent = null,_isBasicObjects = false){
    let targetArr;
    if (_isBasicObjects == true) targetArr = this.basicObjects;
    if (_isBasicObjects == false) targetArr = this.objects;
    let _r = new Rect(_x,_y,_w,_h,_color);
    if (_touchevent != null){
      _r.touchevent = _touchevent;
    }
    if(_position == "centerX" || _x == "center"){
      _r.x = (canvas.width - _w )/2;
    }
    targetArr.push(_r);
  }
  
  addText(_text, _x = 0, _y = 0, _maxWidth = null,_textSize = 20, _position = null,_color = "white",_touchevent = null,_isBasicObjects = false) {
    let targetArr;
    if(_isBasicObjects == true)targetArr = this.basicObjects;
    if(_isBasicObjects == false)targetArr = this.objects;
    let _t = new Text(_text, _x, _y, _maxWidth,_color);
    if(_textSize != null)_t.font = _textSize + "px sans serif"
    if(_touchevent != null){
      _t.touchevent = _touchevent;
    }
    if (_position == "centerX" || _x == "center") {
      _t.textAlign = "center";
      _t.x = canvas.width / 2;
      targetArr.push(_t);
    } else {
      targetArr.push(_t);
    }
  }
  
  addSprite(_img,_x,_y,_w=0,_h=0,_position = null,_touchevent = null,_isBasicObjects = false){
    let targetArr;
    if (_isBasicObjects == true) targetArr = this.basicObjects;
    if (_isBasicObjects == false) targetArr = this.objects;
    let _sp = new Sprite(_img,_x,_y,_w,_h);
    if(_touchevent != null)_sp.touchevent = _touchevent;
    if(_position == "centerX" || _x == "center"){
      if(_w == 0){
        _sp.x = (canvas.width - _img.width)/2;
      }else{
        _sp.x = (canvas.width - _w)/2;
      }
    }
    targetArr.push(_sp);
  }
  
  addCercle(_x,_y,_hankei,_color = "black",_isStroke = false,_touchevent = null,_isBasicObjects = false){
    let targetArr;
    if (_isBasicObjects == true) targetArr = this.basicObjects;
    if (_isBasicObjects == false) targetArr = this.objects;
    let _sp = new Cercle(_x, _y, _hankei,_color,_isStroke);
    if (_touchevent != null) _sp.touchevent = _touchevent;
    if ( _x == "center") {
      _sp.x = canvas.width /2;
    }
    targetArr.push(_sp);
  }
};

class TitleScene extends Scene{
  constructor(){
    super();
  }
};

let game = new Game();
game.scene = new TitleScene();


function mainLoop (){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  game.update();
  
  requestAnimationFrame(mainLoop);
};
mainLoop();
