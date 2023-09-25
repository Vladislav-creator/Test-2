import { gallery } from "./script";
function renderGallery(arr) {
    // Перевірка чи існує галерея перед вставкою даних
    if (!gallery) {
      return;
    }
  
    const markup = arr.map((item) => `<li class='gallery-item'>
         <a class="gallery__link"  href="${item.urls.regular}">
             <img class="gallery-item__img" src='${item.urls.small}' alt='${item.alt_description}'/>
   </a>
           </li>`).join('');
  
     gallery.insertAdjacentHTML('beforeend', markup);
  }
  export {renderGallery}