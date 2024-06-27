import { formatDistance } from "date-fns"
import { Answer } from "../Shared/Entities/Answer"

export interface ListAnswerProps {
    items: Answer[]
}

export const ListAnswers = ({ items }: ListAnswerProps) => {
    return <>
        <div className="w-full max-h-[500px] overflow-hidden overflow-y-auto">
            <ul className="px-0">
                {items.map(ans => <>
                    <li className="py-4 cursor-pointer hover:text-white hover:bg-teal-400 rounded-sm border">
                        <div className="flex items-center">
                            <label className="ml-3 block text-gray-900">
                                <span className="text-xl font-medium">{ans.value}</span>
                                <span className="font-light text-gray-500"> - answered by {ans.owner}</span>
                            </label>
                        </div>
                        <div className="ml-3 text-sm grid font-light text-gray-500 place-items-start">{formatDistance(ans.createdOn, new Date(),{ addSuffix: true })}</div>
                    </li>
                </>
                )}
            </ul>
        </div>
    </>
}

