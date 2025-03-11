export const questions = [
   {
    id:0,
    type: 'msg',
    content: 'Zdravo, ja sam Pingo!'
   },
   {
    id:1,
    type: 'msg',
    content: 'Brzinski ću te pitati 4 pitanja!'
   },
];

  
export type RegisterQuestions = keyof typeof questions;