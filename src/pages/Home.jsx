import PersonCard from '../components/Card';
import { useState, useEffect } from 'react';
import * as contentful from 'contentful';

const client = contentful.createClient({
    space: 'ax4gd2bd41ec',
    accessToken: 'E99M7-BkMDjDoqV_1Wkeirbk-8QKeNRJ6c9_GcPIK3w'
});

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Función para obtener los datos de Contentful
        const fetchData = async () => {
            try {
                const response = await client.getEntries();
                setData(response.items);
            } catch (error) {
                console.error('Error fetching data from Contentful:', error);
            }
        };

        // Llama a la función de obtención de datos cuando el componente se monta
        fetchData();
    }, []);

    return (
        <>
            <div id="cardContainer" className='flex flex-wrap justify-center items-center p-24  gap-8 h-full'>
            <div className="w-full sm:w-1/3 mb-8">
                <a href="https://app.contentful.com/spaces/ax4gd2bd41ec/views/entries"><div className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-1 hover:bg-neutral-300 hover:scale-110 transition active:scale-90 active:border-2">
                    <img className='rounded-xl w-full aspect-video' src='/add.webp'/>
                    <h1 className='font-bold text-xl'>Add new</h1>
                    <p>Add a person to the wall</p>
                </div></a>
                </div>
                {data.map(user => (
                    <div key={user.sys.id} className="w-full sm:w-1/3 mb-8">
                        <PersonCard
                            userid={user.sys.id}
                            username={user.fields.fullname}
                            userage={user.fields.age}
                            userimg={user.fields.img.fields.file.url}
                            userimgalt={user.fields.img.fields.file.title}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
