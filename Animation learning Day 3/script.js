var main = document.querySelector(".page");
var cursor = document.querySelector(".cursor");
var imageDiv = document.querySelector(".imageDiv");
var textDiv = document.querySelector(".text-container h1");


gsap.from(".text-container h1", {
    x: window.innerWidth,
    duration: 10,
    delay: 1,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: false,
    scrollTrigger: {
        trigger: ".text-container",
        scroller: "body",
        start: "top 0%",
        end: "top -150%",
        markers: false,
        scrub: 1,
        pin: true,
    }
})

textDiv.addEventListener("mouseenter", function() {
    gsap.to(cursor, {
        backgroundColor: "#111",
        duration: 0.01,
    })
})

textDiv.addEventListener("mouseleave", function() {
    gsap.to(cursor, {
        duration: 0.01,
        backgroundColor: "#fff",
    })
})
    

var path = "M 60 300 Q 300 300 590 300";
var finalPath = "M 60 300 Q 300 300 590 300";

var string = document.querySelector(".page1")

string.addEventListener("mousemove", function(dets) {
    path = `M 60 300 Q 300 ${dets.y} 590 300`;

    gsap.to("svg path", {
        attr: { d: path },
        duration: 0.3,
        ease: "power3.out"
    })
})

string.addEventListener("mouseleave", function () {
    gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)"
    })
})

main.addEventListener("mousemove",function(dets) {
    
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        duration: 0.3,
    })
})

imageDiv.addEventListener("mouseenter", function() {
    cursor.innerHTML = "View More",
    gsap.to(cursor, {
        backgroundColor: "#c1bbbbff",
        duration: 0.6,
        scale: 3,
    })
})

imageDiv.addEventListener("mouseleave", function() {
    cursor.innerHTML = "",
    gsap.to(cursor, {
        duration: 0.6,
        scale: 1,
        backgroundColor: "white",
    })
})