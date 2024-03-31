import PersonCard from '../components/Card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Función para obtener los datos de la API
        const fetchData = async () => {
            try {
                const response = await fetch('https://ff5b2742-2b8c-419c-b1d8-6b7380c86b06-00-3h30on4e3axhb.worf.replit.dev/api/persons');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Llama a la función de obtención de datos cuando el componente se monta
        fetchData();
    }, []);

    return (
        <>
            <div id="cardContainer" className='flex flex-wrap justify-center items-center p-24 gap-8 h-full'>
                <div className="w-full sm:w-1/3 mb-8">
                    <Link to="/submit">
                        <div className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-1 hover:bg-neutral-300 hover:scale-110 transition active:scale-90 active:border-2">
                            <img className='rounded-xl w-full aspect-video' src='/add.webp' />
                            <h1 className='font-bold text-xl'>Add new</h1>
                            <p>Add a person to the wall</p>
                        </div>
                    </Link>
                </div>
                {data.map(person => (
                    <div key={person.userid} className="w-full sm:w-1/3 mb-8">
                        <PersonCard
                            userid={person.id} // Cambiar userid por id
                            username={person.name} // Cambiar username por name
                            userage={person.age} // Cambiar userage por age
                            userimg={person.img} // Cambiar userimg por img
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
