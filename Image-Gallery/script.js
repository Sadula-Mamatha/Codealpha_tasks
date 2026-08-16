/* ==========================================
   MODERN IMAGE GALLERY - PART 3A
   Search | Filters | Lightbox | Navigation
========================================== */

const cards = document.querySelectorAll(".card");
const filterButtons = document.querySelectorAll(".filters button");
const searchInput = document.getElementById("searchInput");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const viewButtons = document.querySelectorAll(".viewBtn");

let currentIndex = 0;
let visibleCards = [...cards];



const imageCount = document.getElementById("imageCount");

function updateImageCounter() {

    const visibleImages = [...document.querySelectorAll(".card")]
        .filter(card => card.style.display !== "none");

    imageCount.textContent = `Showing ${visibleImages.length} Images`;

}
/* ==========================
   TOAST FUNCTION
========================== */

function showToast(message){

    const toast=document.getElementById("toast");

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/* ==========================================
   FILTER BUTTONS
========================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        cards.forEach(card => {

            if (category === "all") {

                card.style.display = "block";

            } else {

                if (card.classList.contains(category)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            }

        });

        visibleCards = [...cards].filter(card => card.style.display !== "none");
        updateImageCounter();

    });

});



/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const imageName = card.dataset.name.toLowerCase();

        if (imageName.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

    visibleCards = [...cards].filter(card => card.style.display !== "none");
    updateImageCounter();

});

/* ==========================================
   OPEN LIGHTBOX
========================================== */

viewButtons.forEach((button, index) => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        currentIndex = index;

        const img = cards[index].querySelector("img");

        lightboxImage.src = img.src;

        lightbox.style.display = "flex";

    });

});

/* ==========================================
   CLOSE LIGHTBOX
========================================== */

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});

/* ==========================================
   NEXT IMAGE
========================================== */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= cards.length) {

        currentIndex = 0;

    }

    lightboxImage.src = cards[currentIndex].querySelector("img").src;

});

/* ==========================================
   PREVIOUS IMAGE
========================================== */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = cards.length - 1;

    }

    lightboxImage.src = cards[currentIndex].querySelector("img").src;

});

/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener("keydown", (event) => {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (event.key === "Escape") {

        lightbox.style.display = "none";

    }

});


/* ==========================================
   MODERN IMAGE GALLERY - PART 3B
   Theme | Favorites | Download | Scroll Top
========================================== */

// Theme Toggle
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

    showToast("☀️ Light Mode Enabled");

}
else{

    showToast("🌙 Dark Mode Enabled");

}

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});

/* ==========================================
   FAVORITE BUTTON
========================================== */

const favButtons = document.querySelectorAll(".favBtn");

favButtons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        button.classList.toggle("active");

        if(button.classList.contains("active")){

    showToast("❤️ Added to Favorites");

}
else{

    showToast("💔 Removed from Favorites");

}

        const icon = button.querySelector("i");

        if (button.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});

/* ==========================================
   DOWNLOAD IMAGE
========================================== */

const downloadButtons = document.querySelectorAll(".downloadBtn");

downloadButtons.forEach((button, index) => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        const img = cards[index].querySelector("img");

        const link = document.createElement("a");

        link.href = img.src;
        link.download = "gallery-image";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        if (typeof showToast === "function") {
            showToast("⬇️ Download Started");
        }

    });

});

/* ==========================================
   SCROLL TO TOP
========================================== */

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollTopBtn.style.display = "block";

    } else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
   SIMPLE CARD HOVER EFFECT
========================================== */

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

    });

});

/* ==========================================
   IMAGE PRELOAD
========================================== */

window.addEventListener("load", () => {

    cards.forEach(card => {

        const img = new Image();

        img.src = card.querySelector("img").src;

    });

});

/* ==========================================
   END OF FILE
========================================== */

console.log("✅ Modern Image Gallery Loaded Successfully!");

/* ==========================
   LOADER
========================== */

window.addEventListener("load",function(){

    setTimeout(function(){

        const loader=document.getElementById("loader");

        loader.style.opacity="0";

        loader.style.transition="1s";

        setTimeout(function(){

            loader.style.display="none";

        },1000);

    },2000);

});
updateImageCounter();