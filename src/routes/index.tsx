import {createFileRoute} from '@tanstack/react-router'
import {redirectToLoginIfNeeded} from "../utils/redirect/redirect.utils";

export const Route = createFileRoute('/')({
    component: App,
    beforeLoad: redirectToLoginIfNeeded
})

function App() {

    return (
        <div>
        </div>
    )
}