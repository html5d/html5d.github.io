// https://gnews.io/api/v4/top-headlines?token=a175ac9bf19a19e7e95f50136ebffcbb&country=in&lang=en
//https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=efbe6953b5e24dc7857c47ac7e35e650

document.addEventListener("DOMContentLoaded", () => {
  getgeolocation();
});

async function getgeolocation() {
  let url = "https://ipapi.co/json";
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    
    let data = await response.json();
    console.log(data);  // Debug: Check if the data is coming through

    var current_location = data.country_code;
    var current__lang = data.languages;

    document.getElementById("country").textContent = data.country_name || "your location";
    getnews(current_location, current__lang);
  } catch (error) {
    console.error("Geolocation Error:", error);
    document.getElementById("country").textContent = "your location"; // Default fallback
  }
}

async function getnews(countryCode, language) {
  let full_url = `https://gnews.io/api/v4/top-headlines?token=a175ac9bf19a19e7e95f50136ebffcbb&country=${countryCode.toLowerCase()}&lang=${language.toLowerCase()}`;

  try {
    let newsResponse = await fetch(full_url);
    let newsData = await newsResponse.json();

    if (newsResponse.ok) {
      let newsContainer = document.getElementById("news");
      newsContainer.innerHTML = ""; // Clear previous content

      newsData.articles.forEach((article) => {
        newsContainer.innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${article.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text">${article.title}</p>
              <a href="${article.url}" class="btn btn-primary">Read full article</a>
            </div>
          </div>`;
      });
    } else {
      throw new Error(`Error ${newsResponse.status}: ${newsData.errors[0]}`);
    }
  } catch (error) {
    console.error("News Fetch Error:", error);
    document.getElementById("news").innerHTML = `
      <div class="error-container">
        <p>Oops! Looks like we are having some trouble loading the news.</p>
        <p>We request you to try again later.</p>
      </div>`;
  }
}
