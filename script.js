const canvas = document.querySelector("#images")
const context = canvas.getContext("2d")
const frames = {
    currentIndex: 0,
    maxIndex: 65
}
let imagesLoaded = 0;
const images = []


function preloadImages() {
    for (let i = 0; i <= frames.maxIndex; i++) {
        const imageUrl = `./frames/1080-142790249_small_${i.toString().padStart(3, "0")}.jpg`
        const img = new Image();
        img.src = imageUrl;

        console.log(img);

        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img)
    }
}

function loadImage(index) {
    const img = images[index]
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY)

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;


    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = "high"
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    frames.currentIndex = index

}

function startAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            scrub: 2,
            // markers: true
        }
    })

    tl.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloadImages()















// let box1 = document.querySelector(".inner-box")
// let box2 = document.querySelector(".inner-box2")

// window.addEventListener("mousemove", function (e) {
//     let mouseX = e.clientX;
//     let mouseY = e.clientY;


//     let deltaX = mouseX - window.innerWidth / 2
//     let deltaY = mouseY - window.innerHeight / 2

//     var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
//     box1.style.transform = `rotate(${angle - 180}deg)`
// })

// window.addEventListener("mousemove", function (e) {
//     let mouseX = e.clientX;
//     let mouseY = e.clientY;


//     let deltaX = mouseX - window.innerWidth / 2
//     let deltaY = mouseY - window.innerHeight / 2

//     var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

//     box2.style.transform = `rotate(${angle - 180}deg)`



// })