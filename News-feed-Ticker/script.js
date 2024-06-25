const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

const generateUI = (articles) => {
  container.innerHTML = "";
  articles.forEach((item) => {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">${item.title}</div>
      <div class="news-description">${item.description || item.content || ""}</div>
      <a href="${item.url}" target="_blank" class="view-button">Read More</a>
    </div>`;
    card.addEventListener("click", () => openPopup(item));
    container.appendChild(card);
  });
};

const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

const createOptions = () => {
  options.forEach((i) => {
    optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}" onclick="selectCategory(event,'${i}')">${i}</button>`;
  });
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};

const openPopup = (article) => {
  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");

  popupContent.innerHTML = `
    <span class="close" onclick="closePopup()">&times;</span>
    <h2 class="popup-title">${article.title}</h2>
    <p class="popup-description">${article.description || article.content || ""}</p>
    <a href="${article.url}" class="popup-link" target="_blank">Read More</a>
  `;

  popup.style.display = "flex";
};

const closePopup = () => {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
};
