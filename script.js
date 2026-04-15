// You can edit ALL of the code here
let allEpisodes = [];

function setup() {
  allEpisodes = getAllEpisodes();

  // Initial render
  showEpisodeCards(allEpisodes);
  updateCount(allEpisodes);
  populateEpisodeSelector(allEpisodes);

  // 🔍 SEARCH
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const filteredList = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchText) ||
        episode.summary.toLowerCase().includes(searchText)
      );
    });

    showEpisodeCards(filteredList);
    updateCount(filteredList);
  });

  // 📌 DROPDOWN SELECTOR (FIXED POSITION)
  const selector = document.getElementById("episode-selector");

  selector.addEventListener("change", function () {
    const selectedValue = selector.value;

    if (selectedValue === "all") {
      showEpisodeCards(allEpisodes);
      updateCount(allEpisodes);
    } else {
      const selectedEpisode = allEpisodes[selectedValue];

      showEpisodeCards([selectedEpisode]);
      updateCount([selectedEpisode]);
    }
  });
}

// 🎬 CREATE EPISODE CARD
function makeEpisodeCard(episode) {
  const season = String(episode.season).padStart(2, "0");
  const number = String(episode.number).padStart(2, "0");

  const card = document.createElement("div");
  card.classList.add("episode-card");

  card.innerHTML = `
    <h2>${episode.name} - S${season}E${number}</h2>
    <img src="${episode.image.medium}" alt="${episode.name}" />
    ${episode.summary}
  `;

  return card;
}

// 🎥 RENDER EPISODES
function showEpisodeCards(episodeList) {
  const container = document.getElementById("episode-container");

  container.innerHTML = ""; // CLEAR FIRST

  for (let episode of episodeList) {
    const card = makeEpisodeCard(episode);
    container.appendChild(card);
  }
}

// 🔢 UPDATE COUNT
function updateCount(episodeList) {
  const countElem = document.getElementById("count");
  countElem.textContent = `Displaying ${episodeList.length} episode(s)`;
}

// 📋 POPULATE DROPDOWN
function populateEpisodeSelector(episodeList) {
  const selector = document.getElementById("episode-selector");

  selector.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Episodes";
  selector.appendChild(defaultOption);

  for (let i = 0; i < episodeList.length; i++) {
    const episode = episodeList[i];

    const season = String(episode.season).padStart(2, "0");
    const number = String(episode.number).padStart(2, "0");

    const option = document.createElement("option");
    option.value = i;
    option.textContent = `S${season}E${number} - ${episode.name}`;

    selector.appendChild(option);
  }
}

window.onload = setup;
