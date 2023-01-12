const embyImage = new Image();
embyImage.src = "./images/embySprite.png";

const draggleImage = new Image();
draggleImage.src = "./images/draggleSprite.png";

cWidth = document.documentElement.clientWidth;
cHeight = document.documentElement.clientHeight;
console.log(cWidth, cHeight);
// console.log(cHeight / 4, (cWidth * 3) / 4);

const monsters = {
  Emby: {
    position: { x: cWidth / 4, y: (cHeight * 3) / 4 },
    image: {
      src: "./images/embySprite.png",
    },
    frames: { max: 4, hold: 30 },
    animate: true,
    name: "Emby",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Draggle: {
    position: { x: (cWidth * 3) / 4, y: cHeight / 4 },
    image: {
      src: "./images/draggleSprite.png",
    },
    frames: { max: 4, hold: 30 },
    animate: true,
    isEnemy: true,
    name: "Draggle",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
};
