import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <h1 className='text-5xl'>test</h1>
        </div>
    )
}