import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQuestionAnswer, getQuizAnswerCount, getQuizQuestion } from "../Shared/PickFuApiClient";
import { Question } from "../Shared/Entities/Question";
import { Answer } from "../Shared/Entities/Answer";

export const QUESTIONS_QUERIES = {
    GetQuizQuestion: ["GetQuizQuestion"],
    GetQuizAnswerCountQuery: (questionId) => ["GetQuizAnswerCountQuery", questionId],
    GetQuestionAnswers: (questionId) => ["GetQuestionAnswers", questionId]
}

export const useGetQuizQuestionQuery = () => {
    return useQuery<Question, Error>({
        queryKey: QUESTIONS_QUERIES.GetQuizQuestion,
        queryFn: getQuizQuestion
    });
}

export const useGetQuizAnswerCountQuery = (questionId: string | undefined) => {
    return useQuery<number, Error>({
        queryKey: QUESTIONS_QUERIES.GetQuizAnswerCountQuery(questionId),
        queryFn: () => questionId && questionId.length > 0 ? getQuizAnswerCount(questionId) : 0
    });
}


export const useCreateAnswerMutation = () => {

    const queryClient = useQueryClient()
    return useMutation<Answer, Error, Answer>({
        mutationFn: createQuestionAnswer,
        onSuccess: a => queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERIES.GetQuizAnswerCountQuery(a.questionId) }),
        onError: (error) => {
            console.log(error)
        },
    });
};