const texts = document.querySelectorAll(".text-animation p");

const updatePercentage = () => {
  tl.progress();
};

const tl = new TimelineMax({ onUpdate: updatePercentage });
const scrollController = new ScrollMagic.Controller();

tl.add("start")
  .to(".header-one", 0.5, { x: 600 }, "start")
  .to(".header-two", 0.5, { x: -600 }, "start");

const scene = new ScrollMagic.Scene({
  triggerElement: "main",
  triggerHook: "onLeave",
  duration: "300%",
})
  .setTween(tl)
  .addTo(scrollController);

const tlTexts = new TimelineMax({ onUpdate: updatePercentage });

texts.forEach((text, index) => {
  const direction = index % 2 === 0 ? 700 : -700;
  tlTexts.to(text, 0.5, { x: `${direction}` });
});

const sceneTexts = new ScrollMagic.Scene({
  triggerElement: ".division",
  triggerHook: "onLeave",
  duration: "200%",
})
  .setTween(tlTexts)
  .addTo(scrollController);

const timeline = (section) => {
  const tlMobile = new TimelineMax();
  return tlMobile
    .fromTo(
      `.${section} .number`,
      0.5,
      { opacity: 0, transform: "translateY(100%)" },
      { opacity: 1, transform: "translateY(0)" }
    )
    .fromTo(
      `.${section} .title`,
      0.5,
      { opacity: 0, transform: "translateY(100%)" },
      { opacity: 1, transform: "translateY(0)" }
    )
    .fromTo(
      `.${section} .text p`,
      0.5,
      {
        opacity: 0,
        transform: "translateY(100%)",
      },
      { opacity: 1, transform: "translateY(0)" }
    );
};

const animateTextMobile = () => {
  const sections = ["section-one", "section-two", "section-three"];
  sections.forEach((section) => {
    const tlMobile = timeline(section);
    const sceneMobile = new ScrollMagic.Scene({
      triggerElement: `.${section} .content`,
    })
      .setTween(tlMobile)
      .addTo(scrollController);
  });
};

const isMobile = window.innerWidth <= 600;
isMobile && animateTextMobile();
