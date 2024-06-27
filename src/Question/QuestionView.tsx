import { useCallback, useEffect, useState } from "react"
import { QuestionForm } from "./QuestionForm"
import { RegisterForm } from "./RegisterForm"
import { Loading } from "../Components/Loading";
import { QUESTIONS_QUERIES, useCreateAnswerMutation, useGetQuizAnswerCountQuery, useGetQuizQuestionQuery } from "./QuestionQueries";
import { Answer } from "../Shared/Entities/Answer";
import { toast } from "react-toastify";
import { NOT_ALLOWED_ANSWERS } from "./InvalidAnswers";
import { useNotificationHub, EVENTS } from "../Shared/NotificationHub";
import { useQueryClient } from "@tanstack/react-query";


export const QuestionView = () => {
    const [user, setUser] = useState(localStorage.getItem("user"))
    const { mutateAsync, error: createError } = useCreateAnswerMutation()
    const { isLoading: loadingQuiz, data: question, error: getQuizError } = useGetQuizQuestionQuery()
    const { data: answerCount } = useGetQuizAnswerCountQuery(question?.id)
    const notificationHub = useNotificationHub()
    const queryClient = useQueryClient()

    const onAwnswerCreated = useCallback((a) => {
        const msg = `New answer available from ${a.owner}`
        console.log(msg)
        if (a.owner != user) {
            toast.success(msg)
            queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERIES.GetQuizAnswerCountQuery(a.questionId) })
        }
    }, [queryClient, user])

    useEffect(() => {
        notificationHub.on(EVENTS.ANSWER_CREATED, onAwnswerCreated)
        return () => {
            notificationHub.off(EVENTS.ANSWER_CREATED)
        }
    })


    const submitAnswer = async (value) => {
        const cleanedValue = value ? value.trim().toLocaleLowerCase() : ""

        if (isValidAnswer(cleanedValue)) {
            try {
                const newAnswer = { questionId: question?.id, value: cleanedValue, owner: user } as Answer
                const result = await mutateAsync(newAnswer);
                if (result) toast.success("Answer created")
                return true;
            }
            catch {
                toast.error("Something goes wrong")
                return false;
            }
        }

        return false;
    }

    const onUserRegistered = (username) => {
        setUser(username)
        localStorage.setItem("user", username)
    }

    const onExit = () => {
        setUser("")
        localStorage.removeItem("user")
    }

    const isValidAnswer = (value: string) => {
        if (value.length == 0) {
            toast.error("Answer cannot be empty")
            return false;
        }

        if (NOT_ALLOWED_ANSWERS.includes(value)) {
            toast.error(`Answer cannot be '${value}'`)
            return false;
        }

        return true;
    }

    return <>
        <Loading pendingRequest={[loadingQuiz]} errors={[getQuizError, createError]} />
        {!user ?
            <RegisterForm onSubmit={onUserRegistered} />
            : ""
        }
        {user && question ?
            <QuestionForm question={question} answerCount={answerCount || 0} onSubmit={submitAnswer} onExit={onExit} />
            : ""}
    </>
}