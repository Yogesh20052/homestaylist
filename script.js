function shareWhatsApp() {

    const message =
`🏡 Check out Village Villa!

${window.location.href}`;

    const url =
`https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}
const galleryImages = document.querySelectorAll(".photo img");

const viewer = document.querySelector(".viewer");

const viewerImg = document.getElementById("viewerImg");

const closeBtn = document.querySelector(".close");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const shareBtn = document.querySelector(".shareBtn");

let currentIndex = 0;



// OPEN IMAGE

galleryImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        showImage();

    });

});



// SHOW IMAGE

function showImage() {

    viewer.classList.add("active");

    viewerImg.src = galleryImages[currentIndex].src;

}



// CLOSE

closeBtn.onclick = () => {

    viewer.classList.remove("active");

}



// NEXT

nextBtn.onclick = () => {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

    }

    showImage();

}



// PREVIOUS

prevBtn.onclick = () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

    }

    showImage();

}



// KEYBOARD SUPPORT

document.addEventListener("keydown", (e) => {

    if (!viewer.classList.contains("active")) return;

    if (e.key === "ArrowRight") nextBtn.click();

    if (e.key === "ArrowLeft") prevBtn.click();

    if (e.key === "Escape") closeBtn.click();

});



// CLICK OUTSIDE IMAGE TO CLOSE

viewer.addEventListener("click", (e) => {

    if (e.target === viewer) {

        viewer.classList.remove("active");

    }

});



// MOBILE SWIPE

let startX = 0;

let endX = 0;



viewer.addEventListener("touchstart", (e) => {

    startX = e.changedTouches[0].screenX;

});



viewer.addEventListener("touchend", (e) => {

    endX = e.changedTouches[0].screenX;

    handleSwipe();

});



function handleSwipe() {

    if (startX - endX > 60) {

        nextBtn.click();

    }

    else if (endX - startX > 60) {

        prevBtn.click();

    }

}



// WHATSAPP SHARE

shareBtn.addEventListener("click", async () => {

    const imageUrl = galleryImages[currentIndex].src;

    const text = "🏡 Village Villa\n\nCheck out this beautiful photo!\n";

    // Android browsers that support file sharing
    if (navigator.share) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const file = new File(
                [blob],
                "VillageVilla.jpg",
                { type: blob.type }
            );

            if (navigator.canShare && navigator.canShare({ files: [file] })) {

                await navigator.share({
                    title: "Village Villa",
                    text: text,
                    files: [file]
                });

                return;
            }

        } catch (err) {
            console.log(err);
        }
    }

    // Fallback for desktop / unsupported devices
    const pageUrl = window.location.href;

    window.open(
        `https://wa.me/?text=${encodeURIComponent(text + pageUrl)}`,
        "_blank"
    );

});
const selectBtn = document.getElementById("selectBtn");
const shareSelectedBtn = document.getElementById("shareSelectedBtn");

const boxes = document.querySelectorAll(".selectBox");

let selecting = false;

selectBtn.onclick = () => {

    selecting = !selecting;

    boxes.forEach(box => {

        box.style.display = selecting ? "block" : "none";

        box.checked = false;

        box.parentElement.classList.remove("selected");

    });

    shareSelectedBtn.style.display = selecting ? "inline-block" : "none";

};

boxes.forEach(box=>{

    box.addEventListener("change",()=>{

        if(box.checked){

            box.parentElement.classList.add("selected");

        }else{

            box.parentElement.classList.remove("selected");

        }

    });

});

shareSelectedBtn.onclick=()=>{

    const selected=[];

    boxes.forEach(box=>{

        if(box.checked){

            selected.push(box.nextElementSibling.src);

        }

    });

    if(selected.length===0){

        alert("Select at least one photo.");

        return;

    }

    console.log(selected);

    alert(selected.length+" photo(s) selected.");

};
