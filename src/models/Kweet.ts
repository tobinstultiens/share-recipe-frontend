import Entity from "./Entity";

export default interface KweetModel {
  id: string;
  userId: string;
  displayName: string;
  image: string;
  kweet: Kweet;
}
export interface Kweet extends Entity {
  message: string;
  ingredients: Ingredient[];
  directions: Direction[];
}
export interface Ingredient extends Entity {
  description: string;
  amount: string;
}
export interface Direction extends Entity {
  order: number;
  message: string;
}
