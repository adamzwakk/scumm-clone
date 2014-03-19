##WIP Scumm/Adventure game engine in JS

I'm trying to somewhat recreate an engine like ScummVM that allows developers to easily create point and click adventure games.

My main priority is to seperate the main engine code, and the actual game/asset code. Everything in the gamesrc folder is configured via JSON objects.

You will need grunt and bower to install dependencies and build the demo project with the engine.

```
npm install -g bower
npm install -g grunt-cli
npm install
bower update
grunt
```

###Folders

- enginesrc = main code
- gamesrc = reproducable game maker stuff
- public = compiled/minified version of enginesrc+gamesrc

###Terminology

######Layer

A layer is what your sprites and assets live on. Each sprite, background, and transporter has it's own layer. You can specify the ordering of each layer on the scene.

######Scene

A scene is a piece of your world, sort of like a container. It houses all the actors for that scene, transporters to transfer the player to other scenes, and all the background/layer image assets. 

It also has the ability to have a perspective point, so actors will get smaller as the move closer to the point on a fake z-axis.

######Actor

An actor is a character on the scene, including the main player. Actors can move freely on the scene background. Only player actors can use transporters.

######Sprite

Where the different sprites live for the actor, support multiple frames per action (walking, talking, etc).


######Transporter

A transporter is a link between scenes. Clicking on a transporter will move the player towards it, then change scene. You can also specify a name for your transporter so the mouseover text will read something like "Walk to SCUMM Bar"

######World

A world is where all your scenes live. 


###TODO

See TODO.md