const videoId = "video";
const scaleFactor = 0.25;
const snapshots = [];
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");
const videoControls = document.getElementById("video-controls");
// Quitar los controles por default
video.controls = false;
// Display the user defined video controls
videoControls.style.display = "block";

const playpause = document.getElementById("playpause");
const playpausePlayer = document.getElementsByClassName("playpausePlayer")[0];
const stop = document.getElementById("stop");
const mute = document.getElementById("mute");
const fast = document.getElementById("fast");
const slow = document.getElementById("slow");
const volinc = document.getElementById("volinc");
const voldec = document.getElementById("voldec");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const fullscreen = document.getElementById("fs");
const snap = document.getElementById("snap");
const fullScreenEnabled = !!(
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.msFullscreenEnabled ||
  document.webkitSupportsFullscreen ||
  document.webkitFullscreenEnabled ||
  document.createElement("video").webkitRequestFullScreen
);
if (!fullScreenEnabled) {
  fullscreen.style.display = "none";
}

// Tomar foto
snap.addEventListener("click", function (e) {
  shoot();
});

// Pausar
playpause.addEventListener("click", function (e) {
  if (video.paused || video.ended) video.play();
  else video.pause();
});

playpausePlayer.addEventListener("click", function (e) {
  if (video.paused || video.ended) video.play();
  else video.pause();
});

// Parar
stop.addEventListener("click", function (e) {
  video.pause();
  video.currentTime = 0;
  progress.value = 0;
});

// Mute
mute.addEventListener("click", function (e) {
  video.muted = !video.muted;
});

// Incrementar Velocidad x2
fast.addEventListener("click", function (e) {
  video.playbackRate = video.playbackRate + 0.5;
});

// Velocidad a la mitad
slow.addEventListener("click", function (e) {
  video.playbackRate = video.playbackRate - 0.5;
});

volinc.addEventListener("click", function (e) {
  changeVolume("+");
});
voldec.addEventListener("click", function (e) {
  changeVolume("-");
});
video.addEventListener("loadedmetadata", function () {
  progress.setAttribute("max", video.duration);
});
video.addEventListener("timeupdate", function () {
  progress.value = video.currentTime;
  progressBar.style.width =
    Math.floor((video.currentTime / video.duration) * 100) + "%";
});
video.addEventListener("timeupdate", function () {
  if (!progress.getAttribute("max"))
    progress.setAttribute("max", video.duration);
  progress.value = video.currentTime;
  progressBar.style.width =
    Math.floor((video.currentTime / video.duration) * 100) + "%";
});
progress.addEventListener("click", function (e) {
  var rect = this.getBoundingClientRect();
  var pos = (e.pageX - rect.left) / this.offsetWidth;
  video.currentTime = pos * video.duration;
});

fullscreen.addEventListener("click", function (e) {
  handleFullscreen();
});

document.addEventListener("fullscreenchange", function (e) {
  setFullscreenData(!!(document.fullscreen || document.fullscreenElement));
});
document.addEventListener("webkitfullscreenchange", function () {
  setFullscreenData(!!document.webkitIsFullScreen);
});
document.addEventListener("mozfullscreenchange", function () {
  setFullscreenData(!!document.mozFullScreen);
});
document.addEventListener("msfullscreenchange", function () {
  setFullscreenData(!!document.msFullscreenElement);
});

// Add event listeners for video specific events
video.addEventListener(
  "play",
  function () {
    changeButtonState("playpause");
  },
  false
);
video.addEventListener(
  "pause",
  function () {
    changeButtonState("playpause");
  },
  false
);
video.addEventListener(
  "volumechange",
  function () {
    checkVolume();
  },
  false
);
const changeVolume = function (dir) {
  let currentVolume = Math.floor(video.volume * 10) / 10;
  if (dir === "+") {
    if (currentVolume < 1) {
      video.volume += 0.1;
    }
  } else if (dir === "-") {
    if (currentVolume > 0) {
      video.volume -= 0.1;
    }
  }
};

const handleFullscreen = function () {
  if (isFullScreen()) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    setFullscreenData(false);
  } else {
    if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    else if (videoContainer.mozRequestFullScreen)
      videoContainer.mozRequestFullScreen();
    else if (videoContainer.webkitRequestFullScreen)
      videoContainer.webkitRequestFullScreen();
    else if (videoContainer.msRequestFullscreen)
      videoContainer.msRequestFullscreen();
    setFullscreenData(true);
  }
};

const isFullScreen = function () {
  return !!(
    document.fullscreen ||
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  );
};

const changeButtonState = function (type) {
  // Play/Pause button
  if (type == "playpause") {
    if (video.paused || video.ended) {
      playpause.setAttribute("data-state", "play");
    } else {
      playpause.setAttribute("data-state", "pause");
    }
  }
  // Mute button
  else if (type == "mute") {
    mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
  }
};

const setFullscreenData = function (state) {
  console.log("State: " + state);
  if (state) {
    const documentVideo = document.getElementsByClassName("playpausePlayer")[0];
    documentVideo.classList.add("playerFullScreen");
    documentVideo.classList.remove("playerSmallScreen");
  } else {
    const documentVideo = document.getElementsByClassName("playpausePlayer")[0];
    documentVideo.classList.remove("playerFullScreen");
    documentVideo.classList.add("playerSmallScreen");
  }
  videoContainer.setAttribute("data-fullscreen", !!state);
};

const checkVolume = function (dir) {
  if (dir) {
    var currentVolume = Math.floor(video.volume * 10) / 10;
    if (dir === "+") {
      if (currentVolume < 1) video.volume += 0.1;
    } else if (dir === "-") {
      if (currentVolume > 0) video.volume -= 0.1;
    }
    // If the volume has been turned off, also set it as muted
    // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
    if (currentVolume <= 0) video.muted = true;
    else video.muted = false;
  }
  changeButtonState("mute");
};

//Change of video

const batman = document.getElementById("js-batman");
const avengers = document.getElementById("js-avengers");
const flores = document.getElementById("js-flores");

batman.addEventListener("click", function (e) {
  video.setAttribute("src", "./videos/batman.mp4");
});

avengers.addEventListener("click", function (e) {
  video.setAttribute("src", "./videos/avengers.mp4");
});
flores.addEventListener("click", function (e) {
  video.setAttribute("src", "./videos/flores.mp4");
});

function capture(video, scaleFactor) {
  if (scaleFactor == null) {
    scaleFactor = 1;
  }
  var w = video.videoWidth * scaleFactor;
  var h = video.videoHeight * scaleFactor;
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas;
}

/**
 * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
 */
function shoot() {
  var video = document.getElementById(videoId);
  var output = document.getElementById("output");
  var canvas = capture(video, scaleFactor);
  canvas.onclick = function () {
    window.open(this.toDataURL(image / jpg));
  };
  snapshots.unshift(canvas);
  output.innerHTML = "";
  for (var i = 0; i < 4; i++) {
    output.appendChild(snapshots[i]);
  }
}

video.addEventListener("loadedmetadata", function () {
  track = document.createElement("track");
  track.kind = "subtitles";
  track.label = "English";
  track.srclang = "en";
  track.src = "subtitulos/avengers.vtt";
  track.mode = "showing";
  video.textTracks[0].mode = "showing";
});

subtitles.addEventListener("click", function (e) {
  debugger;
  if (video.textTracks[0].mode === "showing") {
    video.textTracks[0].mode = "hidden";
  } else {
    video.textTracks[0].mode = "showing";
  }
});
