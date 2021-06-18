import { Question } from './question';


export interface Quiz {
    _id: string;
    catID: string;
    name: string;
    questions: Question[];
}


