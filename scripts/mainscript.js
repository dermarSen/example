"use strict";


const navi = document.querySelectorAll("header ul li a");
const data = [{
    "url": "./data/pic0.jpg",
    "title": "Rockys",
    "description": "Pic of Rockys",
}, {
    "url": "./data/pic1.jpg",
    "title": "Matterhorn",
    "description": "Pic of Matterhorn",
}, {
    "url": "./data/pic2.jpg",
    "title": "Mont Blanc",
    "description": "Pic of Mont Blanc - höchster berg der Alpen",
}, {
    "url": "./data/pic3.jpg",
    "title": "Mount Everest",
    "description": "Pic of Mount Everest - höchster Berg der Welt",
}, {
    "url": "./data/pic4.jpg",
    "title": "Watzmann",
    "description": "Pic of Watzmann",
}];

document.querySelector("#slideBackText").innerHTML = "+++ExampleSlider".repeat(20);
(function createHTML() {

    navi.forEach(el => {
        el.addEventListener("click", smoothscroll);
    });

    function smoothscroll(ev) {
        ev.preventDefault();
        const target = ev.target.getAttribute("href");
        const targetSection = document.querySelector(target);
        const newtop = Math.floor(targetSection.getBoundingClientRect().top) - 170;
        window.scrollBy({ top: newtop, left: 0, behavior: "smooth" });
    };

    const content = document.querySelector("#First");
    content.appendChild(createSlideSection());


    function createSlideSection() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", "slide-wrapper");
        wrapper.appendChild(createSlides());
        return wrapper;
    }

    function createSlides() {
        const list = document.createElement("ul")
        for (let i of data) {
            const item = document.createElement("li");
            item.setAttribute("class", "slides");
            const slide = document.createElement("div");

            slide.setAttribute("id", `slide${data.indexOf(i) + 1}`);

            const desBackground = document.createElement("div");
            desBackground.setAttribute("class", "des-background des")
            const slideDes = document.createElement("div");
            slideDes.setAttribute("class", "slide-des des");
            const img = document.createElement("img");
            img.setAttribute("class", "slides-back");
            img.setAttribute("src", i.url);

            const slideTitle = document.createElement("h2");
            slideTitle.setAttribute("class", "slide-title");
            const slidePara = document.createElement("p");
            slidePara.setAttribute("class", "slide-para");

            slideDes.appendChild(slideTitle);
            slideDes.appendChild(slidePara);

            slide.appendChild(desBackground);
            slide.appendChild(slideDes);
            slide.appendChild(img);

            item.appendChild(slide);

            list.appendChild(item);
        }
        return list;
    }
})();

(function () {
    const viz = document.querySelectorAll(".viz");
    viz.forEach(v => {
        v.addEventListener("mouseover", () => {
            v.classList.add("front");
        });
        v.addEventListener("mouseout", () => {
            v.classList.remove("front");
        });
        v.addEventListener("click", () => {
            viz.forEach(vi => {
                if (vi.className === "pop") {
                    vi.className = `${vi.id} viz`;
                    document.querySelector("#Third").appendChild(vi);
                }
            });
            const popWindow = document.querySelector("#pop-window");
            popWindow.style.display = "block";
            popWindow.appendChild(v);
            v.setAttribute("class", "pop");
        });
    });

    document.querySelector("#close").addEventListener("click", () => {
        const popWindow = document.querySelector("#pop-window");
        popWindow.style.display = "none";
        viz.forEach(vi => {
            if (vi.className === "pop") {
                vi.className = `${vi.id} viz`;
                document.querySelector("#Third").appendChild(vi);
            }
        });
    })
})();

(() => {
    const navUL = document.querySelector("#nav");
    const navIcon = document.querySelector("#nav-icon");

    document.querySelector("#collapsable-nav").addEventListener("mouseover", () => {
        navIcon.setAttribute("class", "nav-hide");
        navUL.className = "";
    });
    document.querySelector("#collapsable-nav").addEventListener("mouseout", () => {
        navUL.setAttribute("class", "nav-hide");
        navIcon.className = "";
    });

})();

const img = document.querySelectorAll(".slides-back");
const titles = document.querySelectorAll(".slide-title");
const descs = document.querySelectorAll(".slide-para");

for (let i = 0; i < titles.length; i++) {
    titles[i].innerHTML = data[i].title;
    descs[i].innerHTML = data[i].description;
}

window.addEventListener("load", () => {
    const posts = document.querySelectorAll(".part");
    const navli = document.querySelectorAll("header ul li")

    const heading = document.querySelector("#heading");
    let postTops = [];
    let pos;
    let counter = 0;
    let doneResizing;

    resetPage();

    window.addEventListener("scroll", () => {
        pos = window.pageYOffset + 170;
        if (pos - 150 >= postTops[0] && heading.getAttribute("style") !== "display: block;") {
            heading.style.display = "block";
        } else if (pos - 150 <= postTops[0] && heading.getAttribute("style") === "display: block;") {
            heading.style.display = "none";
        }
        if (pos >= postTops[counter]) {
            navli[counter].setAttribute("class", "shine");

            if (counter > 0) { navli[counter - 1].setAttribute("class", "normal"); };
            counter++;
        } else if (counter > 0 && pos <= postTops[counter - 1]) {
            counter--;
            navli[counter].setAttribute("class", "shine");
            if (counter < navli.length - 1) {
                navli[counter + 1].setAttribute("class", "normal");
            }
        } else if (pos < Math.floor(window.innerHeight / 2) && navli[counter].getAttribute("class") === "shine") {
            navli[counter].setAttribute("class", "normal");
        }
    });

    window.addEventListener("resize", () => {

        clearTimeout(doneResizing);
        doneResizing = setTimeout(() => {
            resetPage()
        }, 500)
    })

    function resetPage() {
        postTops = [];
        posts.forEach(post => {
            postTops.push(Math.floor(post.getBoundingClientRect().top + window.pageYOffset));
        })

        const pagePos = window.pageYOffset;
        counter = 0;
        postTops.forEach(top => { if (pagePos > top && counter < 4) { counter++; } });
        if (counter >= 1) {
            navli.forEach(li => { li.setAttribute("class", "normal"); });
            navli[counter - 1].setAttribute("class", "shine");
        }
    }

    const slideCount = document.querySelectorAll(".slides").length;
    const slideWidth = document.querySelector("#slide-wrapper").offsetWidth;
    const totalWidth = slideCount * slideWidth + "px";
    const slider = document.querySelector("#slide-wrapper ul");
    const wrapper = document.querySelector("#slide-wrapper");

    let leftpos = 0;
    let slideCounter = 0;

    slider.style.width = totalWidth;
    slider.style.left = "0px";

    wrapper.addEventListener("mouseover", () => {
        clearInterval(show);
    });
    wrapper.addEventListener("mouseout", () => {
        show = setInterval(() => {
            changenext();
        }, 4000);
    });
    let show = setInterval(() => {
        changenext();
    }, 4000);


    function changenext() {
        slideCounter++;
        if (slideCounter === slideCount) {
            slideCounter = 0;
            leftpos = 0;
            slider.style.left = leftpos;
        }
        else {
            leftpos = `-${slideCounter * slideWidth}px`;
            slider.style.left = leftpos;
        }
    }
});


