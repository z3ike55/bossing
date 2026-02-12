// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

function moveNoButton() {
    const isMobile = window.innerWidth <= 600;
    const btnRect = noBtn.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Smaller distance on mobile to prevent going off-screen
    const maxDistance = isMobile ? 80 : 200;
    const minDistance = isMobile ? 60 : 200;
    
    let moveX, moveY;
    let attempts = 0;
    const maxAttempts = 10;
    
    // Try to find a position that keeps button on screen
    do {
        const distance = Math.random() * (maxDistance - minDistance) + minDistance;
        const angle = Math.random() * Math.PI * 2;
        
        moveX = Math.cos(angle) * distance;
        moveY = Math.sin(angle) * distance;
        
        // Calculate new position
        const newLeft = btnRect.left + moveX;
        const newRight = btnRect.right + moveX;
        const newTop = btnRect.top + moveY;
        const newBottom = btnRect.bottom + moveY;
        
        // Check if button would stay on screen
        const isOnScreen = newLeft > 20 && 
                          newRight < windowWidth - 20 && 
                          newTop > 20 && 
                          newBottom < windowHeight - 20;
        
        if (isOnScreen) break;
        
        attempts++;
    } while (attempts < maxAttempts);

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// For desktop (hover)
noBtn.addEventListener("mouseover", moveNoButton);

// For mobile (touch/click)
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent click event from also firing
    moveNoButton();
});

noBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any default action
    moveNoButton();
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
