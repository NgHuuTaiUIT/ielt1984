export type DragWord = {
  word: string;
  color: string;
  id: string | number;
};

export type Blank = {
  id: string | number;
  position: string;
  correctAnswer: string;
  type: "drag" | "input";
};

export type Question = {
  paragraph: string;
  blanks: Blank[];
  dragWords: DragWord[];
};
