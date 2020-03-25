
(function () {

    const audios = {
      "a": { "normal": "audio1.mp3", "heater": "audio10.mp3" },
      "s": { "normal": "audio2.mp3", "heater": "audio11.mp3" },
      "d": { "normal": "audio3.mp3", "heater": "audio12.mp3" },
      "f": { "normal": "audio4.mp3", "heater": "audio13.mp3" },
      "g": { "normal": "audio5.mp3", "heater": "audio14.mp3" },
      "h": { "normal": "audio6.mp3", "heater": "audio15.mp3" },
      "j": { "normal": "audio7.mp3", "heater": "audio16.mp3" },
      "k": { "normal": "audio8.mp3", "heater": "audio17.mp3" },
      "l": { "normal": "audio9.mp3", "heater": "audio18.mp3" }
    }

    // keyboard buttons
    const keystrokes = Object.keys(audios)
    const buttonContainer = document.getElementById('buttonsContainer');
    keystrokes.map((b) => {
      buttonContainer.innerHTML += `<button value=${b.toUpperCase().charCodeAt()}>${b.toUpperCase()}</button>`
    })
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.addEventListener("click", e => soundHandler(e.target.value)))
    buttons.forEach(button =>
      button.addEventListener("animationend", e =>
        e.target.classList.remove("animate")
      )
    );

    // audio
    const audiosContainer = document.getElementById('audiosContainer');
    for (let audio in audios) {
      audiosContainer.innerHTML += `<audio src=./audio/${audios[audio].normal} data-key=${audio.toUpperCase().charCodeAt()}></audio>`
      audiosContainer.innerHTML += `<audio class="heater" src=./audio/${audios[audio].heater} data-key=${audio.toUpperCase().charCodeAt()}></audio>`
    }
    let audioElements = document.querySelectorAll("audio:not([class])");



    let screen = document.querySelector('#screen-desktop');
    let volume = document.querySelector('#volume');

    let switchbutton = document.querySelector('#switch');
    switchbutton.addEventListener('change', on_off_handler);

    let heaterbutton = document.querySelector('#heater');
    heaterbutton.addEventListener('change', heaterHandler);


    volume.disabled = true;
    heaterbutton.disabled = true;
    buttons.forEach(button => (button.disabled = true));

    function on_off_handler() {
      if (!switchbutton.checked) {
        buttons.forEach(button => (button.disabled = true));
        screen.innerText = "Screen";
        volume.disabled = true;
        heaterbutton.disabled = true;
        heaterbutton.checked = false;
      }
      else {
        buttons.forEach(button => (button.disabled = false));
        volume.disabled = false;
        heaterbutton.disabled = false;
      }
    }

    function heaterHandler() {
      if (heaterbutton.checked) {
        audioElements = document.querySelectorAll('.heater');
      }
      else {
        audioElements = document.querySelectorAll("audio");
      }
    }


    const soundHandler = value => {
      audioElements.forEach(audio => {
        if (audio.dataset.key == value) {
          audio.volume = parseInt(volume.value) / 10;
          audio.play();
          screen.innerText = String.fromCharCode(parseInt(value));
        }
      })
      buttons.forEach(button => button.value == value ? button.classList.add("animate") : null);
    }


    document.addEventListener("keyup", e => {
      if (switchbutton.checked) soundHandler(e.which);
    });

})();