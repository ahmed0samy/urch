const notiCont = document.querySelector(".notification");
const notiText = document.querySelector(".msg");

function htmlContent(link, height) {
  return `
         <img class="logo" src="/logo.png" alt="" />
  <h1>List of all formulas and data you will need</h1>
      <div class="notification">
      <img src="/cancel.png" alt="cancel" />
      <span class="msg">You has already entered the exam!</span>
    </div>
    <div class="grid-table">
    <div class="header">Element</div>
    <div class="header">Electrode Reaction</div>
    <div class="header">E° (V)</div>

    <div>Li</div><div>Li<sup>+</sup> + e<sup>−</sup> → Li</div><div>-3.045</div>
    <div>K</div><div>K<sup>+</sup> + e<sup>−</sup> → K</div><div>-2.925</div>
    <div>Cs</div><div>Cs<sup>+</sup> + e<sup>−</sup> → Cs</div><div>-2.923</div>
    <div>Ba</div><div>Ba<sup>2+</sup> + 2e<sup>−</sup> → Ba</div><div>-2.906</div>
    <div>Ca</div><div>Ca<sup>2+</sup> + 2e<sup>−</sup> → Ca</div><div>-2.866</div>
    <div>Na</div><div>Na<sup>+</sup> + e<sup>−</sup> → Na</div><div>-2.714</div>
    <div>Mg</div><div>Mg<sup>2+</sup> + 2e<sup>−</sup> → Mg</div><div>-2.363</div>
    <div>Al</div><div>Al<sup>3+</sup> + 3e<sup>−</sup> → Al</div><div>-1.662</div>
    <div>H<sub>2</sub>O</div><div>H<sub>2</sub>O + 2e<sup>−</sup> → H<sub>2</sub> + 2OH<sup>−</sup></div><div>-0.829</div>
    <div>Zn</div><div>Zn<sup>2+</sup> + 2e<sup>−</sup> → Zn</div><div>-0.763</div>
    <div>Fe</div><div>Fe<sup>2+</sup> + 2e<sup>−</sup> → Fe</div><div>-0.440</div>
    <div>Cd</div><div>Cd<sup>2+</sup> + 2e<sup>−</sup> → Cd</div><div>-0.403</div>
    <div>PbSO<sub>4</sub></div><div>PbSO<sub>4</sub> + 2e<sup>−</sup> → Pb + SO<sub>4</sub><sup>2−</sup></div><div>-0.310</div>
    <div>Co</div><div>Co<sup>2+</sup> + 2e<sup>−</sup> → Co</div><div>-0.280</div>
    <div>Ni</div><div>Ni<sup>2+</sup> + 2e<sup>−</sup> → Ni</div><div>-0.250</div>
    <div>Sn</div><div>Sn<sup>2+</sup> + 2e<sup>−</sup> → Sn</div><div>-0.136</div>
    <div>Pb</div><div>Pb<sup>2+</sup> + 2e<sup>−</sup> → Pb</div><div>-0.126</div>
    <div>Fe</div><div>Fe<sup>3+</sup> + 3e<sup>−</sup> → Fe</div><div>-0.036</div>
    <div>H<sub>2</sub></div><div>2H<sup>+</sup> + 2e<sup>−</sup> → H<sub>2</sub> (SHE)</div><div>0</div>
    <div>Cu</div><div>Cu<sup>2+</sup> + e<sup>−</sup> → Cu<sup>+</sup></div><div>+0.153</div>
    <div>S</div><div>S<sub>4</sub>O<sub>6</sub><sup>2−</sup> + 2e<sup>−</sup> → 2S<sub>2</sub>O<sub>3</sub><sup>2−</sup></div><div>+0.170</div>
    <div>Cu</div><div>Cu<sup>2+</sup> + 2e<sup>−</sup> → Cu</div><div>+0.337</div>
    <div>I<sub>2</sub></div><div>I<sub>2</sub> + 2e<sup>−</sup> → 2I<sup>−</sup></div><div>+0.534</div>
    <div>Fe</div><div>Fe<sup>3+</sup> + e<sup>−</sup> → Fe<sup>2+</sup></div><div>+0.770</div>
    <div>Ag</div><div>Ag<sup>+</sup> + e<sup>−</sup> → Ag</div><div>+0.799</div>
    <div>Hg</div><div>Hg<sup>2+</sup> + 2e<sup>−</sup> → Hg</div><div>+0.854</div>
    <div>Br<sub>2</sub></div><div>Br<sub>2</sub> + 2e<sup>−</sup> → 2Br<sup>−</sup></div><div>+1.066</div>
    <div>O<sub>2</sub></div><div>O<sub>2</sub> + 4H<sup>+</sup> + 2e<sup>−</sup> → 2H<sub>2</sub>O</div><div>+1.230</div>
    <div>Cr</div><div>Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup> + 14H<sup>+</sup> + 6e<sup>−</sup> → 2Cr<sup>3+</sup> + 7H<sub>2</sub>O</div><div>+1.330</div>
    <div>Cl<sub>2</sub></div><div>Cl<sub>2</sub> + 2e<sup>−</sup> → 2Cl<sup>−</sup></div><div>+1.359</div>
    <div>Au</div><div>Au<sup>3+</sup> + 3e<sup>−</sup> → Au</div><div>+1.498</div>
    <div>Mn</div><div>MnO<sub>4</sub><sup>−</sup> + 8H<sup>+</sup> + 5e<sup>−</sup> → Mn<sup>2+</sup> + 4H<sub>2</sub>O</div><div>+1.510</div>
    <div>F<sub>2</sub></div><div>F<sub>2</sub> + 2e<sup>−</sup> → 2F<sup>−</sup></div><div>+2.870</div>
  </div>
  <h3 id="timer"></h3>
  <video id="cameraPreview" autoplay muted playsinline></video>
 <div class="countdown-wrapper">
 <div class="time-text" id="time">Time left: 10:00</div>
 <div class="bar-container">
 <div class="countdown-bar" id="bar" style="width: 100%;"></div>
 </div>
 </div>
 <img src="https://res.cloudinary.com/drsg8lcbn/image/upload/v1752576131/periodic_table_xlaiyd.png" class="periodic" />
<img class='container' src="https://res.cloudinary.com/drsg8lcbn/image/upload/v1752576120/constants_dv3cup.png" />
 <h1>Exam</h1>
  <iframe
  class="visible"
    id="examFrame"
    src="${link}"
    width="100%"
    style="height: ${height}px;"
  ></iframe>
  <button class="return">Return to top</button>
  <div class="gap"></div>
  `;
}

function showNoti(msg, time) {
  const notiCont = document.querySelector(".notification");
  const notiText = document.querySelector(".msg");

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
const permissionNextBtn = document.querySelectorAll(".next")[1];
let currentSliden = 1;

setTimeout(() => {
  nextBtn.classList.remove("disabled");
}, 5000);

nextBtn.addEventListener("click", (eo) => {
  if (nextBtn.classList.contains("disabled")) return;
  sliders.forEach((slider, i) => {
    slider.style.left = `${(i - 1) * 100}vw`;
  });
  setTimeout(() => {
    permissionNextBtn.classList.remove("disabled");
  }, 16000);
});
permissionNextBtn.addEventListener("click", (eo) => {
  if (!permissionNextBtn.classList.contains("disabled")) {
    sliders.forEach((slider, i) => {
      slider.style.left = `${(i - 2) * 100}vw`;
    });
  }
});
setTimeout(() => {
  document.body.classList.add("reddish");
}, 1000);

const socket = io();
const examTime = 5400; // seconds
let remainingSeconds = examTime;
let monitoringStarted = false;
let isSuspicious = 0;

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("user");
const sessionToken = sessionStorage.getItem("exam-token");

if (!token || token !== sessionToken) {
  document.body.innerHTML = `          <div class="scroll unauthor">
  <div class="container">
  <h2 class="small">Warning</h2>
  <p>You mustn't take this page URL and paste in other page, If you want to open in another browser, you must go to home page first.</p>
  <a href="/">Go to home page</a>
  </div>
 </div>`;
  // throw new Error("Blocked manual access to exam page");
}

socket.on("stop-recording", ({ reason }) => {
  console.warn("Recording stopped due to:", reason);

  if (recorder && recorder.state === "recording") {
    recorder.stop();
  }

  showNoti("Recording stopped: " + reason, 4000);

  // Optionally: end exam, lock UI, or redirect
});

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
    isSuspicious = Math.max(3, isSuspicious);
    console.warn("DevTools detected");
  }
}, 1000);

// Detect tab switch
document.addEventListener("visibilitychange", () => {
  if (monitoringStarted && document.hidden) {
    isSuspicious = Math.max(1, isSuspicious);
  }
});

window.addEventListener("blur", () => {
  if (remainingSeconds < examTime - 10) {
    isSuspicious = Math.max(2, isSuspicious);
  }
});

async function getMonitorCount() {
  if (navigator.userAgent.includes("Mac") && !window.getScreenDetails) {
    return 1;
  }

  if (!window.isSecureContext) {
    console.warn(
      "This page must be served over HTTPS to access screen details."
    );
    warnError(
      "Please access this site over HTTPS to proceed.",
      3000,
      false,
      true
    );
    return 1; // Fallback to assume single monitor
  }

  if (!window.getScreenDetails) {
    console.warn("getScreenDetails not supported in this browser.");
    return 1; // Fallback for unsupported browsers
  }
  try {
    // Check permission state
    const permissionStatus = await navigator.permissions.query({
      name: "window-management",
    });
    if (permissionStatus.state === "granted") {
      const details = await window.getScreenDetails();
      return details.screens.length;
    } else if (permissionStatus.state === "prompt") {
      // Attempt to trigger the permission prompt
      try {
        const details = await window.getScreenDetails();
        return details.screens.length;
      } catch (promptErr) {
        console.error(
          "Failed to prompt for window-management permission:",
          promptErr
        );
        throw new Error(
          "Please allow window management permission in your browser settings (e.g., chrome://settings/content/window-management)."
        );
      }
    } else {
      throw new Error(
        "Window management permission denied. Please enable it in your browser settings."
      );
    }
  } catch (err) {
    console.error("Error accessing screen details:", err);
    throw err;
  }
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
              <source src="https://res.cloudinary.com/drsg8lcbn/video/upload/v1752576123/cheater_gjafj7.mp4" type="video/mp4">
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

  if (!userId.includes("@")) {
    warnError("This email is invalid!", 2000, true, true);
    loading = false;
    startBtn.classList.remove("disabled");
    return;
  }

  // Request window-management permission first
  let screenCount;
  try {
    screenCount = await getMonitorCount();
    if (screenCount > 1) {
      warnError("Please disconnect additional monitors.", 2000, false, true);
      loading = false;
      startBtn.classList.remove("disabled");
      return;
    }
  } catch (err) {
    console.error("Window management permission error:", err);
    warnError(
      err.message ||
        "Please allow window management permission in your browser settings (e.g., chrome://settings/content/window-management).",
      4000,
      false,
      true
    );
    loading = false;
    startBtn.classList.remove("disabled");
    return;
  }
  setInterval(() => {
    socket.emit("heartbeat", { userId });
  }, 3000); // every 3 seconds

  // Check camera permission status
  let camStream;
  try {
    const cameraPermission = await navigator.permissions.query({
      name: "camera",
    });
    if (
      cameraPermission.state === "granted" ||
      cameraPermission.state === "prompt"
    ) {
      camStream = await navigator.mediaDevices.getUserMedia({ video: true });
    } else {
      throw new Error("Camera permission denied");
    }
  } catch (err) {
    console.error("Camera permission error:", err);
    warnError("You must allow camera access to proceed.", 2000, false, true);
    warnError(
      "Close any app using the camera, and check camera permission.",
      2000,
      true,
      false
    );
    loading = false;
    startBtn.classList.remove("disabled");
    return;
  }

  // Request screen-sharing permission
  let screenStream;
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
  } catch (err) {
    console.error("Screen-sharing permission error:", err);
    warnError("You must allow screen-sharing to proceed.", 2000, true, true);
    camStream.getTracks().forEach((t) => t.stop());
    loading = false;
    startBtn.classList.remove("disabled");
    return;
  }
  screenStream.getVideoTracks()[0].addEventListener("ended", () => {
    warnError(
      "Screen sharing was stopped! Exam will close right now.",
      9000,
      false,
      true
    );
    // warnCheater();
    setTimeout(() => {
      window.open("", "_self");
      window.close();
    }, 11000);
    recorder.stop();
    socket.emit("user-suspicion", { userId, isSuspicious: 5 });
  });
  // Proceed with socket communication
  socket.emit("exam-start", userId, async (response) => {
    if (!response.allowed) {
      switch (response.reason) {
        case "not_registered":
          warnError(
            "This email isn't registered in registration form!",
            6000,
            true,
            true
          );
          break;
        case "already_attended":
          warnError("You have already attended the exam!", 6000, false, true);
          break;
        case "closed":
          warnError(
            response.message || "Exam is not available right now!",
            6000,
            false,
            true
          );
          break;
        default:
          warnError(
            "An error has occurred :" + response.reason + "! Please try again.",
            2000,
            false,
            true
          );
      }
      camStream.getTracks().forEach((t) => t.stop());
      screenStream.getTracks().forEach((t) => t.stop());
      loading = false;
      startBtn.classList.remove("disabled");
      return;
    }

    // Proceed with exam setup
    sliders.forEach((slider, i) => {
      slider.style.left = `${(i - 2) * 100}vw`;
    });

    const blackMask = document.querySelector(".black");
    blackMask.style.right = "0";

    setTimeout(() => {
      blackMask.style.right = "100vw";
      document.body.classList.add("dark");
      document.body.classList.remove("reddish");
      document.body.classList.add("scroll");
      document.body.classList.remove("unscroll");

      document.body.innerHTML = htmlContent(response.link, response.height);
      const returnToTop = document.querySelector(".return");
      returnToTop.addEventListener("click", () => {
        window.scrollBy({
          top: -response.height + window.innerHeight - 200,
          behavior: "smooth",
        }); // Scroll up 200 pixels
      });
      const camPreview = document.getElementById("cameraPreview");
      camPreview.srcObject = camStream;

      timeDisplay = document.getElementById("time");
      bar = document.getElementById("bar");

      const percent = (remainingSeconds / examTime) * 100;
      bar.style.width = percent + "%";

      monitoringStarted = true;
      socket.emit("user-join", userId);

      const video = document.createElement("video");
      video.srcObject = screenStream;
      video.play();

      const canvas = document.createElement("canvas");
      const dim = 600;
      canvas.width = (dim * 16) / 9;
      canvas.height = dim;
      const ctx = canvas.getContext("2d");

      const drawInterval = setInterval(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }, 10);

      const recordedStream = canvas.captureStream(2);
      const recorder = new MediaRecorder(recordedStream, {
        mimeType: "video/webm;codecs=vp8",
        videoBitsPerSecond: 10_000_000,
      });

      let chunkBuffer = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          e.data.arrayBuffer().then((buffer) => {
            if (socket.connected) {
              socket.emit("video-chunk", { userId, chunk: buffer });
            } else {
              chunkBuffer.push(buffer); // store temporarily
            }
          });
        }
      };
      setInterval(() => {
        socket.emit("heartbeat", { userId }); // send every 5 seconds
      }, 5000);

      recorder.start(1000);

      function updateTimer() {
        const m = Math.floor(remainingSeconds / 60);
        const s = String(remainingSeconds % 60).padStart(2, "0");
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
        try {
          const countNow = await getMonitorCount();
          if (countNow > 1) {
            warnCheater();
            clearInterval(monitorCheck);
            setTimeout(() => {
              window.focus();
              window.close();
            }, 10000);
          }
        } catch (err) {
          console.error("Monitor check error:", err);
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
    }, 1000);
  });
}

startBtn.addEventListener("click", () => {
  if (!loading) {
    loading = true;
    startBtn.classList.add("disabled");
    startExam();
  }
});
