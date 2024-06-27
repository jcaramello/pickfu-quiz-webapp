import { useState } from "react"

export const RegisterForm = ({ onSubmit }) => {
    const [userName, setUserName] = useState("")

    const onEnter = ({ key }) => {
        key == "Enter" && register()
    }

    const register = () => {
        userName && onSubmit(userName)
    }

    return <>
        <div className="bg-slate-50 box-content shadow-2xl rounded-2xl w-2/4 h-full p-10 m-auto">
            <h2 className="m-2 font-bold text-3xl">Quiz Challenge!!</h2>
            <input className="m-2 w-full h-12 placeholder:text-gray-500 pl-[14px]"
                placeholder="Enter your name..."
                value={userName}
                autoFocus 
                onChange={({ target }) => setUserName(target.value)}
                onKeyDown={onEnter}>
            </input>
            <button className={`m-2 w-full bg-teal-400 text-slate-50 uppercase font-bold ${!userName ? "disabled:opacity-50" : ""}`} onClick={register} disabled={!userName}>Start</button>
        </div>
    </>
}