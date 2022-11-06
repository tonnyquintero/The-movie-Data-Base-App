import {API_KEY} from "./secret.js";

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY)
    const data = await res.json();
    const series = data.results;

    series.forEach(serie => {
        const trendingPreviewMoviesContainer = document.querySelector
        ('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'
        + serie.poster_path);

        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });
}

getTrendingMoviesPreview();