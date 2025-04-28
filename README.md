# canvasGameBase
game.sceneにSceneインスタンスをいれる。

SceneインスタンスのScene.objectsに、画面に表示するオブジェクトを入れる。Scene.setObjects関数内でScene.addRect等を用いる。Scene.updateにおいて、フレームごとに初期化→setObject→表示が繰り返される。

Scene.basicObjectはrequestAnimationFrameでフレームごとに初期化されないため、constructor内で設定するように。setObject内で設定するとbasicObjectが時間に比例して増えてしまう。

addRect等の引数にある_eventは、nullまたは{touchevent:()=>{},clickevent:()=>{}}をいれる。この２つのイベントは、そのオブジェクトの範囲がtouchされている場合に働く。toucheventについてはtouchstartで働くので、連続して発生しないように、イベントの末尾でgame.dontTouchに数値を代入したりtouch.type="touchend"を設定することを推奨する。clickeventはtouchstartした座標の近くでtouchendすると働く。

game.dontTouchは0より大きいとtoucheventやclickeventが発生しなくなる。game.update内で1フレームごとに1ずつ減る。

game.fadeFunction(new Scene())を用いることで暗転しながらSceneの遷移が可能。
