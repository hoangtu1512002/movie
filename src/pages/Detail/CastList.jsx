import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import { imageConfig } from "../../api/axiosClient";
import { useEffect, useState } from "react";

function CastList(props) {
  const { category } = useParams();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 5));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((cast, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"
            style={{
              backgroundImage: `url(${imageConfig.w500Image(
                cast.profile_path
              )})`,
            }}
          >
            <p className="casts__item_name">{cast.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CastList;
