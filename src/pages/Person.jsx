import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as contentful from 'contentful';
import NotFound from '../pages/404';

export default function Person() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const client = contentful.createClient({
            space: 'ax4gd2bd41ec',
            accessToken: 'E99M7-BkMDjDoqV_1Wkeirbk-8QKeNRJ6c9_GcPIK3w'
        });

        client.getEntry(id)
            .then(entry => {
                setUser(entry);
                setLoading(false);
                // Update document title
                document.title = `${entry.fields.fullname} - Profile - YourProfiles`;
            })
            .catch(error => {
                console.error('Error fetching entry:', error);
                setLoading(false);
            });

        // Cleanup function
        return () => {
            // Reset document title
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
                <img className='w-96 aspect-video rounded-xl' src={user.fields.img.fields.file.url} alt={user.fields.img.fields.title} />
                <div id="text" className='flex flex-col gap-4'>
                    <p className='font-bold text-2xl'>Name: <span className='font-normal'>{user.fields.fullname}</span></p>
                    <p className='font-semibold text-xl'>Age: <span className='font-normal'>{user.fields.age}</span></p>
                </div>
            </div>
            <p className='max-w-[700px] sm:p-0 sm:py-4 px-12'>{user.fields.sum}</p>
        </>
    );
}
