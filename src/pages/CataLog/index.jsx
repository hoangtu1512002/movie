
import { useParams } from 'react-router-dom';

import PageHeader from '../../components/layout/page-header/PageHeader';
import { category as cate } from '../../api/tmdbApi';
import MovieGrid from '../../components/layout/movie-grid/MovieGrid';

function CataLog() {

    let {category} = useParams();

    return ( <div>
        <PageHeader>{category === cate.movie ? 'Movie': 'Tv Seri'}</PageHeader>
        <div className="container">
            <div className="section mb-3">
                <MovieGrid category={category}/>
            </div>
        </div>
    </div> );
}

export default CataLog;