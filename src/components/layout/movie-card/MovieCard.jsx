
import { Link } from 'react-router-dom';

import Button from '../button/Button';
import { category } from '../../../api/tmdbApi';
import {imageConfig} from '../../../api/axiosClient'

import './MovieCard.scss';

function MovieCard(props) {

    const item = props.item;

    const link = '/' + category[props.category] + '/' +item.id;

    const bg = imageConfig.w500Image(item.poster_path || item.backdrop_path);

    return ( 
        <Link to={link}>
            <div className='movie-card' style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i className='bx bx-play'></i>
                </Button>
            </div> 
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;