class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1, hold: 10 },
    animate = false,
    sprites,
    isEnemy = false,
    rotation = 0,
    name,
    dWidth,
    dHeight,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.health = 100;
    this.isEnemy = isEnemy;
    this.rotation = rotation;
    this.name = name;

    this.dWidth = dWidth;
    this.dHeight = dHeight;
  }

  draw = () => {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.health / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.health / 2
    );
    c.globalAlpha = this.opacity;
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.dWidth ?? this.image.width / this.frames.max,
      this.dHeight ?? this.image.height
    );
    c.restore();

    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  };

  attack = ({ attack, recipient, renderedSprites }) => {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML =
      this.name + " used " + attack.name;

    this.health -= attack.damage;
    let healthBar = this.isEnemy ? "#playerHealthBar" : "#enemyHealthBar";

    let rotation = this.isEnemy ? -2.2 : 1;

    switch (attack.name) {
      case "Tackle":
        const tl = gsap.timeline();

        let movementDistance = this.isEnemy ? -20 : 20;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              // enemy gets hit
              gsap.to(healthBar, {
                width: this.health + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });

              gsap.to(recipient, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;

      case "Fireball":
        const fireballImage = new Image();
        fireballImage.src = "./images/fireball.png";

        const fireball = new Sprite({
          position: { x: this.position.x, y: this.position.y },
          image: fireballImage,
          frames: { max: 4, hold: 10 },
          animate: true,
          rotation,
        });
        renderedSprites.splice(1, 0, fireball);

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            renderedSprites.splice(1, 1);

            // enemy gets hit
            gsap.to(healthBar, {
              width: this.health + "%",
            });

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
          },
        });
        break;
    }
  };
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
