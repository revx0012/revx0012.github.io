(() => {
  const XMR = "49pRWjoggsafDsoXHsmNApBiqnBmfKVyJPnX3dUiLtTp96xFjSvBXK9RWsi6WQ4XXp1CCe3XBzpLpH3tUVmXsr1t2tT1U2U";
  const CHAOS_DURATION = 20000;

  const desktop = document.getElementById("desktop");
  const btnChaos = document.getElementById("btnChaos");
  const btnVideo = document.getElementById("btnVideo");
  const btnCall = document.getElementById("btnCall");
  const statusMode = document.getElementById("statusMode");

  const xmrAddress = document.getElementById("xmrAddress");
  const copyBtn = document.getElementById("copyXmr");
  const copyNote = document.getElementById("copyNote");

  const liveShell = document.getElementById("liveShell");
  const scrambleNodes = [...document.querySelectorAll("[data-scramble]")];

  const videoOverlay = document.getElementById("videoOverlay");
  const hurrVideo = document.getElementById("hurrVideo");

  const callOverlay = document.getElementById("callOverlay");
  const incomingCard = document.getElementById("incomingCard");
  const convoCard = document.getElementById("convoCard");
  const callSub = document.getElementById("callSub");
  const answerCall = document.getElementById("answerCall");
  const hangCall = document.getElementById("hangCall");
  const utText = document.getElementById("utText");
  const whiteout = document.getElementById("whiteout");

  const chaosCanvas = document.getElementById("chaosCanvas");
  const chaosGlyph = document.getElementById("chaosGlyph");
  const chaosLog = document.getElementById("chaosLog");
  const chaosEye = document.getElementById("chaosEye");

  const henry = document.getElementById("henryFix");

  const audioCall = document.getElementById("audioCall");
  const audioBg = document.getElementById("audioBg");
  const audioTalk = document.getElementById("audioTalk");
  const audioExit = document.getElementById("audioExit");

  const root = document.documentElement;
  const body = document.body;
  const ctx = chaosCanvas.getContext("2d", { alpha: true });

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%?@!*+-=";
  const weirdLines = [
    "something is lurking",
    "do not blink",
    "visual feed unstable",
    "shell corruption detected",
    "cursor is being watched",
    "memory drift detected",
    "close button was not close",
    "you opened the wrong thing"
  ];

  scrambleNodes.forEach((node) => {
    node.dataset.original = node.textContent;
  });

  const shellScript = [
    { t: "cmd", text: "revx@baghdad:~$ whoami" },
    { t: "out", text: "revx155 // beginner dev, sarcasm enabled" },
    { t: "cmd", text: "revx@baghdad:~$ date +\"%I:%M %p\"" },
    { t: "out", text: "baghdad local time: {{TIME}}" },
    { t: "cmd", text: "revx@baghdad:~$ ls interests/" },
    { t: "out", text: "games  coding  random_ideas  sleep.exe" },
    { t: "cmd", text: "revx@baghdad:~$ cat status.txt" },
    { t: "out", text: "bored but building." },
    { t: "cmd", text: "revx@baghdad:~$ _" }
  ];

  // Line-by-line pacing map to better match the bg track timing.
  const DIALOGUE_PLAN = [
    { text: "oh hey, you stumbled here", charMs: 36, leadMs: 190, tailMs: 620, commaMs: 240, endMs: 300 },
    { text: "well thanks for checking out my page", charMs: 35, leadMs: 120, tailMs: 600, commaMs: 220, endMs: 300 },
    { text: "life's been feeling good, what about u mate?", charMs: 35, leadMs: 150, tailMs: 680, commaMs: 250, endMs: 360 },
    { text: "i hope its good too.", charMs: 34, leadMs: 120, tailMs: 560, commaMs: 220, endMs: 320 },
    { text: "well just know that life is amazing", charMs: 35, leadMs: 120, tailMs: 620, commaMs: 220, endMs: 300 },
    { text: "i dont know why im saying that", charMs: 36, leadMs: 130, tailMs: 590, commaMs: 220, endMs: 300 },
    { text: "maybe im bored", charMs: 40, leadMs: 100, tailMs: 620, commaMs: 220, endMs: 300 },
    { text: "maybe im stressed out", charMs: 40, leadMs: 100, tailMs: 640, commaMs: 220, endMs: 300 },
    { text: "but atleast you're here, right?", charMs: 35, leadMs: 130, tailMs: 760, commaMs: 260, endMs: 360 },
    { text: "well anyways im bored", charMs: 39, leadMs: 100, tailMs: 560, commaMs: 220, endMs: 300 },
    { text: "would you like to play a game?", charMs: 35, leadMs: 120, tailMs: 690, commaMs: 220, endMs: 380 },
    { text: "oh yeah, youre busy as usual", charMs: 36, leadMs: 130, tailMs: 620, commaMs: 250, endMs: 320 },
    { text: "even if youre not really busy, i dont really care", charMs: 34, leadMs: 140, tailMs: 700, commaMs: 260, endMs: 320 },
    { text: "your time is more valuable than anything in the world", charMs: 33, leadMs: 150, tailMs: 820, commaMs: 240, endMs: 340 },
    { text: "and i hope you live well, sick-free and a great life", charMs: 33, leadMs: 150, tailMs: 820, commaMs: 260, endMs: 340 },
    { text: "follow god, whoever you believe in", charMs: 34, leadMs: 140, tailMs: 760, commaMs: 260, endMs: 320 },
    { text: "jewish, muslim, christian, buddha or anything", charMs: 34, leadMs: 130, tailMs: 760, commaMs: 280, endMs: 320 },
    { text: "or even athiest", charMs: 39, leadMs: 120, tailMs: 660, commaMs: 220, endMs: 320 },
    { text: "as long as you feel comfort, stick with it", charMs: 34, leadMs: 140, tailMs: 760, commaMs: 260, endMs: 320 },
    { text: "i want you to know that time is limited, so live your life fully", charMs: 33, leadMs: 160, tailMs: 850, commaMs: 280, endMs: 360 },
    { text: "you might not find me again, because not everything lasts long", charMs: 33, leadMs: 160, tailMs: 860, commaMs: 280, endMs: 360 },
    { text: "but just spend time with family if you have one, friends etc", charMs: 34, leadMs: 140, tailMs: 780, commaMs: 280, endMs: 340 },
    { text: "i have been lonely my whole life, and hated", charMs: 35, leadMs: 140, tailMs: 780, commaMs: 280, endMs: 340 },
    { text: "so thats why im saying, be good, eat good, have good health", charMs: 34, leadMs: 160, tailMs: 860, commaMs: 290, endMs: 360 },
    { text: "well hey, this is sans", charMs: 36, leadMs: 130, tailMs: 690, commaMs: 250, endMs: 320 },
    { text: "you can call me ron144 anyway because i made this whole thing, okay?", charMs: 33, leadMs: 170, tailMs: 900, commaMs: 290, endMs: 380 },
    { text: "well, see ya user!", charMs: 35, leadMs: 140, tailMs: 760, commaMs: 280, endMs: 360 },
    { text: "i hope you live an amazing life", charMs: 34, leadMs: 130, tailMs: 760, commaMs: 240, endMs: 340 },
    { text: "and dont be like me", charMs: 35, leadMs: 130, tailMs: 760, commaMs: 240, endMs: 340 },
    { text: "ok?", charMs: 42, leadMs: 190, tailMs: 720, commaMs: 240, endMs: 420 },
    { text: "bah-bye!", charMs: 44, leadMs: 180, tailMs: 1100, commaMs: 240, endMs: 460 }
  ];

  const state = {
    chaos: false,
    callMode: false,
    videoMode: false,
    shellDone: false,
    lineIndex: 0,
    lineChar: 0,
    timers: [],
    raf: 0,
    chaosStart: 0,
    audioCtx: null,
    gain: null,
    drones: []
  };

  const TALK_START_OFFSET = 0.045;

  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const escapeHtml = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const pushTimer = (id, type) => {
    state.timers.push({ id, type });
  };

  const clearTimers = () => {
    state.timers.forEach((t) => {
      if (t.type === "interval") window.clearInterval(t.id);
      else window.clearTimeout(t.id);
    });
    state.timers = [];
  };

  const baghdadTime = () => new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Baghdad",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  const updateMode = () => {
    const hour = Number(new Date().toLocaleString("en-US", { timeZone: "Asia/Baghdad", hour: "numeric", hour12: false }));
    if (hour >= 6 && hour < 12) statusMode.textContent = "morning mode";
    else if (hour >= 12 && hour < 18) statusMode.textContent = "afternoon mode";
    else if (hour >= 18 && hour < 23) statusMode.textContent = "night mode";
    else statusMode.textContent = "late-night mode";
  };

  const renderShell = () => {
    const lines = [];
    for (let i = 0; i < shellScript.length; i += 1) {
      const row = shellScript[i];
      const text = row.text.replace("{{TIME}}", baghdadTime());
      if (i < state.lineIndex) {
        lines.push(`<p class=\"shell-line ${row.t}\">${escapeHtml(text)}</p>`);
      } else if (i === state.lineIndex) {
        lines.push(`<p class=\"shell-line ${row.t}\">${escapeHtml(text.slice(0, state.lineChar))}</p>`);
      }
    }
    liveShell.innerHTML = lines.join("") + "<span class=\"shell-cursor\"></span>";
    liveShell.scrollTop = liveShell.scrollHeight;
  };

  const tickShell = () => {
    if (state.chaos || state.callMode || state.videoMode || state.shellDone) return;
    const row = shellScript[state.lineIndex];
    if (!row) {
      state.shellDone = true;
      renderShell();
      return;
    }
    const full = row.text.replace("{{TIME}}", baghdadTime());
    if (state.lineChar < full.length) {
      state.lineChar += 1;
      renderShell();
      return;
    }
    state.lineIndex += 1;
    state.lineChar = 0;
    if (state.lineIndex >= shellScript.length) {
      state.shellDone = true;
    }
    renderShell();
  };

  const scrambleText = (text, amount) => {
    let out = "";
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      if (ch === " ") out += " ";
      else out += Math.random() < amount
        ? scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        : ch;
    }
    return out;
  };

  const glyphBlock = (amount) => {
    const lines = [];
    const count = Math.max(4, Math.floor(3 + amount * 16));
    for (let i = 0; i < count; i += 1) {
      const msg = weirdLines[Math.floor(Math.random() * weirdLines.length)];
      const len = 14 + Math.floor(Math.random() * 38);
      let noise = "";
      for (let j = 0; j < len; j += 1) noise += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      lines.push(msg + " :: " + noise);
    }
    return lines.join("\n");
  };

  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    chaosCanvas.width = Math.floor(window.innerWidth * dpr);
    chaosCanvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawChaos = (amount) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    ctx.globalAlpha = 0.12 + amount * 0.45;
    for (let y = 0; y < h; y += Math.floor(2 + Math.random() * 7)) {
      ctx.fillStyle = Math.random() > 0.5
        ? "rgba(255,0,120," + (0.08 + amount * 0.34) + ")"
        : "rgba(0,255,255," + (0.07 + amount * 0.3) + ")";
      ctx.fillRect(0, y, w, 1 + Math.random() * 2.4);
    }

    ctx.globalAlpha = 0.11 + amount * 0.34;
    for (let i = 0; i < 42; i += 1) {
      ctx.fillStyle = "rgba(" +
        Math.floor(Math.random() * 255) + "," +
        Math.floor(Math.random() * 120) + "," +
        Math.floor(Math.random() * 255) + "," +
        (0.06 + amount * 0.24) + ")";
      ctx.fillRect(
        Math.random() * w,
        Math.random() * h,
        6 + Math.random() * (100 + amount * 190),
        1 + Math.random() * (15 + amount * 24)
      );
    }
  };

  const ensureAudioCtx = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    if (!state.audioCtx) {
      state.audioCtx = new Ctx();
      state.gain = state.audioCtx.createGain();
      state.gain.gain.value = 0.0001;
      state.gain.connect(state.audioCtx.destination);
    }
    if (state.audioCtx.state === "suspended") state.audioCtx.resume();
    return true;
  };

  const startChaosDrone = () => {
    if (!ensureAudioCtx() || state.drones.length) return;
    const now = state.audioCtx.currentTime;
    [36, 49, 63, 79, 95].forEach((f, idx) => {
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = idx % 2 ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.008 + idx * 0.0038, now + 0.8);
      osc.connect(gain);
      gain.connect(state.gain);
      osc.start(now);
      state.drones.push({ osc, gain });
    });
    state.gain.gain.linearRampToValueAtTime(0.26, now + 1);
  };

  const chaosBurst = (amount) => {
    if (!ensureAudioCtx()) return;
    const now = state.audioCtx.currentTime;
    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    osc.type = Math.random() > 0.5 ? "square" : "sawtooth";
    osc.frequency.setValueAtTime(150 + Math.random() * 2500 + amount * 1900, now);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 1800, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.02 + amount * 0.14, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08 + Math.random() * 0.12);
    osc.connect(gain);
    gain.connect(state.gain);
    osc.start(now);
    osc.stop(now + 0.22);

    if (Math.random() < 0.35 + amount * 0.5) {
      const count = Math.floor(state.audioCtx.sampleRate * 0.07);
      const buffer = state.audioCtx.createBuffer(1, count, state.audioCtx.sampleRate);
      const arr = buffer.getChannelData(0);
      for (let i = 0; i < count; i += 1) arr[i] = (Math.random() * 2 - 1) * (0.55 + amount);
      const source = state.audioCtx.createBufferSource();
      const nGain = state.audioCtx.createGain();
      source.buffer = buffer;
      nGain.gain.value = 0.004 + amount * 0.042;
      source.connect(nGain);
      nGain.connect(state.gain);
      source.start();
    }
  };

  const stopChaosAudio = () => {
    if (!state.audioCtx) return;
    const now = state.audioCtx.currentTime;
    if (state.gain) {
      state.gain.gain.cancelScheduledValues(now);
      state.gain.gain.setValueAtTime(state.gain.gain.value, now);
      state.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    }
    state.drones.forEach((n) => {
      try {
        n.gain.gain.cancelScheduledValues(now);
        n.gain.gain.setValueAtTime(n.gain.gain.value, now);
        n.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        n.osc.stop(now + 0.24);
      } catch (err) {
        // ignore
      }
    });
    state.drones = [];
    state.audioCtx.close().catch(() => {});
    state.audioCtx = null;
    state.gain = null;
  };

  const showHenry = () => {
    henry.classList.remove("out");
    henry.classList.add("show");
    pushTimer(window.setTimeout(() => {
      henry.classList.add("out");
    }, 3000), "timeout");
    pushTimer(window.setTimeout(() => {
      henry.classList.remove("show", "out");
    }, 3600), "timeout");
  };

  const restoreScramble = () => {
    scrambleNodes.forEach((n) => { n.textContent = n.dataset.original; });
    updateMode();
  };

  const stopChaos = () => {
    if (!state.chaos) return;
    state.chaos = false;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
    clearTimers();
    stopChaosAudio();

    root.style.setProperty("--chaos", "0");
    root.style.setProperty("--jx", "0px");
    root.style.setProperty("--jy", "0px");
    root.style.setProperty("--jr", "0deg");
    root.style.setProperty("--js", "0deg");

    body.classList.remove("chaos-active", "chaos-flash", "chaos-invert");
    chaosGlyph.textContent = "";
    chaosLog.textContent = "";
    chaosEye.style.opacity = "0";
    chaosEye.style.transform = "translate(-50%, -50%) scale(.35)";

    restoreScramble();
    btnChaos.disabled = false;
    showHenry();
  };

  const startChaos = () => {
    if (state.chaos || state.videoMode || state.callMode) return;
    state.chaos = true;
    state.chaosStart = performance.now();
    btnChaos.disabled = true;
    body.classList.add("chaos-active");
    startChaosDrone();

    const frame = (now) => {
      if (!state.chaos) return;
      const amount = Math.min((now - state.chaosStart) / CHAOS_DURATION, 1);
      root.style.setProperty("--chaos", amount.toFixed(3));
      root.style.setProperty("--jx", ((Math.random() - 0.5) * amount * 44).toFixed(2) + "px");
      root.style.setProperty("--jy", ((Math.random() - 0.5) * amount * 24).toFixed(2) + "px");
      root.style.setProperty("--jr", ((Math.random() - 0.5) * amount * 3.2).toFixed(2) + "deg");
      root.style.setProperty("--js", ((Math.random() - 0.5) * amount * 5.2).toFixed(2) + "deg");

      drawChaos(amount);

      if (amount >= 1) {
        stopChaos();
        return;
      }
      state.raf = requestAnimationFrame(frame);
    };

    state.raf = requestAnimationFrame(frame);

    pushTimer(window.setInterval(() => {
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      chaosGlyph.textContent = glyphBlock(amount);
      chaosBurst(amount);
    }, 90), "interval");

    pushTimer(window.setInterval(() => {
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      const lines = [];
      const count = 4 + Math.floor(amount * 6);
      for (let i = 0; i < count; i += 1) {
        const msg = weirdLines[Math.floor(Math.random() * weirdLines.length)];
        lines.push("[" + (Math.random() * 99999).toFixed(0).padStart(5, "0") + "] " + msg);
      }
      chaosLog.textContent = lines.join("\n");
    }, 110), "interval");

    pushTimer(window.setInterval(() => {
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      scrambleNodes.forEach((n) => {
        n.textContent = scrambleText(n.dataset.original, Math.min(0.96, amount * 1.08));
      });
      statusMode.textContent = amount > 0.6 ? "something is lurking" : "signal weird";
    }, 110), "interval");

    pushTimer(window.setInterval(() => {
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      if (Math.random() < (0.22 + amount * 0.6)) {
        body.classList.add("chaos-flash");
        pushTimer(window.setTimeout(() => body.classList.remove("chaos-flash"), 40 + Math.random() * 90), "timeout");
      }
    }, 120), "interval");

    pushTimer(window.setInterval(() => {
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      if (Math.random() < (0.11 + amount * 0.58)) {
        chaosEye.style.left = Math.round(Math.random() * window.innerWidth) + "px";
        chaosEye.style.top = Math.round(Math.random() * window.innerHeight) + "px";
        chaosEye.style.opacity = String(0.4 + amount * 0.6);
        chaosEye.style.transform = "translate(-50%, -50%) scale(" + (0.7 + amount * 1.1).toFixed(2) + ")";
        pushTimer(window.setTimeout(() => {
          chaosEye.style.opacity = "0";
          chaosEye.style.transform = "translate(-50%, -50%) scale(.35)";
        }, 120 + Math.random() * 380), "timeout");
      }
    }, 160), "interval");

    const invertPulse = () => {
      if (!state.chaos) return;
      const amount = parseFloat(getComputedStyle(root).getPropertyValue("--chaos")) || 0;
      if (Math.random() < (0.09 + amount * 0.5)) {
        body.classList.add("chaos-invert");
        pushTimer(window.setTimeout(() => body.classList.remove("chaos-invert"), 70 + Math.random() * 120), "timeout");
      }
      pushTimer(window.setTimeout(invertPulse, 130 + Math.random() * 250), "timeout");
    };

    invertPulse();
    pushTimer(window.setTimeout(stopChaos, CHAOS_DURATION + 140), "timeout");
  };

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("copy failed");
  };

  const stopAllCallAudio = () => {
    [audioCall, audioBg, audioTalk, audioExit].forEach((a) => {
      a.pause();
      a.currentTime = 0;
      a.loop = false;
    });
  };

  const closeCallOverlay = () => {
    stopAllCallAudio();
    callOverlay.classList.add("hidden");
    callOverlay.setAttribute("aria-hidden", "true");
    incomingCard.classList.remove("hidden");
    convoCard.classList.add("hidden");
    answerCall.disabled = false;
    hangCall.disabled = false;
    answerCall.textContent = "answer";
    hangCall.textContent = "hang up";
    whiteout.classList.remove("active");
    whiteout.style.transitionDuration = "";
    desktop.classList.remove("hidden");
    state.callMode = false;
  };

  const openVideoOverlay = async () => {
    if (state.chaos || state.callMode || state.videoMode) return;
    state.videoMode = true;
    desktop.classList.add("hidden");
    videoOverlay.classList.remove("hidden");
    videoOverlay.setAttribute("aria-hidden", "false");
    hurrVideo.controls = false;
    hurrVideo.currentTime = 0;
    try {
      await hurrVideo.play();
    } catch (err) {
      location.reload();
    }
  };

  const waitAudioEnd = (audio, fallbackMs) => new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      audio.removeEventListener("ended", finish);
      resolve();
    };
    audio.addEventListener("ended", finish, { once: true });
    pushTimer(window.setTimeout(finish, fallbackMs), "timeout");
  });

  const safePlay = async (audio) => {
    try {
      await audio.play();
      return true;
    } catch (err) {
      return false;
    }
  };

  const primeTalkAudio = async () => {
    const originalVolume = Number.isFinite(audioTalk.volume) ? audioTalk.volume : 1;
    audioTalk.loop = true;
    audioTalk.volume = 0;
    audioTalk.currentTime = TALK_START_OFFSET;
    const ok = await safePlay(audioTalk);
    if (ok) {
      await wait(100);
      audioTalk.pause();
    }
    audioTalk.currentTime = TALK_START_OFFSET;
    audioTalk.volume = originalVolume;
  };

  const startTalk = async () => {
    audioTalk.loop = true;
    if (audioTalk.paused) {
      const maxStart = Number.isFinite(audioTalk.duration) && audioTalk.duration > 0
        ? Math.max(0, audioTalk.duration - 0.02)
        : TALK_START_OFFSET;
      audioTalk.currentTime = Math.min(TALK_START_OFFSET, maxStart);
      await safePlay(audioTalk);
    }
    audioTalk.volume = 1;
  };

  const stopTalk = () => {
    audioTalk.pause();
    audioTalk.currentTime = TALK_START_OFFSET;
  };

  const fadeOutAudio = async (audio, durationMs) => {
    if (audio.paused) return;
    const startVolume = Number.isFinite(audio.volume) ? audio.volume : 1;
    const steps = Math.max(1, Math.floor(durationMs / 40));
    for (let i = 0; i < steps; i += 1) {
      const t = (i + 1) / steps;
      audio.volume = Math.max(0, startVolume * (1 - t));
      await wait(40);
    }
    audio.pause();
    audio.currentTime = 0;
    audio.volume = startVolume;
  };

  const typeLine = async (step) => {
    utText.textContent = "";
    if (step.leadMs > 0) await wait(step.leadMs);
    await startTalk();

    for (const ch of step.text) {
      utText.textContent += ch;
      let d = ch === " " ? Math.max(12, Math.floor(step.charMs * 0.42)) : step.charMs;
      if (",;:".includes(ch)) d += step.commaMs;
      if (".!?".includes(ch)) d += step.endMs;
      await wait(d);
    }

    stopTalk();
    if (step.tailMs > 0) await wait(step.tailMs);
  };

  const runDialogue = async () => {
    await primeTalkAudio();

    audioBg.currentTime = 0;
    audioBg.loop = true;
    audioBg.volume = 1;
    await safePlay(audioBg);

    const startedAt = performance.now();
    for (const step of DIALOGUE_PLAN) {
      await typeLine(step);
    }

    const elapsed = performance.now() - startedAt;
    const bgDurationMs = Number.isFinite(audioBg.duration) && audioBg.duration > 0
      ? audioBg.duration * 1000
      : 0;
    if (bgDurationMs > 0) {
      const remaining = bgDurationMs - elapsed;
      if (remaining > 5000) {
        await wait(Math.min(remaining - 5000, 2500));
      }
    }

    stopTalk();
    await fadeOutAudio(audioBg, 900);

    const exitDuration = Number.isFinite(audioExit.duration) && audioExit.duration > 0 ? audioExit.duration : 5;
    whiteout.style.transitionDuration = `${exitDuration}s`;
    requestAnimationFrame(() => whiteout.classList.add("active"));

    audioExit.currentTime = 0;
    await safePlay(audioExit);
    await waitAudioEnd(audioExit, (exitDuration + 0.4) * 1000);

    location.reload();
  };

  const openCallOverlay = async () => {
    if (state.chaos || state.videoMode || state.callMode) return;
    state.callMode = true;

    desktop.classList.add("hidden");
    callOverlay.classList.remove("hidden");
    callOverlay.setAttribute("aria-hidden", "false");
    incomingCard.classList.remove("hidden");
    convoCard.classList.add("hidden");
    answerCall.disabled = false;
    hangCall.disabled = false;
    answerCall.textContent = "answer";
    hangCall.textContent = "hang up";
    whiteout.classList.remove("active");
    whiteout.style.transitionDuration = "";
    callSub.textContent = "incoming call...";
    utText.textContent = "";

    audioCall.currentTime = 0;
    audioCall.loop = true;
    try { await audioCall.play(); } catch (err) { /* ignore */ }
  };

  copyBtn.addEventListener("click", async () => {
    try {
      await copyText(XMR);
      copyBtn.textContent = "copied";
      copyNote.textContent = "address copied.";
      pushTimer(window.setTimeout(() => {
        copyBtn.textContent = "copy";
        copyNote.textContent = "no wallet drama. monero only.";
      }, 1400), "timeout");
    } catch (err) {
      copyNote.textContent = "copy failed. copy manually from the box.";
    }
  });

  btnChaos.addEventListener("click", () => {
    if (!state.chaos) startChaos();
  });

  btnVideo.addEventListener("click", () => {
    openVideoOverlay();
  });

  btnCall.addEventListener("click", () => {
    openCallOverlay();
  });

  hurrVideo.addEventListener("ended", () => {
    location.reload();
  });

  answerCall.addEventListener("click", async () => {
    if (!state.callMode) return;
    answerCall.disabled = true;
    hangCall.disabled = true;
    audioCall.pause();
    audioCall.currentTime = 0;
    incomingCard.classList.add("hidden");
    convoCard.classList.remove("hidden");
    callSub.textContent = "";
    await runDialogue();
  });

  hangCall.addEventListener("click", async () => {
    if (!state.callMode) return;
    answerCall.disabled = true;
    hangCall.disabled = true;
    audioCall.pause();
    audioCall.currentTime = 0;
    callSub.textContent = "loser.";
    await wait(1300);
    closeCallOverlay();
  });

  window.addEventListener("resize", resizeCanvas);

  xmrAddress.textContent = XMR;
  resizeCanvas();
  updateMode();
  renderShell();

  window.setInterval(updateMode, 60000);
  window.setInterval(tickShell, 60);
})();
