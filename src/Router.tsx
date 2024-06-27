import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListAnswersView } from "./ListAnswers/ListAnswersView"
import { QuestionView } from "./Question/QuestionView"

/**
 * App Router component
 * @returns 
 */
export const AppRouter = () => {
    return <>
        <BrowserRouter >
            <Routes>
                <Route path={`/answers`} element={<ListAnswersView />} />
                <Route path={`/`} element={<QuestionView />} />
            </Routes>
        </BrowserRouter >
    </>
}