//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const episodeCount = document.createElement("p");
  episodeCount.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(episodeCount);

  const credit = document.createElement("p");
  credit.innerHTML =
    'Data from <a href="https://tvmaze.com" target="_blank">TVMaze.com</a>';
  rootElem.appendChild(credit);

  for (const episode of episodeList) {
    const card = makeEpisodeCard(episode);
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

window.onload = setup;
