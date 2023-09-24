import axios from "axios";
// Збереження ключа API в окремому файлі змінних

axios.defaults.headers.common['Authorization'] = "LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc";

// Перевірка помилок під час виконання запиту до серверу
axios.defaults.baseURL = "https://api.unsplash.com/search/photos"


axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return Promise.reject(error);
  },
);

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?query=${query}&page=${page}&per_page=${perPage}& orientation='landscape',`,
  );
  return response.data; 
}

export { fetchImages };

