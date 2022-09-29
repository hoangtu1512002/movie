import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './HeroSlide.scss'
import Button, { OutLineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import {imageConfig} from '../../../api/axiosClient'
import tmdbApi, {category, movieType} from '../../../api/tmdbApi';

const HeroSlide = () => {

    const [moviesItems, setMoviesItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMoviesItems(response.results.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        }
        getMovies();
    },[])

  return (
    <div className="hero-slide">
        <Swiper
            loop={true}
            slidesPerView={1}
            navigation
            spaceBetween={0}
            grabCursor={true}
            modules={[Autoplay, Navigation]}
            autoplay={{
                delay: 3000,
            }}
        >
            {moviesItems.map((item, index) => (
                <SwiperSlide key={index}>
                    {({isActive}) => (
                        <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
        
        {
            moviesItems.map((item, index) => <TrailerModal key={index} item={item}/>)
        }

    </div>
  );
}

const HeroSlideItem = props => {

    let navigate = useNavigate();

    const item = props.item;

    const backgroup = imageConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {

        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if(videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[1].key;

            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer'
        }

        modal.classList.toggle('active');
    }

    return (
        <div className={`hero-slide__item ${props.className}`} style={{backgroundImage: `url(${backgroup})`}}>
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch Now 
                        </Button>
                        <OutLineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutLineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={imageConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )

}

const TrailerModal = props => {

    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="400px" title="trailer" id="trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;

