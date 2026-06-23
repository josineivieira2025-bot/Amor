const openGiftButton = document.querySelector("#openGift");
const sendHeartButton = document.querySelector("#sendHeart");
const copyButton = document.querySelector("#copyLetter");
const typeAgainButton = document.querySelector("#typeAgain");
const typedLetter = document.querySelector("#typedLetter");
const toast = document.querySelector("#toast");
const photoModal = document.querySelector("#photoModal");
const modalPhoto = document.querySelector("#modalPhoto");
const closeModal = document.querySelector("#closeModal");
const mainPhoto = document.querySelector("#mainPhoto");
const photoCaption = document.querySelector("#photoCaption");
const openPhotoButton = document.querySelector("#openPhoto");
const prevPhotoButton = document.querySelector("#prevPhoto");
const nextPhotoButton = document.querySelector("#nextPhoto");
const thumbs = [...document.querySelectorAll(".thumb")];
const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll(".dot")];

const photos = [
  {
    src: "assets/rafa-josi-01.jpeg",
    caption: "Rafaelle e Josinei, um momento que eu guardo com carinho.",
  },
  {
    src: "assets/rafa-josi-02.jpeg",
    caption: "Até de longe, seu sorriso consegue chegar perto de mim.",
  },
  {
    src: "assets/rafa-josi-03.jpeg",
    caption: "Quando a gente está bem, o mundo fica mais leve.",
  },
  {
    src: "assets/rafa-josi-04.jpeg",
    caption: "Você do meu lado ainda é uma das minhas cenas preferidas.",
  },
  {
    src: "assets/rafa-josi-05.jpeg",
    caption: "Uma lembrança nossa para lembrar que existe amor aqui.",
  },
  {
    src: "assets/rafa-josi-06.jpeg",
    caption: "Cada foto vira saudade quando eu penso em você.",
  },
  {
    src: "assets/rafa-josi-07.jpeg",
    caption: "Tem dia que eu só queria voltar para perto do seu abraço.",
  },
  {
    src: "assets/rafa-josi-08.jpeg",
    caption: "O que é simples com você fica especial.",
  },
  {
    src: "assets/rafa-josi-09.jpeg",
    caption: "Meu pensamento ainda encontra você em todos os caminhos.",
  },
];

const fullLetter = `Rafaelle,

Eu queria conseguir te falar tudo isso olhando nos seus olhos, mas enquanto esse momento não chega, eu fiz esse cantinho para você sentir um pouco do que eu guardo aqui dentro.

Mesmo quando a gente está meio afastado, você continua sendo uma parte muito bonita da minha vida. Eu sinto falta da sua presença, do seu jeito, do seu sorriso e daquela paz que aparece quando a gente está bem.

A gente ainda não mora junto, ainda está construindo nosso caminho, e eu sei que nem todo dia é fácil. Mas eu não quero que a distância, o silêncio ou as dificuldades façam você esquecer do quanto eu te quero bem. Eu não quero só dizer que te amo; eu quero aprender a cuidar melhor desse amor.

Se em algum momento eu falhei em demonstrar, me desculpa. Meu sentimento por você não é pequeno, não é passageiro e não é coisa de momento. Ele existe na saudade, nas lembranças, na vontade de te ver sorrir e no desejo de um dia dividir uma casa, uma rotina e uma vida com você.

Eu ainda acredito na gente. Acredito que, com paciência, conversa, carinho e verdade, a gente pode encontrar de novo o nosso lugar. Quando eu penso no futuro, eu ainda consigo imaginar você ali, do meu lado, fazendo dos dias comuns uma coisa especial.

Recebe essa surpresa como um abraço meu. Um abraço dizendo: eu sinto sua falta, eu penso em você, eu acredito na gente e eu ainda quero viver muita coisa bonita ao seu lado.

Com amor,
Josinei.`;

let currentPhoto = 0;
let typingTimer;
let hasStartedTyping = false;

document.body.classList.add("no-scroll");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function createHeart(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.style.setProperty("--x", `${x}px`);
  heart.style.setProperty("--y", `${y}px`);
  heart.style.setProperty("--size", `${Math.round(20 + Math.random() * 24)}px`);
  document.body.appendChild(heart);
  window.setTimeout(() => heart.remove(), 1700);
}

function burstHearts(count = 12) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let index = 0; index < count; index += 1) {
    window.setTimeout(() => {
      createHeart(
        centerX + (Math.random() - 0.5) * 280,
        centerY + (Math.random() - 0.5) * 180,
      );
    }, index * 65);
  }
}

function copyWithFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function setPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const selected = photos[currentPhoto];

  mainPhoto.style.opacity = "0";
  window.setTimeout(() => {
    mainPhoto.src = selected.src;
    mainPhoto.alt = selected.caption;
    photoCaption.textContent = selected.caption;
    modalPhoto.src = selected.src;
    modalPhoto.alt = selected.caption;
    mainPhoto.style.opacity = "1";
  }, 160);

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-selected", thumbIndex === currentPhoto);
  });
}

function typeLetter() {
  if (!typedLetter) return;

  window.clearInterval(typingTimer);
  typedLetter.textContent = "";
  hasStartedTyping = true;

  let index = 0;
  typingTimer = window.setInterval(() => {
    typedLetter.textContent += fullLetter[index] || "";
    index += 1;

    if (index >= fullLetter.length) {
      window.clearInterval(typingTimer);
    }
  }, 16);
}

function unlockGift() {
  document.body.classList.remove("no-scroll");
  document.querySelector("#revelacao")?.scrollIntoView({ behavior: "smooth" });
  burstHearts(18);
}

openGiftButton?.addEventListener("click", unlockGift);

prevPhotoButton?.addEventListener("click", () => setPhoto(currentPhoto - 1));
nextPhotoButton?.addEventListener("click", () => setPhoto(currentPhoto + 1));

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    setPhoto(Number(thumb.dataset.index));
    createHeart(window.innerWidth / 2, window.innerHeight * 0.7);
  });
});

openPhotoButton?.addEventListener("click", () => {
  if (photoModal?.showModal) {
    photoModal.showModal();
  }
});

closeModal?.addEventListener("click", () => photoModal?.close());
photoModal?.addEventListener("click", (event) => {
  if (event.target === photoModal) {
    photoModal.close();
  }
});

document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-open");
    createHeart(window.innerWidth * Math.random(), window.innerHeight * 0.72);
  });
});

copyButton?.addEventListener("click", async () => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(fullLetter);
    } else if (!copyWithFallback(fullLetter)) {
      throw new Error("Fallback copy failed");
    }
    showToast("Carta copiada.");
  } catch {
    if (copyWithFallback(fullLetter)) {
      showToast("Carta copiada.");
      return;
    }

    showToast("Selecione a carta e copie manualmente.");
  }
});

typeAgainButton?.addEventListener("click", typeLetter);

sendHeartButton?.addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  burstHearts(14);
  createHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
  showToast("Carinho enviado para Rafaelle.");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");

      if (entry.target.closest("#carta") && !hasStartedTyping) {
        typeLetter();
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const screenObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const index = screens.indexOf(visible.target);
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  },
  { threshold: [0.42, 0.58, 0.74] },
);

screens.forEach((screen) => screenObserver.observe(screen));

document.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target instanceof HTMLButtonElement ||
    target instanceof HTMLAnchorElement ||
    target instanceof HTMLVideoElement
  ) {
    return;
  }

  if (document.body.classList.contains("no-scroll")) return;
  createHeart(event.clientX, event.clientY);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") setPhoto(currentPhoto - 1);
  if (event.key === "ArrowRight") setPhoto(currentPhoto + 1);
});

setPhoto(0);
