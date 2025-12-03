const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".vol-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox");

let allKey = [],
audio = new Audio("tunes/a.wav");

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; //passing audio source based on key
    audio.play(); //playing audio
    console.log(allKey);

    const clickedKey = document.querySelector(`.piano-keys .key[data-key="${key}"]`);
    clickedKey.classList.add("active"); //adding active class to the clicked key

    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150);
}

pianoKeys.forEach(key => {
    allKey.push(key.dataset.key); //getting data-key value of each key

    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; //passing the volume slider value as audio volume
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    //
    if (allKey.includes(e.key)) {
        playTune(e.key);
    }
}


keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);