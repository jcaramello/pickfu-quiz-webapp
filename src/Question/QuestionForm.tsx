import { useState } from "react"

export interface QuestionFormProps {
    question: { id: string, inquiry: string },
    answerCount: number,
    onSubmit: (value: string | null) => Promise<boolean>
    onExit: () => void
}

export const QuestionForm = ({ question, answerCount, onSubmit, onExit }: QuestionFormProps) => {
    const [inputValue, setInputValue] = useState("")

    const sendClick = async () => {
        const result = await onSubmit(inputValue)
        if (result) setInputValue("");
    }

    const onEnter = ({key}) => {
        key == "Enter" && sendClick()
    }

    return <>
        <div className="bg-slate-50 box-content shadow-2xl rounded-2xl w-2/4 h-full p-10 m-auto">
            <h1 className="m-2 font-bold text-3xl">Quiz Challenge!!</h1>
            <h2 className="m-2 font-bold ">{question?.inquiry}</h2>
            <input className="m-2 w-full h-12 placeholder:text-gray-500 pl-[14px]"
                placeholder="Enter your answer..."
                value={inputValue}
                autoFocus 
                onChange={({ target }) => setInputValue(target.value)}
                onKeyDown={onEnter}
            ></input>
            <div className="flex">
                <button className={`m-2 w-2/4 bg-teal-400 text-slate-50 uppercase font-bold`} onClick={sendClick}>Send</button>
                <button className={`m-2 w-2/4 bg-red-400 text-slate-50 uppercase font-bold`} onClick={onExit}>Exit</button>
            </div>
            <a className="my-6 hover:underline text-white" style={{ color: "#d05c27" }} href="/answers">See all {answerCount} answers</a>
        </div>
    </>
}