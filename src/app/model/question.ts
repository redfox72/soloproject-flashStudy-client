

export interface Question {
    _id: string;
    id: number;
    quizID: number;
    catID: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    extra: string;
    position: number;
}
