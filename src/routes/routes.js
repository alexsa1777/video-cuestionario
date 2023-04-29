import Quiz from "../views/quiz";
import Question from "../views/question";
import Done from "../views/done";

const routes = [
    {
        name: 'quiz',
        path: '/',
        Component: Quiz
    },
    {
        name: 'question',
        path: '/question/:id',
        Component: Question
    },
    {
        name:'done',
        path:'/done',
        Component: Done
    }
]

export default routes