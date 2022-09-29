import axiosClient, {apiKey} from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type] + '?api_key=' + apiKey;
        return axiosClient.get(url, params); 
    },

    getTvList: (type, params) => {
        const url = 'tv/' + movieType[type] + '?api_key=' + apiKey;
        return axiosClient.get(url, params); 
    },

    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos?api_key=' + apiKey;
        return axiosClient.get(url, {params: {}}); 
    },

    search: (cate, prams) => {
        const url = 'search/' + category[cate] + '?api_key=' + apiKey;
        return axiosClient.get(url, prams); 
    },

    detail: (cate, id, prams) => {
        const url = category[cate] + '/' + id + '?api_key=' + apiKey;
        return axiosClient.get(url, {params: {prams}}); 
    },

    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits?api_key=' + apiKey ;
        return axiosClient.get(url, {params: {}}); 
    },

    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar?api_key=' + apiKey;
        return axiosClient.get(url, {params: {}}); 
    },
}

export default tmdbApi;