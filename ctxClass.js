class Text{
  constructor(_text,_x,_y,_maxWidth = null,_color){
    this.text = _text;
    this.x = Number(_x);
    this.y = Number(_y);
    this.maxWidth = _maxWidth;
    if(_maxWidth != null)this.maxWidth = Number(_maxWidth);
    this.font = "20px sans serif"
    this.color = _color;
    this.textAlign = "start";
    this.textBaseline = "top";
    this.width;
  }
  returnWH(){
    let _ctx = document.getElementById("canvas").getContext("2d");
    _ctx.textAlign = this.textAlign;
    _ctx.textBaseline = this.textBaseline;
    _ctx.font = this.font;
    let _measure = _cts.measureText(this.text);
    if(this.maxWidth != null)return{width:this.maxWidth,height:_measure.height};
    return {width:_measure.width ,height:_measure.height};

  }
  update(){
    let _ctx = document.getElementById("canvas").getContext("2d");
    _ctx.textAlign = this.textAlign;
    _ctx.textBaseline = this.textBaseline;
    _ctx.font = this.font;
    _ctx.fillStyle = this.color;
    if(this.maxWidth == null){
      _ctx.fillText(this.text,this.x,this.y);
    }else{
      _ctx.fillText(this.text,this.x,this.y,this.maxWidth);
    }
  }
  touchevent(){}
  isTouch(){
    if(touch.type == "touchstart" && touch.x > this.x  && touch.x < this.x + this.returnWH.width && touch.y > this.y && touch.y < this.y + this.returnWH.height){
      return true;
    }
    return false;
  }
};

class Rect{
  constructor(_x,_y,_w,_h,_color,_opacity = 1){
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.color = _color;
    this.opacity = _opacity;
  }
  update(){
    let _ctx = document.getElementById("canvas").getContext("2d");
    _ctx.fillStyle = this.color;
    _ctx.globalAlpha = this.opacity;
    _ctx.fillRect(this.x,this.y,this.w,this.h);
    _ctx.globalAlpha = 1;
  }
  touchevent(){}
  isTouch(){
    if (touch.type == "touchstart" && touch.x > this.x && touch.x < this.x + this.w && touch.y > this.y && touch.y < this.y + this.h) {
  return true;
}
return false;
  }
}

class Sprite{
  constructor(_img,_x,_y,_w = 0,_h =0){
    this.img = _img;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    if(_w == 0)this.w = _img.width;
    if(_h == 0)this.h = _img.height;
  }
  update(){
    let _ctx = document.getElementById("canvas").getContext("2d");
    if(this.w == 0 || this.h == 0){
      _ctx.drawImage(this.img,this.x,this.y);
    }else{
      _ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
  }
  touchevent(){}
  isTouch(){
    if(touch.type == "touchstart" && touch.x > this.x && touch.x < this.x + this.w && touch.y > this.y && touch.y < this.y + this.h){
      return true;
    }
    return false;
  }
}

class Cercle{
  constructor(_x, _y, _hankei,_color = "black",_isStroke = false,_lineWidth = 3) {
    this.x = _x;
    this.y = _y;
    this.radius = _hankei;
    this.color = _color;
    this.isStroke = _isStroke;
    this.lineWidth = _lineWidth;
  }
  update() {
    let _ctx = document.getElementById("canvas").getContext("2d");
    _ctx.beginPath();
    _ctx.fillStyle = this.color;
    _ctx.lineWidth = this.lineWidth;
    _ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    if(this.isStroke == false)_ctx.fill();
    if(this.isStroke == true)_ctx.stroke();
    _ctx.closePath();
  }
  touchevent() {}
  isTouch() {
    if (touch.type == "touchstart" && Math.sqrt( (touch.x - this.x)**2 + (touch.y - this.y)**2 ) < this.radius ) {
      return true;
    }
    return false;
  }
}
