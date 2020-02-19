const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //get length of the outline
    const outlineLength = outline.getTotalLength();
    //duration
    const fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound => {
      sound.addEventListener('click', () => {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
      });
    });


    //play sound
    play.addEventListener("click", () => {
    checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option => {
      option.addEventListener('click', function(){
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