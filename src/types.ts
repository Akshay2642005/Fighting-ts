type TiledBaseLayer = {
  id: number;
  name: string;
  visible: boolean;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TiledTileLayer = TiledBaseLayer & {
  type: "tilelayer";
  data: number[];
  objects: never;
};

export type TiledObject = {
  height: number;
  id: number;
  name: string;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};

export type TiledObjectLayer = TiledBaseLayer & {
  type: "objectgroup";
  data:never;
  objects:TiledObject[];
};

export type TiledLayer = TiledTileLayer | TiledObjectLayer;


