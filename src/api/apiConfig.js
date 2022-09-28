const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '8712e8c17441c701fbc30bb822616eef',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default apiConfig;