import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <div>
            <h1 className='text-5xl'>Accueil</h1>
            <Link to='/about'>AZrojar</Link>
            <Link to='/test'>test</Link>
        </div>
    )
}