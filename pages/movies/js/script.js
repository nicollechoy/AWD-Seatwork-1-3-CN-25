document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
            card.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        });
    });

    const bgVideo = document.getElementById("bg-video");
    const videoControlBtn = document.createElement("button");
    videoControlBtn.innerText = "Pause Video";
    videoControlBtn.id = "video-control-btn";
    
    videoControlBtn.style.position = "fixed";
    videoControlBtn.style.bottom = "20px";
    videoControlBtn.style.right = "20px";
    videoControlBtn.style.padding = "10px 15px";
    videoControlBtn.style.fontSize = "14px";
    videoControlBtn.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    videoControlBtn.style.color = "white";
    videoControlBtn.style.border = "none";
    videoControlBtn.style.borderRadius = "5px";
    videoControlBtn.style.cursor = "pointer";
    videoControlBtn.style.zIndex = "1000";

    document.body.appendChild(videoControlBtn);

    videoControlBtn.addEventListener("click", function () {
        if (bgVideo.paused) {
            bgVideo.play();
            videoControlBtn.innerText = "Pause Video";
        } else {
            bgVideo.pause();
            videoControlBtn.innerText = "Play Video";
        }
    });
});
