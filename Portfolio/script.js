// ===============================
// TYPING ANIMATION
// ===============================

const typingText = document.getElementById("typing");

const roles = [
    "Software Engineer Aspirant",
    "Java and Python Enthusiast",
    "Web Developer",
    "CSE Student"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {

                roleIndex = 0;

            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );

}


typeEffect();



// ===============================
// DARK / LIGHT MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

const themeIcon = themeBtn.querySelector("i");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");


    if (document.body.classList.contains("light-mode")) {

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});


// Remember theme

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");

}



// ===============================
// SCROLL TO TOP
// ===============================

const topBtn = document.getElementById("topBtn");


window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "flex";

        topBtn.style.alignItems = "center";

        topBtn.style.justifyContent = "center";

    } else {

        topBtn.style.display = "none";

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;


        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});



// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".project-card, .skill-card, .certificate-card, .edu, .about-content"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);


revealElements.forEach(element => {

    observer.observe(element);

});



// ===============================
// CONTACT FORM
// ===============================

const form =
    document.getElementById("contactForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();


    if (name === "") {

        alert("Please enter your name.");

        return;

    }


    alert(
        "Thank you, " +
        name +
        "! Your message has been received."
    );


    form.reset();

});



// ===============================
// CURRENT YEAR
// ===============================

const footerText =
    document.getElementById("footerText");


footerText.innerHTML =
    `© ${new Date().getFullYear()} Mamatha Sadula | All Rights Reserved`;