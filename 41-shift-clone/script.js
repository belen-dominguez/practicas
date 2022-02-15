//intro animations
const animationContainer = document.querySelector(".anim-intro");
const nav = document.querySelector("nav");

const introAnim = () => {
  const greenBg = document.querySelectorAll(".bg-green div");
  const whiteBg = document.querySelectorAll(".bg-white div");
  const textContainer = document.querySelector(".anim-intro .text");
  const textOne = document.querySelector(".text-one");
  const textTwo = document.querySelector(".text-two");
  const textToHide = document.querySelectorAll(".text-two .hide");
  const textToScale = document.querySelectorAll(".text-two .yellow");
  const heroContent = document.querySelector(".hero-text");
  const heroScroll = document.querySelector(".scroll-down");

  const tl = new TimelineMax();

  //prevent body scroll
  document.body.style.overflow = "hidden";

  //intro only text
  tl.add("start");
  tl.to(textContainer, 2, { background: "transparent" });
  tl.fromTo(
    textOne,
    3,
    {
      opacity: 0,
      delay: 2,
    },
    {
      opacity: 1,
    }
  );
  // green tile movement with text
  tl.to(
    textOne,
    2.3,
    {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      delay: 5.5,
    },
    "start"
  );
  tl.to(
    textTwo,
    2.3,
    {
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      delay: 5.5,
    },
    "start"
  );
  greenBg.forEach((item) => {
    tl.to(
      item,
      1.5,
      {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        ease: Power4.easeOut,
        delay: 5.5,
      },
      "start"
    );
  });
  // white tile movement with text
  tl.add("end");
  whiteBg.forEach((item) => {
    tl.to(
      item,
      1,
      {
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        ease: Power4.easeOut,
      },
      " end"
    );
  });
  tl.to(textOne, 1, { color: "#14232d" }, "end");
  tl.to(textTwo, 1, { color: "#14232d" }, "end");
  // hide + scale text, collapse anim container
  tl.add("hide");
  textToHide.forEach((item) => {
    tl.to(item, 1, { opacity: 0 }, "hide");
  });
  tl.to(textTwo, { clipPath: "none" }, "hide");

  tl.to(textToScale, 1, {
    transform: "scale(2) translate(43px, 132%)",
  });
  tl.to(animationContainer, 1, {
    clipPath: "polygon(0 100%, 100% 100%, 0 100%, 0 100%)",
  });
  // reveal hero
  tl.add("reveal");
  tl.to(
    nav,
    1,
    {
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
    },
    "reveal"
  );
  tl.fromTo(
    heroContent,
    1,
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
    { clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)" },
    "reveal"
  );
  tl.fromTo(heroScroll, 1, { opacity: 0 }, { opacity: 1 }, "reveal");

  //after anim is done, hide anim container
  setTimeout(() => {
    hideAnimContainer();
  }, 13000);
};

const hideAnimContainer = () => {
  document.body.style = "";
  animationContainer.classList.add("hide");
  nav.classList.remove("anim");
  nav.style = "";
};

window.addEventListener("load", () => {
  introAnim();
});

//logo animation
const logoText = document.querySelector(".logo-text");
const logoImage = document.querySelector(".logo-img");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 30) {
    logoText.classList.add("hide");
    logoImage.classList.add("collpase");
  } else {
    logoText.classList.remove("hide");
    logoImage.classList.remove("collpase");
  }
});

//menu animation
const menuItems = document.querySelectorAll(".menu-item");
const subMenuItems = [...document.querySelectorAll(".sub-menu-items")];
const subMenuContainer = document.querySelector(".sub-menu-container");

const expandSubmenu = (e) => {
  const selectedMenu = e.target.dataset.menu;
  subMenuContainer.classList.add("open");
  const selectedSubMenu = subMenuItems.find(
    (item) => item.dataset.menu === selectedMenu
  );
  subMenuItems.forEach((item) => item.classList.remove("open"));

  selectedSubMenu.classList.add("open");
};

const collapseSubmenu = (e) => {
  subMenuContainer.classList.remove("open");
  subMenuItems.forEach((item) => item.classList.remove("open"));
};

menuItems.forEach((item) => {
  item.addEventListener("mouseenter", (e) => expandSubmenu(e));
});

const displaySubmenu = () => {
  subMenuContainer.classList.add("open");
};

subMenuContainer.addEventListener("mouseenter", displaySubmenu);
subMenuContainer.addEventListener("mouseleave", collapseSubmenu);

//hero scroll down
const scroll = document.querySelector(".hero .scroll-down");
const mainSection = document.querySelector("main");

scroll.addEventListener("click", () => {
  mainSection.scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: "smooth",
  });
});

//what items animation
const whatItem = document.querySelectorAll(".what-item");

const expandItem = (item) => {
  const image = item.querySelector(".item-img");
  const text = item.querySelector(".item-text");
  const subTitle = text.querySelector(".sub-title");
  const description = text.querySelector(".description");

  const tl = new TimelineMax();

  tl.add("start")
    .fromTo(
      image,
      { transform: "translateY(-100px)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
      "start"
    )
    .to(text, { transform: "translate(-100px, 10px)" }, "start")
    .to(subTitle, { marginBottom: "2rem" }, "start")
    .to(
      description,
      0.5,
      { opacity: 1, height: "140px", transform: "translateY(0px)" },
      "start"
    );
};

const collapseIItem = (item) => {
  const image = item.querySelector(".item-img");
  const text = item.querySelector(".item-text");
  const subTitle = text.querySelector(".sub-title");
  const description = text.querySelector(".description");

  const tl = new TimelineMax();

  tl.add("start")
    .to(image, { transform: "translateY(100px)", opacity: 0 }, "start")
    .to(text, { transform: "translate(0px, 0px)" }, "start")
    .to(subTitle, { marginBottom: "0" }, "start")
    .to(
      description,
      0.5,
      { opacity: 0, height: "0px", transform: "translateY(-50px)" },
      "start"
    );
};

whatItem.forEach((item) => {
  item.addEventListener("mouseenter", () => expandItem(item));
  item.addEventListener("mouseleave", () => collapseIItem(item));
});

//work image animation
const workItems = document.querySelectorAll(".image-container");

const expandImage = (item) => {
  const tlWork = new TimelineMax();
  const image = item.querySelector(".item-img");
  const logo = item.querySelector(".item-logo");

  tlWork.add("start");
  tlWork.to(
    image,
    {
      clipPath: "polygon(0% 0%, 71% 14%, 100% 100%, 0% 100%)",
      ease: "power2.in",
    },
    "start"
  );
  tlWork.to(
    logo,
    {
      opacity: 0,
    },
    "start"
  );
  tlWork.to(image, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power2.in",
  });
};

const collapseImage = (item) => {
  const tlWork = new TimelineMax();
  const image = item.querySelector(".item-img");
  const logo = item.querySelector(".item-logo");

  tlWork.add("start");
  tlWork.to(
    image,
    {
      clipPath: "polygon(0 0, 71% 14%, 100% 100%, 0 100%)",
    },
    "start"
  );
  tlWork.to(
    logo,
    {
      opacity: 1,
    },
    "start"
  );
  tlWork.to(image, {
    clipPath: "polygon(0 14%, 71% 14%, 72% 100%, 0 100%)",
  });
};

workItems.forEach((item) => {
  item.addEventListener("mouseenter", () => expandImage(item));
  item.addEventListener("mouseleave", () => collapseImage(item));
});
