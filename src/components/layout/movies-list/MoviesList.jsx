
import Protypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

import Button from '../button/Button';
import {imageConfig} from '../../../api/axiosClient';
import tmdbApi, {category} from '../../../api/tmdbApi';
import 'swiper/css';
import 'swiper/css/navigation';
import './MoviesList.scss';
import { useEffect, useState } from 'react';
import MovieCard from '../movie-card/MovieCard';

function MoviesList(props) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getLists = async () => {
            let response = null;
            const params = {page: 1};

            if(props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;

                    default: 
                        response = await tmdbApi.getTvList(props.type, {params: {params}});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }

        getLists();
    }, [])

    return ( <div className='movie-list'>
        <Swiper
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={'auto'}
            modules={[Autoplay, Navigation]}
            autoplay={{
                delay: 3000,
            }}
        >
            {
                items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div> );
}

MoviesList.prototype = {
    catetory: Protypes.string.isRequired,
    type: Protypes.string.isRequired
}

export default MoviesList;