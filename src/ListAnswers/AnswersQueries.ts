import { useQuery } from "@tanstack/react-query";
import { getQuizAnswers } from "../Shared/PickFuApiClient";
import { Answer } from "../Shared/Entities/Answer";


export const ANSWERS_QUERIES = {
    GetQuestionAnswers: (questionId) => ["GetQuestionAnswers", questionId]
}


export const useGetQuizAnswersQuery = (questionId: string | undefined) => {
    return useQuery<Answer[], Error>({
        queryKey: ANSWERS_QUERIES.GetQuestionAnswers(questionId),
        queryFn: () => questionId ? getQuizAnswers(questionId) : []
    });
}