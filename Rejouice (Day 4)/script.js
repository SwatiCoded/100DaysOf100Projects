function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locoScroll();

function cursorEffect() {
  let cursor = document.querySelector(".cursor");
  let page1Content = document.querySelector(".page-2");

  page1Content.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  page1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}

cursorEffect();

function videoEffect() {
  let videoMover = document.querySelector(".page-4 .box video");
  let video2Mover = document.querySelector(".page-5 .box-2 .left-box video");

  let box = document.querySelector(".page-4 .box");
  let box2 = document.querySelector(".page-5 .box-2 .left-box");

  box.addEventListener("mousemove", function (dets) {
    gsap.to(videoMover, {
      x: dets.x/2,
      y: dets.y,
    });
  });

  box.addEventListener("mouseenter", function () {
    gsap.to(videoMover, {
      scale: 1,
      opacity: 1,
    });
  });

  box.addEventListener("mouseleave", function () {
    gsap.to(videoMover, {
      scale: 0,
      opacity: 0,
    });
  });

  box2.addEventListener("mousemove", function (dets) {
    gsap.to(video2Mover, {
      x: dets.x / 2,
      y: dets.y / 2,
    });
  });

  box2.addEventListener("mouseenter", function () {
    gsap.to(video2Mover, {
      scale: 1,
      opacity: 1,
    });
  });

  box2.addEventListener("mouseleave", function () {
    gsap.to(video2Mover, {
      scale: 0,
      opacity: 0,
    });
  });
}

let video3Mover = document.querySelector(".page-5 .box-2 .right-box video");
let box3 = document.querySelector(".page-5 .box-2 .right-box");
box3.addEventListener("mousemove", function (dets) {
  gsap.to(video3Mover, {
    x: dets.x / 3,
    y: dets.y / 3,
  });
});

box3.addEventListener("mouseenter", function () {
  gsap.to(video3Mover, {
    scale: 1,
    opacity: 1,
  });
});

box3.addEventListener("mouseleave", function () {
  gsap.to(video3Mover, {
    scale: 0,
    opacity: 0,
  });
});

videoEffect();

// function page2Animation() {
//   gsap.from(".elem h1", {
//     y: 120,
//     stagger: 0.2,
//     duration: 1,
//     scrollTrigger: {
//       trigger: ".page-2",
//       scroller: ".main",
//       start: "top 47%",
//       end: "top 46%",
//       markers: true,
//       scrub: 2,
//     },
//   });
// }

// page2Animation();

let tl = gsap.timeline();

tl.from(".loader h3", {
  x: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
});

tl.to(".loader h3", {
  y: -20,
  opacity: 0,
  duration: 0.2,
  stagger: 0.1,
});

tl.to(".loader", {
  // opacity: 0,
  display: "none",
});

tl.from(".main", {
  y: -100,
  opacity: 0,

  duration: 0.5,
});

tl.from(".page-1-content span", {
  y: -300,
  opacity: 0,
  stagger: 0.2,
  duration: 0.4,
});

tl.from(".nav h4", {
  y: -20,
  opacity: 0,
  duration: 0.2,
  stagger: 0.2,
  scrub: true,
});

tl.from(".page3-top h2", {
  scrollTrigger: {
    start: "top 40%",
    end: "top 90%",
    scrub: 2,
    
    trigger: ".page3-top",
    scroller: ".main",
    // markers: true,
  },
  y: 20,
  opacity: 0,
  duration: 0.5,
  // delay: 5,
  stagger: 1,
});

var path = "M 60 300 Q 300 300 590 300";
var finalPath = "M 60 300 Q 300 300 590 300";

var string = document.querySelector(".page-3-bottom");

string.addEventListener("mousemove", function (dets) {
  path = `M 60 300 Q 300 ${dets.y} 590 300`;

  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.3,
    ease: "power3.out",
  });
});

string.addEventListener("mouseleave", function () {
  gsap.to("svg path", {
    attr: { d: finalPath },
    duration: 1.5,
    ease: "elastic.out(1,0.2)",
  });
});
