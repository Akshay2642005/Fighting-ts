import { KaboomCtx } from "kaboom";
import k from "./kaboomCtx";
import { drawTile, fetchMapData } from "./utils";

//arena/background/decorations sprites
k.loadSprite(
  "background-layer-1",
  "./assets/background/background_layer_1.png",
);
k.loadSprite(
  "background-layer-2",
  "./assets/background/background_layer_2.png",
);
k.loadSprite(
  "background-layer-3",
  "./assets/background/background_layer_3.png",
);
k.loadSprite("shop","./assets/shop_anim.png",{
  sliceX: 6,
  sliceY:1,
  anims:{
    default:{
      from: 0,
      to: 5,
      loop: true,
    },
  },
});
k.loadSprite("fence-1", "./assets/fence_1.png");
k.loadSprite("tileset", "./assets/oak_woods_tileset.png", {
  sliceX:31,
  sliceY:22, 
});

//player sprites
k.loadSprite("samurai", "./assets/entities/samurai.png", {
  sliceX: 8,
  sliceY: 9,
  anims:{
    idle:{
      from: 32,
      to: 39,
      loop: true,
    },
    run:{
      from: 48,
      to: 55,
      loop: true,
    },
    attack:{
      from: 0,
      to: 5,
      speed:16,
    },
    death:{
      from: 16,
      to:21,
    },
    hit:{
      from: 56,
      to: 59
    },
    jump:{
      from: 40,
      to:41,
      loop: true,
    },
    fall:{
      from: 24,
      to:25,
      loop: true,
    },
  },
});

//main logic -- gameloop
async function arena(k : KaboomCtx){
  k.add([k.sprite("background-layer-1"), k.pos(0, 0), k.scale(4), k.fixed()]);
  k.add([k.sprite("background-layer-2"), k.pos(0, 0), k.scale(4), k.fixed()]);
  k.add([k.sprite("background-layer-3"), k.pos(0, 0), k.scale(4), k.fixed()]);
  const {layers, tilewidth, tileheight} = await fetchMapData("./maps/arena.json");
  const map = k.add([k.pos(0, 0)]);
  
  for(const layer of layers){
    if (
      layer.name === "Boundaries" && 
      layer.type === "objectgroup"
    ){
      for (const object of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), object.width, object.height),
          }),
          k.pos(object.x, object.y + tileheight),
          k.body({ isStatic: true }),
        ]);
      }
      continue;
    }

    if(
      layer.name ==="DecorationSpwanPoint" &&
      layer.type ==="objectgroup"
    ){
      for(const obj of layer.objects){
        switch(obj.name){
          case "shop":
            map.add([
              k.sprite("shop", {anim: "default"}),
              k.pos(obj.x - 6, obj.y),
              k.area(),
              k.anchor("center"),
            ]);
            break;
          case "fence-1":
            map.add([
              k.sprite("fence-1"),
              k.pos(obj.x, obj.y + 7),
              k.area(),
              k.anchor("center"),
            ]);
            break;
          default:
        }
      }
      continue;
    }
    
    if (
      layer.name ==="SpwanPoints" && 
      layer.type ==="objectgroup"
    ){
      //TODO
    }

    if (layer.type === "tilelayer"){
      drawTile(k, map, layer, tilewidth, tileheight);
    }
  }

  k.camPos(k.center().x - 450, k.center().y - 160);
  k.camScale(k.vec2(4));
}

k.scene("Arena", () => arena(k));
k.go("Arena");




