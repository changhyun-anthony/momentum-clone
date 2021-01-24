const body = document.querySelector("body");

const IMG_NUM = 4;

// function handleImgLoad() {
//     console.log('finish load');
// }

function paintImage(imgNum) {
    const image = new Image();
    image.src = `img/${imgNum}.jpg`;
    image.classList.add('bgImage');
    // image.addEventListener("loadend",handleImgLoad);
    body.appendChild(image);
}


function genRandom(count) {
    const number = Math.ceil(Math.random()*count);
    return number;
}

function init() {
    const randomNum = genRandom(IMG_NUM);
    // console.log(randomNum);
    paintImage(randomNum);
}
init();