import { useCallback, useEffect } from "react"
import { Loading } from "../Components/Loading"
import { useGetQuizQuestionQuery } from "../Question/QuestionQueries"
import { ANSWERS_QUERIES, useGetQuizAnswersQuery } from "./AnswersQueries"
import { ListAnswers } from "./ListAnswers"
import { EVENTS, useNotificationHub } from "../Shared/NotificationHub"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const ListAnswersView = () => {
    const { isLoading: loadingQuiz, data: question, error: getQuizError } = useGetQuizQuestionQuery()
    const { isLoading: loadingAns, data: answers, error: getAnsError } = useGetQuizAnswersQuery(question?.id)
    const notificationHub = useNotificationHub()
    const queryClient = useQueryClient()

    const onAwnswerCreated = useCallback((a) => {
        const msg = `New answer available from ${a.owner}`
        console.log(msg)
        toast.success(msg)
        queryClient.invalidateQueries({ queryKey: ANSWERS_QUERIES.GetQuestionAnswers(a.questionId) })
    }, [queryClient])

    useEffect(() => {
        notificationHub.on(EVENTS.ANSWER_CREATED, onAwnswerCreated)
        return () => {
            notificationHub.off(EVENTS.ANSWER_CREATED)
        }
    })

    return <>
        <Loading pendingRequest={[loadingQuiz, loadingAns]} errors={[getQuizError, getAnsError]} />
        <div className="bg-slate-50 box-content shadow-2xl rounded-2xl w-2/4 h-full p-10 m-auto">
            <h1 className="m-2 font-bold text-3xl">Quiz Challenge!!</h1>
            <h2 className="m-2 font-bold ">Answers for: {question?.inquiry}</h2>
            <ListAnswers items={answers || []} />
            <a className="my-8 hover:underline" style={{ color: "#d05c27" }} href="/">Back</a>
        </div>
    </>
}