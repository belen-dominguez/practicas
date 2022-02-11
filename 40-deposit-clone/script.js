const controller = new ScrollMagic.Controller();

//hero animation
const tlHero = new TimelineMax();
const heroText = [".hero-right", ".hero-left"];
tlHero.add("heroStart");
tlHero.from(
  ".hero-right",
  2,
  { opacity: 0, y: 100, ease: Power4.easeInOut },
  "heroStart"
);
tlHero.from(
  ".hero-left",
  2,
  { opacity: 0, y: 100, ease: Power4.easeInOut },
  "heroStart"
);

//scroll down
const indexSection = document.querySelector(".index");
const scrollArrow = document.querySelector(".scroll-down i");

scrollArrow.addEventListener("click", () => {
  indexSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});

//index image selector
const indexImage = document.querySelector(".index-image img");
const indexLinks = document.querySelectorAll(".index-link");

indexLinks.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    const color = e.target.dataset.color;
    const image = e.target.dataset.info;

    indexImage.style.display = "block";
    indexImage.style.border = ` 2px solid #${color}`;
    indexImage.src = `./images/${image}.jpg`;
  });

  link.addEventListener("mouseleave", (e) => {
    indexImage.style.display = "none";
  });
});

//contet sticky scale up
const stickyContents = document.querySelectorAll(".content-sticky");

stickyContents.forEach((sticky) => {
  const updatePercentage = () => {
    tl.progress();
  };
  const sibling = sticky.dataset.sibling;
  const parent = sticky.dataset.parent;
  const tl = new TimelineMax({ onUpdate: updatePercentage });

  tl.from(
    `.${parent}
   .content-sticky`,
    1.5,
    {
      scale: 0.6,
      borderTopLeftRadius: "80px",
      borderTopRightRadius: "80px",
      ease: Power4.easeInOut,
    }
  );

  const scene = new ScrollMagic.Scene({
    triggerElement: `.${sibling}`,
    triggerHook: "onLeave",
    duration: "100%",
  })
    .setTween(tl)
    .addTo(controller);
});

//sticky containers
const stickyContainers = document.querySelectorAll(".sticky");

stickyContainers.forEach((sticky) => {
  const gallery = sticky.querySelector(".image-gallery");
  const floating = sticky.querySelector(".floating-content");

  const updatePercentage = () => {
    tl.progress();
  };

  const tl = new TimelineMax({ onUpdate: updatePercentage });
  tl.add("start");
  tl.to(gallery, 1, { xPercent: -70, ease: Power4.easeInOut }, "start");
  tl.from(
    floating,
    1.5,
    {
      y: 600,
      opacity: 0,
      ease: Power4.easeInOut,
    },
    "start"
  );

  const scene = new ScrollMagic.Scene({
    triggerElement: sticky,
    triggerHook: "onLeave",
    duration: "100%",
  })
    .setPin(sticky)
    .setTween(tl)
    .addTo(controller);
});
