const form = document.querySelector("#nameForm");
const input = document.querySelector("#nameInput");
const letter = document.querySelector("#letter");
const card = document.querySelector(".confession-card");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let followFrame = 0;
const typeSpeedMultiplier = 2.15;

function followTyping(target) {
  cancelAnimationFrame(followFrame);
  followFrame = requestAnimationFrame(() => {
    const isCardScrollable = card.scrollHeight > card.clientHeight + 4;

    if (isCardScrollable) {
      card.scrollTo({
        top: card.scrollHeight,
        behavior: "smooth"
      });
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}

function getLetterBlocks(name) {
  return [
    {
      text: `Hey, ${name}. My heart has been whispering something to me,\nand I think it is finally time to tell you..... (,,>_<,,)`,
      speed: 42
    },
    {
      text: "I just can't stop thinking about how amazing you are.\nYou're honestly so attractive,\nbut..................",
      speed: 46
    },
    {
      text: "It's more than just that.",
      speed: 58
    },
    {
      text: "There's something about you that keeps me thinking\nabout you all the time.",
      speed: 44
    },
    {
      text: "Hmmm.\nHmmmmmm...\nUhmmmmmmmmmmm...",
      speed: 86
    },
    {
      text: "I LIKE YOU \uD83E\uDD70 \uD83D\uDC93",
      className: "big-line",
      speed: 78
    },
    {
      text: "For so many reasons.\nI like your flaws, your imperfections, and the way they make you so perfectly you. \uD83D\uDC93\nI love your personality, your vibe, and how you just light up everything around you. \uD83D\uDC93\nYour style is effortless, and your smile... it just makes everything better. \uD83D\uDC93",
      speed: 34
    },
    {
      text: "I made this little page just to show you how deeply I care, because saying it out loud feels scary, but keeping it in feels even harder.",
      speed: 36
    },
    {
      text: `So yeah... ${name}, I like you. A lot. \uD83D\uDC93`,
      className: "closing",
      speed: 62
    }
  ];
}

async function typeBlock(block, index) {
  const paragraph = document.createElement("p");
  paragraph.style.animationDelay = `${Math.min(index * 70, 420)}ms`;

  if (block.className) {
    paragraph.className = block.className;
  }

  letter.append(paragraph);
  paragraph.classList.add("typing-cursor");

  for (const character of block.text) {
    paragraph.textContent += character;
    followTyping(paragraph);
    const punctuationPause = ".!?".includes(character) ? 320 : 0;
    const commaPause = ",;:".includes(character) ? 150 : 0;
    const linePause = character === "\n" ? 560 : 0;
    await wait((block.speed * typeSpeedMultiplier) + punctuationPause + commaPause + linePause);
  }

  paragraph.classList.remove("typing-cursor");
  followTyping(paragraph);
  await wait(760);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = input.value.trim() || "you";
  form.querySelector("button").disabled = true;
  letter.hidden = false;
  letter.textContent = "";

  letter.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  for (const [index, block] of getLetterBlocks(name).entries()) {
    await typeBlock(block, index);
  }

  form.querySelector("button").disabled = false;
});
