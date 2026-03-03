const player     = document.querySelector('.player__video');
const toggle     = document.querySelector('.toggle');
const progress   = document.querySelector('.progress');
const filled     = document.querySelector('.progress__filled');
const sliders    = document.querySelectorAll('.player__slider');
const skipBtns   = document.querySelectorAll('[data-skip]');

function togglePlay() {
  player.paused ? player.play() : player.pause();
}

function updateToggleBtn() {
  toggle.textContent = player.paused ? '►' : '❚ ❚';
}

function updateProgress() {
  const percent = (player.currentTime / player.duration) * 100;
  filled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

function handleSlider() {
  player[this.name] = this.value;
}

function skip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

toggle.addEventListener('click', togglePlay);
player.addEventListener('play', updateToggleBtn);
player.addEventListener('pause', updateToggleBtn);
player.addEventListener('timeupdate', updateProgress);

sliders.forEach(s => s.addEventListener('change', handleSlider));
sliders.forEach(s => s.addEventListener('mousemove', handleSlider));

skipBtns.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);