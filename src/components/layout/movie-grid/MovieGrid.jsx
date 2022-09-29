import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import tmdbApi, { category, movieType, tvType } from "../../../api/tmdbApi";
import Button, { OutLineButton } from "../button/Button";
import MovieCard from "../movie-card/MovieCard";
import Input from "../input/Input";
import "./MovieGrid.scss";

function MovieGrid(props) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie: // == 'movie':
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;

          default: // == 'tv':
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };

        response = await tmdbApi.search(props.category, { params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [props.category, keyword]);

  const loadmore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = { page: page + 1 };
      switch (props.category) {
        case category.movie: // == 'movie':
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;

        default: // == 'tv':
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };

      response = await tmdbApi.search(props.category, { params });
    }

    const itemLoadMore = [...items, ...response.results];
    setItems(itemLoadMore);
    setPage(page + 1);
  };

  return (
    <div>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword}></MovieSearch>
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutLineButton className="samll" onClick={loadmore}>
            Load more
          </OutLineButton>
        </div>
      ) : null}
    </div>
  );
}

const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const navigate = useNavigate();

  const gotoSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        gotoSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, gotoSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Input>
      <Button className="small" onClick={gotoSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
