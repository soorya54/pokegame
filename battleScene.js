const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./images/battleBackground.png";
const battleBackground = new Sprite({
  position: { x: 0, y: 0 },
  image: battleBackgroundImage,
  dWidth: canvas.width,
  dHeight: canvas.height,
});

const draggle = new Monster(monsters.Draggle);
const emby = new Monster(monsters.Emby);

const renderedSprites = [draggle, emby];

emby.attacks.forEach((attack) => {
  const button = document.createElement("button");
  button.innerHTML = attack.name;
  document.querySelector("#attacksBox").append(button);
});

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

    queue.push(() => {
      draggle.attack({
        attack: attacks.Fireball,
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
