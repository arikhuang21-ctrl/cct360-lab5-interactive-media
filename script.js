const sounds = [
  {
    name: "Pencil",
    description: "A pencil moving across a sheet of paper.",
    image: "pencil.svg",
    alt: "A pencil drawing a line on paper",
    audio: "pencil.wav"
  },
  {
    name: "Keyboard",
    description: "A few keys being pressed while I type.",
    image: "keyboard.svg",
    alt: "A small computer keyboard",
    audio: "keyboard.wav"
  },
  {
    name: "Mug",
    description: "A ceramic mug placed back on the desk.",
    image: "mug.svg",
    alt: "A mug sitting on a desk",
    audio: "mug.wav"
  }
];

const image = document.getElementById("sound-image");
const number = document.getElementById("sound-number");
const title = document.getElementById("sound-title");
const description = document.getElementById("sound-description");
const audio = document.getElementById("sound-audio");
const playButton = document.getElementById("play-button");
const status = document.getElementById("sound-status");
const volume = document.getElementById("volume");
const choices = document.querySelectorAll(".sound-choice");

let currentSound = 0;

// controls
function updatePlayer() {
  const playing = !audio.paused;
  playButton.textContent = playing ? "Pause sound" : "Play sound";
  playButton.setAttribute("aria-pressed", String(playing));
  status.textContent = sounds[currentSound].name + " sound is " + (playing ? "playing." : "paused.");
}

// audio events
playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", updatePlayer);
audio.addEventListener("pause", updatePlayer);
audio.addEventListener("ended", updatePlayer);

volume.addEventListener("input", function () {
  audio.volume = Number(volume.value);
});

// change sound
function showSound(index) {
  currentSound = index;
  audio.pause();
  audio.currentTime = 0;

  const sound = sounds[index];
  image.src = sound.image;
  image.alt = sound.alt;
  number.textContent = "Sound " + (index + 1) + " of 3";
  title.textContent = sound.name;
  description.textContent = sound.description;
  audio.src = sound.audio;
  audio.load();

  choices.forEach(function (choice, choiceIndex) {
    const active = choiceIndex === index;
    choice.classList.toggle("active", active);
    if (active) {
      choice.setAttribute("aria-current", "true");
    } else {
      choice.removeAttribute("aria-current");
    }
  });

  updatePlayer();
}

choices.forEach(function (choice) {
  choice.addEventListener("click", function () {
    showSound(Number(choice.dataset.sound));
  });
});

audio.volume = Number(volume.value);
