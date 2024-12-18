import { GameObj, KaboomCtx, Vec2 } from "kaboom";
import { fighterProps, setFighterControls } from "./fighter";

export function makeSamurai(k: KaboomCtx, parent: GameObj, pos: Vec2){

  let gameObj = parent.add([
    k.sprite("samurai", {anim: "idle"}),
    k.pos(pos),
    k.area({
      shape: new k.Rect(k.vec2(),20,40),
      collisionIgnore:["ninja"],
    }),
    k.anchor("center"),
    k.health(fighterProps.maxHealth),
    k.opacity(),
    k.body(),
    "samurai",
    {
      ...fighterProps,
    },
  ]);
  return{
    gameObj,
    setControls: () => {
      setFighterControls(k, gameObj, {LEFT: "a", RIGHT: "d", UP: "w", DOWN: "s"});

    }
  }
}



