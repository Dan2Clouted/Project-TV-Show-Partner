function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  for (let i = 0; i < episodeList.length; i++) {
    const card = makeEpisodeCard(episodeList[i]);
    rootElem.appendChild(card);
  }
}

function makeEpisodeCard(episode) {
  const seasonNum = String(episode.season).padStart(2, "0");
  const episodeNum = String(episode.number).padStart(2, "0");
  const episodeCode = "S" + seasonNum + "E" + episodeNum;

  const card = document.createElement("div");
  card.classList.add("episode-card");

  card.innerHTML = `
    <h2>${episode.name} - ${episodeCode}</h2>
    <img src="${episode.image.medium}" alt="${episode.name}" />
    ${episode.summary}
  `;

  return card;
}

let allEpisodes = [];

fetch("https://api.tvmaze.com/shows/82/episodes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    allEpisodes = data;
    document.getElementById("message").textContent = "";
    makePageForEpisodes(allEpisodes);
  })
  .catch(function () {
    document.getElementById("message").textContent = "Error loading data";
  });
