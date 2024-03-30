import { Link } from 'react-router-dom';
export default function PersonCard(props) {
    const { userid, username, userage, userimg, usersum, userimgalt } = props;
    return (
        <Link to={`/person/${userid}`} preventScrollReset={true}>
            <div className="bg-neutral-200 rounded-xl p-4 flex flex-col gap-1 hover:bg-neutral-300 hover:scale-110 transition active:scale-90 active:border-2" id={'user-' + userid}>
                <img className='rounded-xl w-full aspect-video' src={userimg} alt={userimgalt} />
                <h1 className='font-bold text-xl'>{username}</h1>
                <p>Age: <span className="font-bold">{userage}</span></p>
            </div>
        </Link>
    );
};