let audioElements = document.querySelectorAll("audio");
let buttons = document.querySelectorAll("button");
let screen = document.querySelector('#screen-desktop');
let switchbutton = document.querySelector('#switch');
let heaterbutton = document.querySelector('#heater');
let volume = document.querySelector('#volume');

volume.disabled = true;
heaterbutton.disabled = true;
buttons.forEach(button => (button.disabled = true));

const on_off_handler = () => {
  if(!switchbutton.checked) {
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

const heaterHandler = () => {
  if(heaterbutton.checked) {
    audioElements = document.querySelectorAll('.heater');
    console.log(audioElements);
  }
  else {
    audioElements = document.querySelectorAll("audio");
  }
}

switchbutton.addEventListener('change', on_off_handler);
heaterbutton.addEventListener('change', heaterHandler);

const soundHandler = value => {
  const handleScreen = (audio) => {
    let volumemetervalue = parseInt(volume.value) / 10;
    audio.volume = volumemetervalue;
    audio.play();
    screen.innerText = String.fromCharCode(parseInt(value));
  }

  audioElements.forEach(audio =>
    audio.dataset.key == value ? handleScreen(audio): null
  );

  buttons.forEach(button =>
    button.value == value ? button.classList.add("animate") : null
  );
};

buttons.forEach(button =>
  button.addEventListener("click", e => soundHandler(e.target.value))
);

buttons.forEach(button =>
  button.addEventListener("animationend", e =>
    e.target.classList.remove("animate")
  )
);

document.addEventListener("keyup", e => {
  if(switchbutton.checked) soundHandler(e.which);
});