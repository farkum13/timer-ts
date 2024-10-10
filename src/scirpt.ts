(function () {
    // Type assertions used to inform TypeScript that these elements will not be null.
    const hour = document.querySelector(".hour") as HTMLInputElement;
    const min = document.querySelector(".minute") as HTMLInputElement;
    const sec = document.querySelector(".sec") as HTMLInputElement;
    const startBtn = document.querySelector(".start") as HTMLButtonElement;
    const stopBtn = document.querySelector(".stop") as HTMLButtonElement;
    const resetBtn = document.querySelector(".reset") as HTMLButtonElement;

    let countdownTimer: number | null = null;

    startBtn.addEventListener("click", function () {
        if (parseInt(hour.value) === 0 && parseInt(min.value) === 0 && parseInt(sec.value) === 0) return;

        function startInterval() {
            startBtn.style.display = "none";
            stopBtn.style.display = "initial";

            countdownTimer = window.setInterval(function () {
                timer();
            }, 1000);
        }
        startInterval();
    });

    function timer() {
        if (parseInt(sec.value) > 60) {
            min.value = (parseInt(min.value) + 1).toString();
            sec.value = (parseInt(sec.value) - 59).toString();
        }

        if (parseInt(min.value) > 60) {
            hour.value = (parseInt(hour.value) + 1).toString();
            min.value = (parseInt(min.value) - 60).toString();
        }

        min.value = parseInt(min.value) > 60 ? "60" : min.value;

        if (parseInt(hour.value) === 0 && parseInt(min.value) === 0 && parseInt(sec.value) === 0) {
            hour.value = "";
            min.value = "";
            sec.value = "";
            stopInterval();
        } else if (parseInt(sec.value) !== 0) {
            sec.value = ${parseInt(sec.value) <= 10 ? "0" : ""}${parseInt(sec.value) - 1};
        } else if (parseInt(min.value) !== 0 && parseInt(sec.value) === 0) {
            sec.value = "59";
            min.value = ${parseInt(min.value) <= 10 ? "0" : ""}${parseInt(min.value) - 1};
        } else if (parseInt(hour.value) !== 0 && parseInt(min.value) === 0) {
            min.value = "60";
            hour.value = ${parseInt(hour.value) <= 10 ? "0" : ""}${parseInt(hour.value) - 1};
        }
    }

    function stopInterval(state?: string) {
        startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

        stopBtn.style.display = "none";
        startBtn.style.display = "initial";

        if (countdownTimer !== null) {
            clearInterval(countdownTimer);
            countdownTimer = null;
        }
    }

    stopBtn.addEventListener("click", function () {
        stopInterval("pause");
    });

    resetBtn.addEventListener("click", function () {
        hour.value = "";
        min.value = "";
        sec.value = "";
        stopInterval();
    });
})();
