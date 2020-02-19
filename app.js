const app = () => {
    let song = document.querySelector('.song');
    let play = document.querySelector('.play');
    let outline = document.querySelector('.moving-outline circle');
    let video = document.querySelector('.vid-container video');

    //sounds
    let sounds = document.querySelectorAll('.sound-picker button');
    //time display
    let timeDisplay = document.querySelector('.time-display');
    let timeSelect = document.querySelectorAll('.time-select button');
    //get length of the outline
    let outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound => {
      sound.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
      });
    });


    //play sound
    play.addEventListener("click", function() {
    checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option => {
      option.addEventListener('click', function() {
        fakeDuration = this.getAttribute('data-time');
        const minute = Math.floor(fakeDuration / 60);
        const second = Math.floor(fakeDuration % 60);
        timeDisplay.textContent = `${minute}:${second}`;
      });
    });

    //function to stop and play sounds
    const checkPlaying = song => {
      song.paused == true ? triggerPlay() : triggerPause();
    };

    //to animate the circle
    song.ontimeupdate = () => {
      const currentTime = song.currentTime;
      const elapsed = fakeDuration - currentTime;
      const seconds = Math.floor(elapsed % 60);
      const minutes = Math.floor(elapsed / 60);

      const progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      //to animate the text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if (currentTime >= fakeDuration){
        song.currentTime = 0;
        triggerPause();        
      }

    };
  
    const triggerPause = () => {
      song.pause();
      play.src = './svg/play.svg';
      video.pause();
    }

    const triggerPlay = () => {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    }

};

app();