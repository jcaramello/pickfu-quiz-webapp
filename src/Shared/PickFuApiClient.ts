import { Answer } from "./Entities/Answer";

const baseUrl = import.meta.env.PICKFU_API_URL
const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");

export const getQuizQuestion = async () => {
    const response = await fetch(`${baseUrl}/questions`);
    const questions = await response.json()
    return questions[0];
}

export const getQuizAnswerCount = async (questionId: string) => {
    const response = await fetch(`${baseUrl}/questions/${questionId}/answers`);
    const questions = await response.json()
    return questions.length;
}

export const getQuizAnswers = async (questionId: string) => {
    const response = await fetch(`${baseUrl}/questions/${questionId}/answers`);
    const ans = await response.json()    
    return ans;
}

export const createQuestionAnswer = async (answer: Answer) => {
    const response = await fetch(`${baseUrl}/questions/${answer.questionId}/answers`, {
        method: 'POST',
        body: JSON.stringify(answer),
        headers: defaultHeaders
    });
    return await response.json() as Answer
}