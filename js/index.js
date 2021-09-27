(function () {
  "use strict";
  const setDateEle = document.querySelector(`.set-date`);
  const setTimeEle = document.querySelector(`.set-time`);
  const setBtnEle = document.querySelector(`.set-btn`);
  let endData = new Date("2021/09/30 18:00:00");
  const els = {
    ms: initELements("ms"),
    s: initELements("s"),
    m: initELements("m"),
    h: initELements("h"),
  };

  // setBtnEle.addEventListener("click", () => {
  //   if (!setDateEle.value) {
  //     alert("请选择时间后输入!");
  //     return;
  //   }
  //   if (!setTimeEle.value) {
  //     setTimeEle.value = "00:00";
  //   }
  //   endData = new Date(`${setDateEle.value} ${setTimeEle.value}:00`);
  // });

  function initELements(type) {
    const els = [{}, {}];
    if (!["s", "m", "h", "ms"].includes(type)) return els;

    const target = document.querySelector(`.clock-${type}`);
    if (!target) return els;
    let el, el1;

    el = els[0];
    el.digit = target.querySelector(".digit-left");
    el.card = el.digit.querySelector(".card");
    el.cardFaces = el.card.querySelectorAll(".card-face");
    el.cardFaceA = el.cardFaces[0];
    el.cardFaceB = el.cardFaces[1];

    el1 = els[1];
    el1.digit = target.querySelector(".digit-right");
    el1.card = el1.digit.querySelector(".card");
    el1.cardFaces = el1.card.querySelectorAll(".card-face");
    el1.cardFaceA = el1.cardFaces[0];
    el1.cardFaceB = el1.cardFaces[1];

    return els;
  }
  (function runClock() {
    const nowData = new Date();
    const targetDate = endData.getTime() - nowData.getTime();
    const now = {
      d: "",
      h: "",
      m: "",
      s: "",
      ms: "",
    };
    const date = {
      d: Math.floor(targetDate / 1000 / 60 / 60 / 24), //天
      h: Math.floor(targetDate / 1000 / 60 / 60), //时
      m: Math.floor((targetDate / 1000 / 60) % 60), //分
      s: Math.floor((targetDate / 1000) % 60), //秒
      ms: Math.floor((targetDate / 10) % 100), //毫秒
    };
    now.h = date.h < 10 ? `0${date.h}` : `${date.h}`;
    now.m = date.m < 10 ? `0${date.m}` : `${date.m}`;
    now.s = date.s < 10 ? `0${date.s}` : `${date.s}`;
    now.ms = date.ms < 10 ? `0${date.ms}` : `${date.ms}`;
    now.h0 = now.h[0];
    now.h1 = now.h[1];
    now.m0 = now.m[0];
    now.m1 = now.m[1];
    now.s0 = now.s[0];
    now.s1 = now.s[1];
    now.ms0 = now.ms[0];
    now.ms1 = now.ms[1];
    // console.log(now.s);
    for (const t of Object.keys(els)) {
      for (const i of ["0", "1"]) {
        const curr = now[`${t}${i}`];
        let next = +curr - 1;
        if (t === "h") {
          if (i === "0") next = next >= 0 ? `${next}` : "9";
          if (i === "1") next = next >= 0 ? `${next}` : "9";
        }
        if (t === "m") {
          if (i === "0") next = next >= 0 ? `${next}` : "5";
          if (i === "1") next = next >= 0 ? `${next}` : "9";
        }
        if (t === "s") {
          if (i === "0") next = next >= 0 ? `${next}` : "5";
          if (i === "1") next = next >= 0 ? `${next}` : "9";
        }
        if (t === "ms") {
          if (i === "0") next = next >= 0 ? `${next}` : "9";
          if (i === "1") next = next >= 0 ? `${next}` : "9";
        }

        const el = els[t][i];
        if (el && el.digit) {
          if (!el.digit.dataset.digitBefore) {
            el.digit.dataset.digitBefore = curr;
            el.cardFaceA.textContent = el.digit.dataset.digitBefore;
            el.digit.dataset.digitAfter = next;
            el.cardFaceB.textContent = el.digit.dataset.digitAfter;
          } else if (el.digit.dataset.digitBefore !== curr) {
            el.card.addEventListener(
              "transitionend",
              function () {
                el.digit.dataset.digitBefore = curr;
                el.cardFaceA.textContent = el.digit.dataset.digitBefore;

                const cardClone = el.card.cloneNode(true);
                cardClone.classList.remove("flipped");
                el.digit.replaceChild(cardClone, el.card);
                el.card = cardClone;
                el.cardFaces = el.card.querySelectorAll(".card-face");
                el.cardFaceA = el.cardFaces[0];
                el.cardFaceB = el.cardFaces[1];

                el.digit.dataset.digitAfter = next;
                el.cardFaceB.textContent = el.digit.dataset.digitAfter;
              },
              { once: true }
            );
            if (!el.card.classList.contains("flipped")) {
              el.card.classList.add("flipped");
            }
          }
        }
      }
    }
    setTimeout(runClock, 10);
    // window.requestAnimationFrame(runClock);
    // setInterval(runClock, 10);
  })();
})();
