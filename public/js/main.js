$(document).ready(function(){function a(){u=d(),z+=Math.min(1,(u-A)/1e3),b(z),A=u,requestAnimationFrame(a)}function b(){for(var a=0;a<C.length;a++)C[a].move(z);g(v)&&v.move(),k.updateCanvas()}function c(a,b,c,d){var e=Math.min(c/a,d/b);return{width:a*e,height:b*e}}function d(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}function e(a,b,c){return g(a)&&g(b)?a>b?-c:c:0}function f(a,b,c){return"undefined"!=typeof b.x?{x:e(a.x,b.x,c),y:e(a.y,b.y,c)}:void 0}function g(a){return"undefined"!=typeof a}function h(a,b,c,d,e){this.normalColor="white",this.hoverColor="lightblue",this.color=this.normalColor,this.init=function(){this.layer=e,this.type=c,this.key=d,this.w=a,this.h=b},this.mouseOn=function(a){var b=this.hspot;return b.x0<=a.offsetX&&a.offsetX<=b.x1&&b.y0<=a.offsetY&&a.offsetY<=b.y1?!0:!1},this.draw=function(a,b){var c=this.layer.ctx;this.x=a,this.y=b,this.hspot={x0:a,y0:b,x1:a+this.w,y1:b+this.h,name:this.type},c.beginPath(),c.rect(a,b,150,60),c.lineWidth=2,c.strokeStyle="lightblue",c.stroke(),c.textAlign="center",c.fillStyle=this.color,c.font="bold 16px Arial",c.fillText(this.type,a+this.w/2,b+35)},this.clear=function(){this.layer.ctx.clearRect(this.x,this.y,this.w,this.h)},this.init()}function i(a,b,c){n.call(this),this.prototype=new n,this.speed=2,this.orientation="down",this.moving=!1,this.type="a",g(b)&&(this.a=b.a,this.x=b.x,this.y=b.y,this.w=this.a.actions.stand.down[0].width,this.h=this.a.actions.stand.down[0].height,this.hspot={x0:this.x,y0:this.y,x1:this.x+this.w,y1:this.y+this.h,w:this.w,h:this.h,name:this.a.name},this.x=a.orig.actors[c].x,this.y=a.orig.actors[c].y),this.spawn=function(b){this.ctx=b.ctx,this.sprite=g(this.a.path)?new q(a,this,b):new r(a,b,this.w,this.h,this.a.rgbBox),this.sprite.draw(this.x,this.y),C.push(this)},this.draw=function(){this.sprite.draw(this.x,this.y)}}function j(a){this.tree=a,this.color="white",this.loader=new PxLoader,this.init=function(){this.canvas=$("<canvas></canvas>").attr({id:"dialog",width:P,height:S}).css({"z-index":9}),this.ctx=this.canvas[0].getContext("2d"),this.ctx.font="28px perfect_dos_vga_437regular",this.ctx.fillStyle=this.color,this.ctx.textAlign="center",this.ctx.fillText("",0,0),$("#container").append(this.canvas)},this.play=function(){var a=this.tree.length,b=0,c=this,d=0;if(0==a)console.log("No dialog attached to me");else{this.write(this.tree[b]);for(var e=0;a>e;e++)d+=1e3*c.tree[e].d,setTimeout(function(){b++,a>b?c.write(c.tree[b]):c.clear()},d)}},this.write=function(a){this.clear(),g(a.a)||(x=P/2,y=50),this.ctx.fillText(a.t,x,y)},this.clear=function(){this.ctx.clearRect(0,0,P,S)},this.init()}function k(){this.items={},this.possibleActions=new Array("Walk to ","Pick Up ","Talk To "),this.textAction=this.possibleActions[0],this.target="",this.actionWidth=P/2,this.invTop=Q-R,this.actionArea={},this.actions=new Array,this.init=function(){return this.canvas=$("<canvas></canvas>").attr({id:"inv",width:P,height:R}).css({"z-index":9,top:this.invTop}),this.ctx=this.canvas[0].getContext("2d"),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,P,R),$("#container").append(this.canvas),this.setupActions(),this},this.setupActions=function(){var a=this;this.actionArea.canvas=$("<canvas></canvas>").attr({id:"actions",width:this.actionWidth,height:R}).css({"z-index":10,top:this.invTop}),this.actionArea.ctx=this.actionArea.canvas[0].getContext("2d"),$("#container").append(this.actionArea.canvas);for(var b=20,c=20,d=150,e=60,f=0;f<this.possibleActions.length;f++){var g=this.possibleActions[f],i=new h(d,e,g,f,this.actionArea);i.draw(b,c),this.actions.push(i),f%3===1&&0!=f?(c+=e+c,b=20):b+=d+b}$("canvas#actions").on("click",function(b){for(var c=0;c<a.actions.length;c++){var d=a.actions[c];if(d.mouseOn(b)){a.textAction=d.hspot.name;break}a.textAction=a.possibleActions[0]}}),$("canvas#actions").on("mousemove",function(b){for(var c=0;c<a.actions.length;c++){var d=a.actions[c];d.mouseOn(b)?(d.color=d.hoverColor,d.clear(),d.draw(d.x,d.y)):(d.color=d.normalColor,d.clear(),d.draw(d.x,d.y))}})},this.updateInfoText=function(){var a=this.textAction+this.target;this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.font="bold 16px Arial",this.ctx.fillText(a,P/2,20)},this.updateCanvas=function(){this.clear(),this.draw()},this.draw=function(){this.updateInfoText()},this.clear=function(){this.ctx.clearRect(0,0,P,50),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,P,R)},this.init()}function l(a,b){this.pickedUp,this.image,this.x=a.x,this.y=a.y,this.w=a.i.w,this.h=a.i.h,this.layer=b,this.hspot={x0:this.x,y0:this.y,x1:this.x+this.w,y1:this.y+this.h,w:this.w,h:this.h,name:a.i.name},this.spawn=function(){this.layer.ctx.drawImage(this.image,0,0,this.w,this.h,this.x,this.y,this.w,this.h)}}function m(a,b,d,e,g){return this.init=function(){if(this.id=a,this.canvas=$("<canvas></canvas>").attr({id:a,width:e,height:g}).css({"z-index":d,left:"0px"}),this.ctx=this.canvas[0].getContext("2d"),this.x=parseInt(this.canvas.css("left")),0!==b){var f=b;this.image={x:0,y:0,src:f,width:f.width,height:f.height},this.image.newDM=c(f.width,f.height,1e9,S),this.width=parseInt(this.image.newDM.width),this.height=parseInt(this.image.newDM.height),this.canvas.attr("width",this.width),this.draw(this.image.x,this.image.y)}},this.draw=function(a,b){var c=this.image;this.ctx.drawImage(c.src,0,0,c.width,c.height,a,b,c.newDM.width,c.newDM.height)},this.scroll=function(a){var b=a.x,c=f({x:0,y:0},{x:b,y:0},4),d=this.x+c.x;this.canvas.css("left",d+"px"),this.x=parseInt(this.canvas.css("left"))},this.clear=function(){this.ctx.clearRect(0,0,P,Q-R)},this.init(),this}function n(){this.destX,this.destY,this.curDir={},this.hspot,this.move=function(){if(this.moving){var a={x:this.x,y:this.y};"p"==this.type&&(this.destXs=this.destX-this.sprite.w/2,this.destYs=this.destY-this.sprite.h);var b={x:this.destXs,y:this.destYs},c=f(a,b,this.speed);g(this.curDir.x)||(this.curDir.x=c.x,this.curDir.y=c.y),c.x=this.curDir.x!==c.x?0:c.x,c.y=this.curDir.y!==c.y?0:c.y;var d=this.x+c.x,e=this.y+c.y;if("p"==this.type&&this.scene.scrollable&&!this.scene.moving&&this.checkSceneEdge(d,e),this.cX=c.x,this.cY=c.y,0!==c.x||0!==c.y)this.sprite.clear(),this.sprite.draw(d,e,c),this.zHandler(),this.x=d,this.y=e;else if(delete this.curDir.x,delete this.curDir.y,this.moving=!1,"p"==this.type)for(var h=0;h<D.length;h++){var i=D[h];i.intent&&i.transportMe()}}},this.zHandler=function(){if(g(this.scene)){var a=this.scene.horizonLine,b=this.sprite.getBottomPos(this.x,this.y);this.sprite.z=Math.abs(1-b.y/a)}}}function o(a,b,c){i.call(this),this.prototype=new i(a,b,c),this.x=a.spawnStart.x,this.y=a.spawnStart.y,this.scene=a,this.speed=4,B=this,this.type="p",this.actor=w,this.init=function(){this.sprite=new q(this.scene,this.actor,this.scene.playerLayer),this.sprite.draw(this.x,this.y),C.push(this)},this.checkSceneEdge=function(){return 0==this.scene.x&&P-this.scene.padding<=this.sprite.x+this.sprite.w?(this.scene.moving=!0,this.scene.scroll="r",T&&console.log("Scrolling scene right"),!0):this.scene.x<0&&this.sprite.x<=a.width-P+this.scene.padding?(this.scene.moving=!0,this.scene.scroll="l",T&&console.log("Scrolling scene left"),!0):!1},this.init()}function p(a){this.layers=new Array,this.bgLayers=new Array,this.spriteLayers=new Array,this.transportLayers=new Array,this.transporters=new Array,this.itemLayers=new Array,this.items=new Array,this.actors=new Array,this.checkSpots=new Array,this.images=new Array,this.playerLayer,this.moving=!1,this.scrollable,this.padding,this.scroll,this.width=P,this.height=S,this.loader=new PxLoader,this.orig=a,this.x=0,this.spawnStart={},this.spawnStart.x=a.actors[0].x,this.spawnStart.y=a.actors[0].y,this.init=function(){var b=this;this.preloadLayers(),this.loader.addCompletionListener(function(c){b.images.push(c.resource.img),b.getLayers(),b.padding=a.largePadding,b.scrollable=g(a.large)||!a.large?!0:!1,b.persPoint=a.persPoint,b.large=a.large,g(a.persPoint)&&(b.horizonLine=Q-R-a.persPoint.y)})},this.preloadLayers=function(){var b=a.imageLayers;for(var c in b){var d=b[c];"bg"==d.type&&this.loader.addImage(d.image)}this.loader.start()},this.getLayers=function(){var b,c=a.imageLayers,d=0;for(var e in c){var f=c[e];"bg"==f.type?(b=new m("background"+d,this.images[d],d,this.width,this.height),this.width=b.width,this.bgLayers.push(b)):"sprite"==f.type?(b=new m("spritelayer"+d,0,9999,this.width,this.height),this.spriteLayers.push(b)):"transporter"==f.type?(b=new m("transportlayer"+d,0,9999,this.width,this.height),this.transportLayers.push(b)):"player"==f.type?(b=new m("player",0,9999,this.width,this.height),this.playerLayer=b):"item"==f.type&&(b=new m("item"+d,0,9999,this.width,this.height),this.itemLayers.push(b)),this.layers.push(b),d++}v=this,this.getTransporters(),this.getActors(),this.getItems()},this.getTransporters=function(){var b=a.transporters;for(var c in b){var d=b[c],e=this.transportLayers[c],f=new s(d,this,e);D.push(f),this.transporters.push(f),this.checkSpots.push(f)}},this.getActors=function(){var b=a.actors;for(var c in b){var d=b[c];if("n"==d.t){var e=new i(this,d,c);e.spawn(this.spriteLayers[c-1]),this.actors.push(e),this.checkSpots.push(e),C.push(e)}else{new o(this,d,0)}}},this.getItems=function(){var b=a.items,c=this,d=new PxLoader;for(var e in b){var f=b[e];d.addImage(f.i.image)}d.start(),d.addCompletionListener(function(a){for(var d in b){var e=b[d],f=c.itemLayers[d],g=new l(e,f);g.image=a.resource.img,g.spawn(),c.items.push(g),c.checkSpots.push(g)}})},this.move=function(){var a,b,c,d={x:0,y:0};if(this.moving){for(var e=0;e<this.layers.length;e++){var f=this.layers[e];"r"==this.scroll&&(d.x=-(this.width-P),b=d.x,a=f.x>=d.x),"l"==this.scroll&&(d.x=0,c=d.x,a=f.x<=d.x),this.x=d.x,a?f.scroll(d):this.moving=!1}if(2==this.large){var g=B;if(this.moving){if(0!==g.cX||0!==g.cY){if("Player"==g.constructor.name){var h=this.padding+150;"r"==this.scroll?g.destX=-b+h:"l"==this.scroll&&(g.destX=-c+P-h)}g.moving=!0}}else console.log("STOP MOVING"),g.moving=!1}}},this.scrollTo=function(a){this.scroll=a,this.moving=!0},this.show=function(){var a=this;this.loader.addCompletionListener(function(){for(var b=0;b<a.layers.length;b++)$("#container").append(a.layers[b].canvas);a.setupControls()})},this.hide=function(){for(var a=0;a<this.layers.length;a++)$("#"+this.layers[a].id).remove()},this.showHotspotText=function(a,b){for(var c=0;c<b.length;c++){var d=b[c].hspot;if(d.x0<=a.x&&a.x<=d.x1&&d.y0<=a.y&&a.y<=d.y1){k.target=d.name;break}k.target=T?a.x+", "+a.y:""}},this.setupControls=function(){var a=this;$("canvas").not("#inv,#dialog,#actions").on("click",function(b){T&&console.log("Click coordinates: "+b.offsetX+","+b.offsetY),B.destX=b.offsetX,B.destY=b.offsetY;for(var c=0;c<a.transporters.length;c++){var d=a.transporters[c];d.x<=b.offsetX&&b.offsetX<=d.x+d.w&&d.y<=b.offsetY&&b.offsetY<=d.y+d.h?(T&&console.log("Clicked Transporter for "+d.title),d.intent=!0):d.intent=!1}B.moving=!0}),$("canvas").not("#inv,#dialog,#actions").on("mouseout",function(){k.updateCanvas()}),$("canvas").not("#inv,#dialog,#actions").on("mousemove",function(b){E.x=b.offsetX,E.y=b.offsetY,a.showHotspotText(E,a.checkSpots)})},this.init()}function q(a,b,c){if(this.x,this.y,this.w,this.h,this.z,this.scene=a,g(b)&&(this.layer=c.ctx),this.actor=b,this.image=null,this.scaleDiff=1,this.loaded=!1,this.loader=new PxLoader,g(b.a)){var d=b.x,e=b.y;this.actor=b.a,this.actor.x=d,this.actor.y=e}else this.actor.x=a.spawnStart.x,this.actor.y=a.spawnStart.y;this.direction=this.actor.actions.walk.down,this.directionFrameLenght=this.direction.length,this.directionFrameIndex=0,this.UpdateDelayCount=3,this.UpdateDelayIndex=0,this.init=function(){var a=this;this.loader.addImage(this.actor.path),this.loader.start(),this.loader.addCompletionListener(function(b){a.image=b.resource.img,a.loaded=!0,a.draw(a.actor.x,a.actor.y)})},this.handleZ=function(){this.z<=.95&&this.z>=.2&&(this.scaleDiff=this.z)},this.getBottomPos=function(a,b){var c={};return c.x=a+this.w/2,c.y=b+this.h,c},this.updateDirectionFrameIndex=function(){return this.UpdateDelayCount!=this.UpdateDelayIndex?void this.UpdateDelayIndex++:(this.directionFrameIndex>=this.directionFrameLenght-1?this.directionFrameIndex=0:this.directionFrameIndex++,void(this.UpdateDelayIndex=0))},this.updateDirection=function(a){if(g(a))switch(!0){case a.y<0&&a.x>0:this.direction=this.actor.actions.walk.up;break;case a.y>0&&a.x<0:this.direction=this.actor.actions.walk.down;break;case a.x>0:this.direction=this.actor.actions.walk.right;break;case a.x<0:this.direction=this.actor.actions.walk.left}},this.draw=function(a,b,c){if(this.loaded){this.updateDirection(c),this.updateDirectionFrameIndex();var d=this.direction[this.directionFrameIndex];this.x=a,this.y=b,this.h=d.height,this.w=d.width,this.clear(),this.layer.drawImage(this.image,d.x,d.y,d.width,d.height,this.x,this.y,d.width,d.height)}},this.clear=function(){var a=this.direction[this.directionFrameIndex];this.layer.clearRect(this.x,this.y,a.width,a.height)},this.init()}function r(a,b,c,d,e){this.w=c,this.h=d,this.scene=a,this.realH=d,this.realW=c,this.init=function(){this.ctx=b.ctx,this.ctx.fillStyle=e},this.draw=function(a,b){this.x=a,this.y=b,this.h=parseInt(this.realH*this.scaleDiff),this.w=parseInt(this.realW*this.scaleDiff),this.ctx.fillRect(this.x,this.y,this.w,this.h)},this.clear=function(){this.ctx.clearRect(this.x,this.y,this.w,this.h)},this.init()}function s(a,b,c){this.destX,this.destY,this.curDir={},this.speed=4,this.moving=!1,this.intent=!1,this.type="t",this.init=function(a){if(this.x=a.x,this.y=a.y,this.origX=this.x,this.origY=this.y,this.w=a.w,this.h=a.h,this.title=a.title,this.moving=!1,this.hspot={x0:this.x,y0:this.y,x1:this.x+this.w,y1:this.y+this.h,w:this.w,h:this.h,name:this.title},T)var d="rgba(55,55,244,0.5)";else var d="rgba(55,55,244,0)";this.sprite=new r(b,c,this.w,this.h,d),this.sprite.draw(this.x,this.y)},this.transportMe=function(){t.changeScene(a.link),this.intent=!1},this.init(a)}function t(){this.locations=O,this.changeScene=function(a){v.hide();var b=new p(this.locations[a]);b.show()}}var u,v,w,z=0,A=d(),B={},C=new Array,D=new Array,E={},F=new PxLoader;F.addImage("fonts/perfectdos-webfont.eot"),F.addImage("fonts/perfectdos-webfont.woff"),F.addImage("fonts/perfectdos-webfont.ttf"),F.addImage("fonts/perfectdos-webfont.svg#perfect_dos_vga_437regular"),F.start(),requestAnimationFrame(a);var G={name:"Large freakin' hammer",image:"assets/items/hammer.png",w:100,h:100},H={name:"luigi",path:"assets/actors/luigi/luigi.png",actions:{walk:{up:[{width:20,height:33,x:3,y:123},{width:22,height:36,x:31,y:120},{width:20,height:33,x:61,y:123}],down:[{width:23,height:35,x:3,y:2},{width:22,height:37,x:31,y:0},{width:23,height:35,x:58,y:2}],right:[{width:21,height:36,x:3,y:81},{width:19,height:37,x:32,y:80},{width:22,height:36,x:59,y:81}],left:[{width:22,height:36,x:3,y:41},{width:19,height:37,x:33,y:40},{width:21,height:36,x:60,y:41}]},stand:{up:[{width:22,height:36,x:31,y:120}],down:[{width:22,height:37,x:31,y:0}],right:[{width:19,height:37,x:32,y:80}],left:[{width:19,height:37,x:33,y:40}]}}},I={name:"mario",path:"assets/actors/mario/mario.png",actions:{walk:{up:[{width:20,height:33,x:3,y:123},{width:22,height:36,x:31,y:120},{width:20,height:33,x:61,y:123}],down:[{width:23,height:35,x:3,y:2},{width:22,height:37,x:31,y:0},{width:23,height:35,x:58,y:2}],right:[{width:21,height:36,x:3,y:81},{width:19,height:37,x:32,y:80},{width:22,height:36,x:59,y:81}],left:[{width:22,height:36,x:3,y:41},{width:19,height:37,x:33,y:40},{width:21,height:36,x:60,y:41}]},stand:{up:[{width:22,height:36,x:31,y:120}],down:[{width:22,height:37,x:31,y:0}],right:[{width:19,height:37,x:32,y:80}],left:[{width:19,height:37,x:33,y:40}]}}},J={name:"Dat New Guy",rgbBox:"rgb(43,227,70)",w:50,h:50},K=[{t:"Welcome to ScummVM-clone",d:3},{t:"This is a work in progress, so expect literally nothing",d:3},{t:"But at least this little dialog works pretty well right?",d:4},{t:"Everything here is brought to the engine via JSON",d:3},{t:"At least that's the idea",d:1.5},{t:"Anyways, Enjoy!",d:3}],L={imageLayers:[{type:"bg",image:"assets/scenes/mi1street/street.png"},{type:"transporter"},{type:"transporter"},{type:"item"},{type:"player"},{type:"sprite"}],large:1,largePadding:40,persPoint:{x:579,y:259},transporters:[{x:830,y:250,w:45,h:70,title:"SCUMM Bar",link:1},{x:344,y:254,w:20,h:30,title:"Test Room",link:2}],items:[{i:G,x:352,y:416}],actors:[{a:I,t:"p",x:600,y:300},{a:H,t:"n",x:158,y:370}]},M={imageLayers:[{type:"bg",image:"assets/scenes/scummbar/scummbar.png"},{type:"transporter"},{type:"player"},{type:"sprite"}],spawnStart:{x:170,y:300},large:2,largePadding:10,transporters:[{x:117,y:280,w:140,h:180,title:"Outside",link:0}],actors:[{a:I,t:"p",x:600,y:300}]},N={imageLayers:[{type:"bg",image:"assets/scenes/test_room/test_bg.jpg"},{type:"transporter"},{type:"player"},{type:"sprite"}],spawnStart:{x:600,y:300},large:1,largePadding:40,transporters:[{x:40,y:330,w:45,h:70,title:"Street",link:0}],actors:[{a:J,x:158,y:370}]},O=new Array;O[0]=L,O[1]=M,O[2]=N;var P=1024,Q=768,R=250,S=Q-R,T=!0,k=new k,t=new t,K=new j(K),U=new p(L);F.addCompletionListener(function(){w=I,U.show(),K.play()})});