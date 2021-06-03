export function mapById(map, medium) {
  map[medium.id] = medium;
  return map;
}

export function addLikedAttribute(medium) {
  return {
    ...medium,
    liked: false,
  };
}

export function addProfilePicDominantColor(photographer) {
  return {
    ...photographer,
    dominantColor: profilePicDominantColor[`p${photographer.id}`],
  };
}

export function addPictureDominantColor(medium) {
  if (!medium.image) {
    return medium;
  }
  return {
    ...medium,
    dominantColor:
      pictureDominantColor[`p${medium.photographerId}_${medium.id}`],
  };
}

const profilePicDominantColor = {
  p243: "#c0c5c9",
  p930: "#2b382f",
  p82: "#dbdbdb",
  p527: "#413837",
  p925: "#060709",
  p195: "#a5a5a5",
  p243: "#c0c5c9",
  p930: "#2a382f",
  p82: "#dbdbdb",
  p527: "#413837",
  p925: "#060709",
  p195: "#a5a5a5",
};

const pictureDominantColor = {
  p82_342550: "#a2761b",
  p82_8520927: "#8e909c",
  p82_9025895: "#b1a498",
  p82_9275938: "#afac9c",
  p82_2053494: "#1e2036",
  p82_7324238: "#b88b69",
  p82_7502053: "#0571ab",
  p82_8523492: "#333040",
  p82_75902334: "#e76f4e",
  p925_73852953: "#050506",
  p925_92758372: "#8eb8b1",
  p925_32958383: "#b2ac9c",
  p925_928587383: "#d4cac6",
  p925_725639493: "#af9782",
  p925_23394384: "#1b1b1b",
  p925_87367293: "#b9a39c",
  p925_593834784: "#4b3612",
  p527_343423425: "#c9dae8",
  p527_73434243: "#5d5049",
  p527_23425523: "#222419",
  p527_23134513: "#3f453e",
  p527_92352352: "#764931",
  p527_34513453: "#040404",
  p527_23523533: "#898b8c",
  p527_525834234: "#cccccc",
  p243_623534343: "#7b745c",
  p243_625025343: "#d6d1d4",
  p243_2525345343: "#262828",
  p243_2523434634: "#252b34",
  p243_398847109: "#242424",
  p243_2534342: "#c8bec2",
  p243_65235234: "#c7c0b1",
  p243_23523434: "#2e2b24",
  p243_95234343: "#87a1a7",
  p195_52343416: "#332829",
  p195_2523434: "#c6adb4",
  p195_95293534: "#2f3c3c",
  p195_356234343: "#969387",
  p195_235234343: "#88592d",
  p195_6234234343: "#b7c3d0",
  p195_6525666253: "#cec3c3",
  p195_98252523433: "#2f333e",
  p195_3523523534: "#dbe9f3",
  p930_235234343: "#303b39",
  p930_235343222: "#bddadd",
  p930_7775342343: "#3680a0",
  p930_9253445784: "#e5c3b5",
  p930_22299394: "#77888a",
  p930_3452342633: "#dadcdd",
  p930_939234243: "#b6b7c1",
  p930_222959233: "#1f1f1f",
  p930_965933434: "#41322d",
  p930_777723343: "#77acce",
};
