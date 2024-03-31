import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../pages/404';

export default function Person() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Haciendo una solicitud a tu API
        fetch(`https://ubiquitous-neighborly-waiter.glitch.me/api/persons`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const foundUser = data.find(person => person.id === id);
                if (foundUser) {
                    setUser(foundUser);
                    // Actualizando el título del documento
                    document.title = `${foundUser.name} - Profile - YourProfiles`;
                } else {
                    throw new Error('User not found');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                setLoading(false);
            });

        // Función de limpieza
        return () => {
            // Restablecer el título del documento
            document.title = "YourProfiles - a simple page where users can add people to it";
        };
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <NotFound id={id} />;
    }

    return (
        <>
            <div className='p-16 flex sm:flex-row flex-col items-center gap-6 justify-between'>
                <img className='w-96 aspect-video rounded-xl' src={user.img} alt={user.name} />
                <div id="text" className='flex flex-col gap-4'>
                    <p className='font-bold text-2xl'>Name: <span className='font-normal'>{user.name}</span></p>
                    <p className='font-semibold text-xl'>Age: <span className='font-normal'>{user.age}</span></p>
                </div>
            </div>
            <p className='max-w-[700px] sm:p-0 sm:py-4 px-12'>{user.sum}</p>
        </>
    );
}
