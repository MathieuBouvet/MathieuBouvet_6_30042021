function byPopularityDescending(media1, media2) {
  return media2.likes + media2.liked - (media1.likes + media1.liked);
}

function byDateDescending(media1, media2) {
  return Date.parse(media2.date) - Date.parse(media1.date);
}

function byTitleAlphabetical(media1, media2) {
  return media1.title.localeCompare(media2.title);
}

export const sortFns = {
  popularity: byPopularityDescending,
  date: byDateDescending,
  title: byTitleAlphabetical,
};
