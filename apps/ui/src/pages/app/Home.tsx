import { useLoaderData } from 'react-router';

export default function Home() {
    const data = useLoaderData();

    console.log(data);

    return (
        <main>
            <h1>QuestLog</h1>
        </main>
    );
}
