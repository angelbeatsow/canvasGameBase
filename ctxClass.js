class Text{
  constructor(_text,_x,_y,_maxWidth = null){
    this.text = _text;
    this.x = Number(_x);
    this.y = Number(_y);
    this.maxWidth = _maxWidth;
    if(_maxWidth != null)this.maxWidth = Number(_maxWidth);
    this.font = "20px sans serif"
    this.color = "white";
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
    return {width:_measure.width ,height:_measure.height};

  }
  update(){
    let _ctx = document.getElementById("canvas").getContext("2d");
    _ctx.textAlign = this.textAlign;
    _ctx.textBaseline = this.textBaseline;
    _ctx.font = this.font;
    _ctx.fillStyle = this.color;
    if(this.maxWith == null){
      _ctx.fillText(this.text,this.x,this.y);
    }else{
      _ctx.fillText(this.text,this.x,this.y,this.maxWidth);
    }
  }
  touchevent(){}
};
