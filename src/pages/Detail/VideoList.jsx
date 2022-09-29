import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";

function Videos(props) {
  const { category } = useParams();

  const [videos, setVideo] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      setVideo(response.results.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);
  return (
    <div>
      {videos.map((item, i) => (
        <Video key={i} item={item}></Video>
      ))}
    </div>
  );
}

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(()=> {
    const height = iframeRef.current.offsetWidth * 6.5 / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, [])

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default Videos;
