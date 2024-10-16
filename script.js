async function getnews() {
  let full_url =
    "https://gnews.io/api/v4/top-headlines?token=a175ac9bf19a19e7e95f50136ebffcbb&country=us&lang=en";

  try {
    let newsResponse = await fetch(full_url);
    let newsData = await newsResponse.json();

    if (newsResponse.ok) {
      newsData.articles.forEach(article => {
        document.getElementById("news").innerHTML += `
          <div class="card" style="width: 18rem;">
            <img src="${article.image}" class="card-img-top" alt="News Image">
            <div class="card-body">
              <p class="card-text">${article.title}</p>
              <a href="${article.url}" class="btn btn-primary">Read full article</a>
            </div>
          </div>`;
      });
    } else {
      document.getElementById("news").innerHTML = `
        <div class="error-container">
          <p>Oops! Trouble loading the news.</p>
          <p>Please try again later.</p>
        </div>`;
      console.error(`Error ${newsResponse.status}: ${newsData.errors[0]}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("news").innerHTML = `
      <div class="error-container">
        <p>Oops! An error occurred while fetching the news.</p>
      </div>`;
  }
}

document.getElementById("country").textContent = "United States";

// Call the function to load the news
getnews();
