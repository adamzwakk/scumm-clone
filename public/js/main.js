$(document).ready(function(){function a(){s=d(),v+=Math.min(1,(s-w)/1e3),b(v),w=s,requestAnimationFrame(a)}function b(){for(var a=0;a<z.length;a++)z[a].move(v);g(t)&&t.move()}function c(a,b,c,d){var e=Math.min(c/a,d/b);return{width:a*e,height:b*e}}function d(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}function e(a,b,c){return g(a)&&g(b)?a>b?-c:c:0}function f(a,b,c){return"undefined"!=typeof b.x?{x:e(a.x,b.x,c),y:e(a.y,b.y,c)}:void 0}function g(a){return"undefined"!=typeof a}function h(a){l.call(this),this.prototype=new l,this.speed=2,this.moving=!1,this.scene=a,this.type="a"}function i(a){this.tree=a,this.color="white",this.loader=new PxLoader,this.init=function(){this.canvas=$("<canvas></canvas>").attr({id:"dialog",width:H,height:K}).css({"z-index":9e6}),this.ctx=this.canvas[0].getContext("2d"),this.ctx.font="28px perfect_dos_vga_437regular",this.ctx.fillStyle=this.color,this.ctx.textAlign="center",this.ctx.fillText("",0,0),$("#container").append(this.canvas)},this.play=function(){var a=this.tree.length,b=0,c=this,d=0;if(0==a)console.log("No dialog attached to me");else{this.write(this.tree[b]);for(var e=0;a>e;e++)d+=1e3*c.tree[e].d,setTimeout(function(){b++,a>b?c.write(c.tree[b]):c.clear()},d)}},this.write=function(a){this.clear(),g(a.a)||(x=H/2,y=50),this.ctx.fillText(a.t,x,y)},this.clear=function(){this.ctx.clearRect(0,0,H,K)},this.init()}function j(){this.items={},this.textAction,this.textAction="Walk to ",this.init=function(){return this.canvas=$("<canvas></canvas>").attr({id:"inv",width:H,height:J}).css({"z-index":9e6,top:I-J}),this.ctx=this.canvas[0].getContext("2d"),this.ctx.fillStyle="rgba(0, 0, 0, 1)",this.ctx.fillRect(0,0,H,J),$("#container").append(this.canvas),this},this.updateInfoText=function(a){this.clear();var b=this.textAction+a;this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.font="bold 16px Arial",this.ctx.fillText(b,H/2,20)},this.updateCanvas=function(){this.clear(),this.draw()},this.draw=function(){},this.clear=function(){this.ctx.clearRect(0,0,H,50),this.ctx.fillStyle="rgba(0, 0, 0, 1)",this.ctx.fillRect(0,0,H,J)},this.init()}function k(a,b,d,e,g){return this.init=function(){if(this.id=a,this.canvas=$("<canvas></canvas>").attr({id:a,width:e,height:g}).css({"z-index":d,left:"0px"}),this.ctx=this.canvas[0].getContext("2d"),this.x=parseInt(this.canvas.css("left")),0!==b){var f=b;this.image={x:0,y:0,src:f,width:f.width,height:f.height},this.image.newDM=c(f.width,f.height,1e9,K),this.width=parseInt(this.image.newDM.width),this.height=parseInt(this.image.newDM.height),this.canvas.attr("width",this.width),this.draw(this.image.x,this.image.y)}},this.draw=function(a,b){var c=this.image;this.ctx.drawImage(c.src,0,0,c.width,c.height,a,b,c.newDM.width,c.newDM.height)},this.scroll=function(a){var b=a.x,c=f({x:0,y:0},{x:b,y:0},4),d=this.x+c.x;this.canvas.css("left",d+"px"),this.x=parseInt(this.canvas.css("left"))},this.clear=function(){this.ctx.clearRect(0,0,H,I-J)},this.init(),this}function l(){this.destX,this.destY,this.curDir={},this.hspot,this.move=function(){if(this.moving){var a={x:this.x,y:this.y};"p"==this.type&&(this.destXs=this.destX-this.sprite.w/2,this.destYs=this.destY-this.sprite.h);var b={x:this.destXs,y:this.destYs},c=f(a,b,this.speed);g(this.curDir.x)||(this.curDir.x=c.x,this.curDir.y=c.y),c.x=this.curDir.x!==c.x?0:c.x,c.y=this.curDir.y!==c.y?0:c.y;var d=this.x+c.x,e=this.y+c.y;if("p"==this.type&&this.scene.scrollable&&!this.scene.moving&&this.checkSceneEdge(d,e),this.cX=c.x,this.cY=c.y,0!==c.x||0!==c.y)this.sprite.clear(),this.sprite.draw(d,e),g(this.hspot)&&this.moveHSpot(d,e),this.zHandler(),this.x=d,this.y=e;else if(delete this.curDir.x,delete this.curDir.y,this.moving=!1,"p"==this.type)for(var h=0;h<A.length;h++){var i=A[h];i.intent&&i.transportMe()}}},this.zHandler=function(){if(g(this.scene)){var a=this.scene.horizonLine,b=this.sprite.getBottomPos(this.x,this.y);this.sprite.z=Math.abs(1-b.y/a)}}}function m(a){h.call(this),this.prototype=new h,this.x=a.spawnStart.x,this.y=a.spawnStart.y,this.scene=a,this.speed=4,u=this,this.type="p",this.init=function(){this.sprite=new p(a,a.playerLayer,150,150,"rgb(244,244,244)"),this.sprite.draw(this.x,this.y),z.push(this)},this.checkSceneEdge=function(){return 0==this.scene.x&&H-this.scene.padding<=this.sprite.x+this.sprite.w?(this.scene.moving=!0,this.scene.scroll="r",L&&console.log("Scrolling scene right"),!0):this.scene.x<0&&this.sprite.x<=a.width-H+this.scene.padding?(this.scene.moving=!0,this.scene.scroll="l",L&&console.log("Scrolling scene left"),!0):!1},this.init()}function n(a){this.layers=new Array,this.bgLayers=new Array,this.spriteLayers=new Array,this.transportLayers=new Array,this.transporters=new Array,this.images=new Array,this.playerLayer,this.moving=!1,this.scrollable,this.padding,this.scroll,this.width=H,this.height=K,this.loader=new PxLoader,this.x=0,this.init=function(){var b=this;this.preloadLayers(),this.loader.addCompletionListener(function(c){b.images.push(c.resource.img),b.getLayers(),b.padding=a.largePadding,b.scrollable=g(a.large)||!a.large?!0:!1,b.persPoint=a.persPoint,b.spawnStart=a.spawnStart,b.large=a.large,g(a.persPoint)&&(b.horizonLine=I-J-a.persPoint.y);new m(b)})},this.preloadLayers=function(){{var b=a.imageLayers;new Array}for(var c in b){var d=b[c];"bg"==d.type&&this.loader.addImage(d.image)}this.loader.start()},this.getLayers=function(){var b,c=a.imageLayers,d=0;for(var e in c){var f=c[e];"bg"==f.type?(b=new k("background"+d,this.images[d],d,this.width,this.height),this.width=b.width,this.bgLayers.push(b)):"sprite"==f.type?(b=new k("spritelayer"+d,0,9999,this.width,this.height),this.spriteLayers.push(b)):"transporter"==f.type?(b=new k("transportlayer"+d,0,9999,this.width,this.height),this.transportLayers.push(b)):"player"==f.type&&(b=new k("player",0,9999,this.width,this.height),this.playerLayer=b),this.layers.push(b),d++}t=this,this.getTransporters()},this.getTransporters=function(){var b=a.transporters;for(var c in b){var d=b[c],e=this.transportLayers[c],f=new q(d,this,e);A.push(f),this.transporters.push(f)}},this.move=function(){var a,b,c,d={x:0,y:0};if(this.moving){for(var e=0;e<this.layers.length;e++){var f=this.layers[e];"r"==this.scroll&&(d.x=-(this.width-H),b=d.x,a=f.x>=d.x),"l"==this.scroll&&(d.x=0,c=d.x,a=f.x<=d.x),this.x=d.x,a?f.scroll(d):this.moving=!1}if(2==this.large)for(var e=0;e<z.length;e++){var g=z[e];if(console.log(g.cX),this.moving){if(0!==g.cX||0!==g.cY){if("Player"==g.constructor.name){var h=this.padding+150;"r"==this.scroll?g.destX=-b+h:"l"==this.scroll&&(g.destX=-c+H-h)}g.moving=!0}}else console.log("STOP MOVING"),g.moving=!1}}},this.scrollTo=function(a){this.scroll=a,this.moving=!0},this.show=function(){var a=this;this.loader.addCompletionListener(function(){for(var b=0;b<a.layers.length;b++)$("#container").append(a.layers[b].canvas);a.setupControls()})},this.hide=function(){for(var a=0;a<this.layers.length;a++)$("#"+this.layers[a].id).remove()},this.setupControls=function(){var a=this;$("canvas").not("#inv").on("click",function(b){L&&console.log("Click coordinates: "+b.offsetX+","+b.offsetY),u.destX=b.offsetX,u.destY=b.offsetY;for(var c=0;c<a.transporters.length;c++){var d=a.transporters[c];d.x<=b.offsetX&&b.offsetX<=d.x+d.w&&d.y<=b.offsetY&&b.offsetY<=d.y+d.h?(L&&console.log("Clicked Transporter for "+d.title),d.intent=!0):d.intent=!1}u.moving=!0}),$("canvas").not("#inv").on("mouseout",function(){j.updateCanvas()}),$("canvas").not("#inv").on("mousemove",function(b){B.x=b.offsetX,B.y=b.offsetY;for(var c=0;c<a.transporters.length;c++){var d=a.transporters[c].hspot;j.updateInfoText(d.x0<=B.x&&B.x<=d.x1&&d.y0<=B.y&&B.y<=d.y1?d.name:"")}})},this.init()}function o(a){this.x,this.y,this.w,this.h,this.z,this.scene=a,this.scaleDiff=1,this.init=function(){},this.handleZ=function(){this.z<=.95&&this.z>=.2&&(this.scaleDiff=this.z)},this.getBottomPos=function(a,b){var c={};return c.x=a+this.w/2,c.y=b+this.h,c}}function p(a,b,c,d,e){o.call(this),this.prototype=new o(a),this.w=c,this.h=d,this.scene=a,this.realH=d,this.realW=c,this.init=function(){this.ctx=b.ctx,this.ctx.fillStyle=e},this.draw=function(a,b){this.getBottomPos(),this.handleZ(),this.x=a,this.y=b,this.h=parseInt(this.realH*this.scaleDiff),this.w=parseInt(this.realW*this.scaleDiff),this.ctx.fillRect(this.x,this.y,this.w,this.h)},this.clear=function(){this.ctx.clearRect(this.x,this.y,this.w,this.h)},this.init()}function q(a,b,c){this.destX,this.destY,this.curDir={},this.speed=4,this.moving=!1,this.intent=!1,this.type="t",this.init=function(a){if(this.x=a.x,this.y=a.y,this.origX=this.x,this.origY=this.y,this.w=a.w,this.h=a.h,this.title=a.title,this.moving=!1,this.hspot={x0:this.x,y0:this.y,x1:this.x+this.w,y1:this.y+this.h,w:this.w,h:this.h,name:this.title},L)var d="rgba(55,55,244,0.5)";else var d="rgba(55,55,244,0)";this.sprite=new p(b,c,this.w,this.h,d),this.sprite.draw(this.x,this.y)},this.transportMe=function(){r.changeScene(a.link),this.intent=!1},this.init(a)}function r(){this.locations=G,this.changeScene=function(a){t.hide();var b=new n(this.locations[a]);b.show()}}var s,t,u,v=0,w=d(),z=new Array,A=new Array,B={},C=new PxLoader;C.addImage("fonts/perfectdos-webfont.eot"),C.addImage("fonts/perfectdos-webfont.woff"),C.addImage("fonts/perfectdos-webfont.ttf"),C.addImage("fonts/perfectdos-webfont.svg#perfect_dos_vga_437regular"),C.start(),requestAnimationFrame(a);var D=[{t:"Welcome to ScummVM-clone",d:3},{t:"This is a work in progress, so expect literally nothing",d:3},{t:"But at least this little dialog works pretty well right?",d:4},{t:"Everything here is brought to the engine via JSON",d:3},{t:"At least that's the idea",d:1.5},{t:"Anyways, Enjoy!",d:3}],E={imageLayers:[{type:"bg",image:"assets/scenes/mi1street/street.png"},{type:"transporter"},{type:"player"},{type:"sprite"}],spawnStart:{x:600,y:300},large:1,largePadding:40,persPoint:{x:579,y:259},transporters:[{x:830,y:250,w:45,h:70,title:"SCUMM Bar",link:1}]},F={imageLayers:[{type:"bg",image:"assets/scenes/scummbar/scummbar.png"},{type:"transporter"},{type:"player"},{type:"sprite"}],spawnStart:{x:170,y:300},large:2,largePadding:10,transporters:[{x:117,y:280,w:140,h:180,title:"Outside",link:0}]},G=new Array;G[0]=E,G[1]=F;var H=1024,I=768,J=250,K=I-J,L=!0,j=new j,r=new r,D=new i(D),M=new n(E);C.addCompletionListener(function(){M.show(),D.play()})});