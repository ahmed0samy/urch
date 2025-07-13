const notiCont = document.querySelector(".notification");
const notiText = document.querySelector(".msg");

function showNoti(msg, time) {
  notiText.innerText = msg;

  // Reset state
  notiCont.classList.remove("inactive");
  void notiCont.offsetWidth; // ✨ Force reflow to restart animation
  notiCont.classList.add("active");

  notiCont.addEventListener("click", () => {
    notiCont.classList.remove("active");
    notiCont.classList.add("inactive");
  });
  // Hide after time + animation duration
  setTimeout(() => {
    notiCont.classList.remove("active");
    notiCont.classList.add("inactive");
  }, time + 1000);
}

const sliders = document.querySelectorAll(".slide");
const warnErrorElement = document.getElementById("warnerror");
console.log(warnErrorElement);
sliders.forEach((slider, i) => {
  slider.style.left = `${i * 100}vw`;
});
const nextBtn = document.querySelectorAll(".next")[0];
let currentSliden = 1;
nextBtn.addEventListener("click", (eo) => {
  sliders.forEach((slider, i) => {
    slider.style.left = `${(i - 1) * 100}vw`;
  });
});
setTimeout(() => {
  document.body.classList.add("reddish");
}, 1000);

const socket = io();
const examTime = 600; // seconds
let remainingSeconds = examTime;
let monitoringStarted = false;
let isSuspicious = 0;

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("user");
const sessionToken = sessionStorage.getItem("exam-token");

if (!token || token !== sessionToken) {
  document.body.innerHTML = `          <div class="warnfulpage">
 <h1>❌ Unauthorized access</h1> </div>`;
  // throw new Error("Blocked manual access to exam page");
}

// Mobile block
if (/Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)) {
  document.body.innerHTML =
    "<h2>Please use a computer for this exam. Mobile is not supported.</h2>";
}

// Anti-cheating protections
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());
document.addEventListener("paste", (e) => e.preventDefault());
document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && ["U", "S"].includes(e.key))
  ) {
    e.preventDefault();
  }
});

// Detect DevTools
setInterval(() => {
  const threshold = 160;
  const devtoolsOpen =
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold;
  if (devtoolsOpen) {
    isSuspicious = 3;
    console.warn("DevTools detected");
  }
}, 1000);

// Detect tab switch
document.addEventListener("visibilitychange", () => {
  if (monitoringStarted && document.hidden) {
    isSuspicious = 1;
  }
});

window.addEventListener("blur", () => {
  if (remainingSeconds < examTime - 10) {
    isSuspicious = 2;
  }
});

async function getMonitorCount() {
  const details = await window.getScreenDetails();
  return details.screens.length;
}
let loading = false;
let startBtn = document.getElementById("startBtn");

function warnError(msg, waitTime, isOnInput = true, isFloating) {
  setTimeout(() => {
    loading = false;
    if (!isOnInput) {
      startBtn.classList.remove("disabled");
    }
  }, waitTime);

  if (isOnInput) {
    warnErrorElement.classList.remove("hidden");
    warnErrorElement.innerHTML = msg;
  }
  if (isFloating) {
    showNoti(msg, waitTime);
  }
}
function warnCheater() {
  document.body.innerHTML += `
          <div class="warnfulpage">
            <video id="myVideo" autoplay muted>
              <source src="./cheater.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <h1>Bye!</h1>
            <span>We warned you, isn't that?</span>
          </div>
        `;
}

async function startExam() {
  warnErrorElement.classList.add("hidden");
  warnErrorElement.innerHTML = "";

  const emailInput = document.getElementById("email");
  const userId = emailInput.value.trim();

  emailInput.addEventListener("input", () => {
    startBtn.classList.remove("disabled");
  });

  if (!userId.includes("@")) {
    warnError("This email is invalid!");
    // alert("Please enter a valid email address.");
    return;
  }

  let camStream;
  try {
    camStream = await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (err) {
    alert("❌ Camera access is required to continue the exam.");
    warnError("You must allow camera access");
    return; // stop startExam()
  }
  // First check with the server if the user is allowed to start
  socket.emit("exam-start", userId, async (response) => {
    if (!response.allowed) {
      switch (response.reason) {
        case "not_registered":
          warnError(
            "This email isn't registered in regestration form!",
            6000,
            true,
            true
          );
          break;
        case "already_attended":
          warnError("You have already attended the exam!", 6000, true, true);
          break;
        default:
          warnError(
            "An error has been occured! Please refresh the page and try again",
            2000,
            false,
            true
          );
      }
      // alert("❌ Access denied. Reason: " + (response.reason || "Not allowed"));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenCount = await getMonitorCount();
      if (screenCount > 1) {
        loading = false;
        startBtn.classList.remove("disabled");
        warnError("Please disconnect additional monitors.", 2000, false, true);
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      // Slide to exam view
      sliders.forEach((slider, i) => {
        slider.style.left = `${(i - 2) * 100}vw`;
      });

      const blackMask = document.querySelector(".black");
      //   let timerEl = document.getElementById("timer");
      blackMask.style.right = "0";
      setTimeout(() => {
        blackMask.style.right = "100vw";
        document.body.classList.add("dark");
        document.body.classList.remove("reddish");
        document.body.classList.add("scroll");

        document.body.innerHTML = `
  <img class="logo" src="/logo.png" alt="" />
  <h3 id="timer"></h3>
  <video id="cameraPreview" autoplay muted playsinline></video>
 <div class="countdown-wrapper">
  <div class="time-text" id="time">Time left: 10:00</div>
  <div class="bar-container">
    <div class="countdown-bar" id="bar" style="width: 100%;"></div>
  </div>
</div>

  <iframe
  class="visible"
    id="examFrame"
    src="${response.link}"
    width="100%"
    height="100%"
  ></iframe>
`;
        const camPreview = document.getElementById("cameraPreview");
        camPreview.srcObject = camStream;
        // timerEl = document.getElementById("timer");
        timeDisplay = document.getElementById("time");
        bar = document.getElementById("bar");

        const percent = (remainingSeconds / examTime) * 100;
        bar.style.width = percent + "%";
      }, 1000);

      monitoringStarted = true;
      socket.emit("user-join", userId);

      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const dim = 600;
      canvas.width = (dim * 16) / 9;
      canvas.height = dim;
      const ctx = canvas.getContext("2d");
      const draw = () =>
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const drawInterval = setInterval(draw, 1000);

      const recordedStream = canvas.captureStream(1);
      const recorder = new MediaRecorder(recordedStream, {
        mimeType: "video/webm;codecs=vp8",
        videoBitsPerSecond: 10_000_000,
      });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          e.data.arrayBuffer().then((buffer) => {
            socket.emit("video-chunk", { userId, chunk: buffer });
          });
        }
      };
      recorder.start(1000);

      function updateTimer() {
        const m = Math.floor(remainingSeconds / 60);
        const s = String(remainingSeconds % 60).padStart(2, "0");
        // timerEl.textContent = `Time Left: ${m}:${s}`;
        const percent = (remainingSeconds / examTime) * 100;
        bar.style.width = percent + "%";
        timeDisplay.textContent = `Time Left: ${m}:${s}`;
      }

      const countdown = setInterval(() => {
        remainingSeconds--;
        updateTimer();

        if (remainingSeconds <= 0) {
          clearInterval(countdown);
          clearInterval(drawInterval);
          recorder.stop();
          socket.emit("user-suspicion", { userId, isSuspicious });
          window.focus();
          setTimeout(() => {
            window.open("", "_self");
            window.close();
          }, 100);
        }
      }, 1000);

      const monitorCheck = setInterval(async () => {
        const countNow = await getMonitorCount();
        if (countNow > 1) {
          warnCheater();
          clearInterval(monitorCheck);
          setTimeout(() => {
            window.focus();
            window.close();
          }, 10000);
        }
      }, 5000);

      window.addEventListener("beforeunload", () => {
        recorder.stop();
        clearInterval(drawInterval);
        socket.emit("user-suspicion", { userId, isSuspicious });
      });
    } catch {
      alert("Screen sharing is required to start the exam.");
    }
  });
}

startBtn.addEventListener("click", () => {
  if (!loading) {
    loading = true;
    startBtn.classList.add("disabled");
    startExam();
  }
});
