export async function searchImages(query, page) {
  const apiKey = '36788104-9dc5be52a1a8677ca3c469033';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=20`;

  const response = await fetch(url);
  const data = await response.json();

  return data.hits;
}