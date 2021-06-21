import { Question } from './question';


export interface Quiz {
    _id: string;
    categoryId: string;
    name: string;
    questions: Question[];
}


