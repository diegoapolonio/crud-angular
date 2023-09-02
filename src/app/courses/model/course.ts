import { Lesson } from "./lesson";

export interface Course {
  _id: string;
  nome: string;
  category: string;
  lessons?:Lesson[];
}
