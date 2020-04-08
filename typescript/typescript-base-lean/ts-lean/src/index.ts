type Partial<T> = {
  [P in keyof T]?: T[P]
};

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

type PartialRectangle = Partial<Rectangle>;
// PartialRectangle 等价于 PartialRectangle1
/*
type PartialRectangle1 = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
*/

const rect: PartialRectangle = {
  width: 100,
  height: 200
};