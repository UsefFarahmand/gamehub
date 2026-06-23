import { loadIcons } from "./icon-ui.js"

let slides = [];
let currentSlide = 0;
let isFirstTime = false;

export async function initializeTutorial(){

    const response =
        await fetch(
            "./data/tutorial.json"
        );

    const data =
        await response.json();

    slides =
        data.slides;

    bindTutorialEvents();
}

export function openTutorial(firstTime = false){

    isFirstTime = firstTime;
    currentSlide = 0;

    renderSlide();
    updateCloseButton();

    document
        .getElementById(
            "tutorialModal"
        )
        .classList.remove(
            "hidden"
        );
}

export function closeTutorial(){

    document
        .getElementById(
            "tutorialModal"
        )
        .classList.add(
            "hidden"
        );

    localStorage.setItem(
        "tutorialSeen",
        "true"
    );
}

function updateCloseButton(){

    const closeBtn =
        document.getElementById(
            "closeTutorial"
        );

    if(!closeBtn) return;

    const isLast =
        currentSlide === slides.length - 1;

    const canClose =
        !isFirstTime || isLast;

    closeBtn.style.visibility =
        canClose ? "visible" : "hidden";

    closeBtn.setAttribute(
        "aria-hidden",
        canClose ? "false" : "true"
    );
}

function renderSlide(){

    const slide =
        slides[currentSlide];

        console.log(currentSlide);
    document
        .getElementById("tutorialTitle")
        .textContent = slide.title;

    document
        .getElementById("tutorialText")
        .innerHTML = slide.text
            .split("\n")
            .filter(l => l.trim() !== "")
            .map(line => `<p>${line}</p>`)
            .join("");

    const img =
        document.getElementById(
            "tutorialImage"
        );

    if(slide.image){
        img.src = slide.image;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }

    // progress dots
    const dotsEl =
        document.getElementById(
            "tutorialDots"
        );

    if(dotsEl){
        dotsEl.innerHTML =
            slides.map((_, i) =>
                `<span class="tut-dot ${i === currentSlide ? "active" : ""}"></span>`
            ).join("");
    }

    document
        .getElementById("tutorialCounter")
        .textContent =
            `${currentSlide + 1} / ${slides.length}`;

    // progress bar
    const bar =
        document.getElementById(
            "tutorialProgressBar"
        );

    if(bar){
        const pct =
            ((currentSlide + 1) / slides.length) * 100;
        bar.style.width = `${pct}%`;
    }

    updateButtons();
    updateCloseButton();
}

async function updateButtons(){

    const prev =
        document.getElementById(
            "tutorialPrev"
        );

    const next =
        document.getElementById(
            "tutorialNext"
        );

    if(!prev || !next) return;

    prev.disabled =
        currentSlide === 0;

    if(
        currentSlide ===
        slides.length - 1
    ){
        next.innerHTML =
            '<span data-icon="play"></span>';
        next.classList.add("finish-btn");
    } else {
        next.innerHTML =
            '<span data-icon="next"></span>';
        next.classList.remove("finish-btn");
    }

    await loadIcons();
}

function nextSlide(){

    if(
        currentSlide <
        slides.length - 1
    ){
        currentSlide++;
        renderSlide();
        return;
    }

    closeTutorial();
}

function previousSlide(){

    if(currentSlide <= 0)
        return;

    currentSlide--;
    renderSlide();
}

function bindTutorialEvents(){

    document
        .getElementById("tutorialNext")
        ?.addEventListener("click", nextSlide);

    document
        .getElementById("tutorialPrev")
        ?.addEventListener("click", previousSlide);

    document
        .getElementById("closeTutorial")
        ?.addEventListener("click", () => {
            const isLast =
                currentSlide === slides.length - 1;

            if(!isFirstTime || isLast){
                closeTutorial();
            }
        });
}
