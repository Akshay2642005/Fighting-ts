import { GameObj, KaboomCtx } from "kaboom";
import { TiledTileLayer } from "./types";

export async function fetchMapData(mapFilePath: string) {  
  if (!mapFilePath.includes(".json")){
    throw new Error("Invalid map file path");
  }
  const response = await fetch(mapFilePath);
  console.log(response);
  if (!response.ok){
    throw new Error(response.statusText);
  }
  return await response.json();
}

export function drawTile(
  k: KaboomCtx, 
  map: GameObj,
  layer: TiledTileLayer,
  tilewidth:number,
  tileheight:number,
){
  let nbOfDrawnTiles = 0;
  const tilePos = k.vec2(0,0);
  for(const tileNumber of layer.data){
    if(nbOfDrawnTiles % layer.width === 0){
      tilePos.x = 0;
      tilePos.y += tileheight;
    }
    else {
      tilePos.x += tilewidth;
    }
    nbOfDrawnTiles++;
    if (tileNumber === 0) continue;
    
    map.add([
      k.sprite("tileset", {frame: tileNumber-1}),
      k.pos(tilePos),
      k.offscreen(),
    ]);
  }
}
