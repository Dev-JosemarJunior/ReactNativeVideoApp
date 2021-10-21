import axios from "axios";

// URL filmes em cartas
// https://api.themoviedb.org/3/movie/now_playing?api_key=8173beb6bab5adc84229386cafae2eb8&pt-BR&page=1

export const key = '8173beb6bab5adc84229386cafae2eb8'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;