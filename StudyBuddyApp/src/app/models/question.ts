export interface Question {
    Id?:number;
    QuestionText:string;
    QuestionOptions: string[],    
    Answers:string[];
    IsFavorite:boolean;
}
