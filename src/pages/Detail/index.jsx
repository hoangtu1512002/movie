import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";

import tmdbApi, { category as cate } from "../../api/tmdbApi";
import { imageConfig } from "../../api/axiosClient";

import VideoList from "./VideoList";
import { OutLineButton } from "../../components/layout/button/Button";
import "./Detail.scss";
import CastList from "./CastList";
import MovieList from "../../components/layout/movies-list/MoviesList";
import PlayVideo from "./PlayVidep";

function Detail() {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const handlePlayVidep = async () => {
    const modal = document.querySelector(`#modal_${id}`);

    const videos = await tmdbApi.getVideos(cate.movie, id);

    if (videos.results.length > 0) {
      const videoPlay = videos.results[0].key || videos.results[1].key;

      const videoSrc = "https://www.youtube.com/embed/" + videoPlay;

      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else if (videos.results.length === 0 ) {
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", "https://www.youtube.com/embed/bCVfgWTkpd0");
    } else {
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", "https://www.youtube.com/embed/bCVfgWTkpd0");
    }

    modal.classList.toggle("active");
  };

  return (
    <div>
      {item && (
        <div>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${imageConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${imageConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              >
                <div className="movie-content__play">
                  <OutLineButton className="small" onClick={handlePlayVidep}>
                    Xem ngay
                  </OutLineButton>
                </div>
              </div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Cast</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList
                category={category}
                type="similar"
                id={item.id}
              ></MovieList>
            </div>
          </div>
        </div>
      )}
      <PlayVideo id={id}></PlayVideo>
    </div>
  );
}

export default Detail;
