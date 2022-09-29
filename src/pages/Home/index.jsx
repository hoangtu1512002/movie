import { Link } from "react-router-dom";

import { OutLineButton } from "../../components/layout/button/Button";
import HeroSlide from "../../components/layout/hero-slide/HeroSlide";
import MoviesList from "../../components/layout/movies-list/MoviesList";
import { category, movieType, tvType } from '../../api/tmdbApi';

function Home() {
    return ( 
    <div>
        <HeroSlide />
        <div className="container">
            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Trending Movies</h2>
                    <Link to="/movie">
                        <OutLineButton className="small">View more</OutLineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type={movieType.popular}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Top Rated Movies</h2>
                    <Link to="/movie">
                        <OutLineButton className="small">View more</OutLineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type={movieType.top_rated}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Trending TV</h2>
                    <Link to="/tv">
                        <OutLineButton className="small">View more</OutLineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type={tvType.popular}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Top rate TV</h2>
                    <Link to="/tv">
                        <OutLineButton className="small">View more</OutLineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type={tvType.top_rated}/>
            </div>
        </div>
    </div> );
}

export default Home;