const battleBackgoundImage = new Image();
battleBackgoundImage.src = "./images/battleBackground.png";
const battleBackground = new Sprite({
  position: { x: 0, y: 0 },
  image: battleBackgoundImage,
  dWidth: canvas.width,
  dHeight: canvas.height,
});

const draggleImage = new Image();
draggleImage.src = "./images/draggleSprite.png";
const draggle = new Sprite({
  position: { x: 800, y: 300 },
  image: draggleImage,
  frames: { max: 4, hold: 30 },
  animate: true,
  isEnemy: true,
  name: "Draggle",
});

const embyImage = new Image();
embyImage.src = "./images/embySprite.png";
const emby = new Sprite({
  position: { x: 300, y: 700 },
  image: embyImage,
  frames: { max: 4, hold: 30 },
  animate: true,
  name: "Emby",
});

const renderedSprites = [draggle, emby];

const animateBattle = () => {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
};

animateBattle();

const queue = [];

// event listeners for buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    emby.attack({
      attack: attacks[e.currentTarget.innerHTML],
      recipient: draggle,
      renderedSprites,
    });

    queue.push(() => {
      draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        renderedSprites,
      });
    });
  });
});

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
