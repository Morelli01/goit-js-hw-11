export function createMarkup(images) {
  const markupGallery = images
    .map(image => {
      return `<div class="photo-card">
  <a href="${image.largeImageURL}"><img class="photo-card_img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  return markupGallery;
}