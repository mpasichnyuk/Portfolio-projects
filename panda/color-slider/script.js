// я начал серьезно изучать фронтенд полгода назад, и тогда все говорили что учить Jquery уже нет смысла, поэтому я уделал ему немного внимания.И поэтому я выполнил ваше задание на чистом ванильном JavaScript. Не знаю хорошо это или плохо)

const changeBgColor = () => {
    let red = document.getElementById("rangeRed").value;
    let green = document.getElementById("rangeGreen").value;
    let blue = document.getElementById("rangeBlue").value;
    let color = "rgb(" + red + "," + green + "," + blue + ")";
    // document.body.style.backgroundColor = color;
    document.querySelector(".main-text").style.backgroundColor = color;
    document.querySelector(".btn_bg_color").style.backgroundColor = color;

    document.getElementById("backgroundColor").innerHTML =
        "Текущий цвет фона: " + color;
};

const changeTextColor = () => {
    let red = document.getElementById("rangeRed").value;
    let green = document.getElementById("rangeGreen").value;
    let blue = document.getElementById("rangeBlue").value;
    let color = "rgb(" + red + "," + green + "," + blue + ")";
    // document.body.style.backgroundColor = color;
    document.querySelector(".main-text").style.color = color;
    document.querySelector(".btn_text_color").style.backgroundColor = color;
    document.getElementById("textColor").innerHTML =
        "Текущий цвет текста: " + color;
};

const activeTextColor = () => {
    document.querySelector(".btn_text_color").style.borderColor = "#FF0000";
    document.querySelector(".btn_bg_color").style.borderColor = "#FFFFFF";

    document
        .getElementById("rangeRed")
        .removeEventListener("input", changeBgColor);
    document
        .getElementById("rangeGreen")
        .removeEventListener("input", changeBgColor);
    document
        .getElementById("rangeBlue")
        .removeEventListener("input", changeBgColor);

    document
        .getElementById("rangeRed")
        .addEventListener("input", changeTextColor);
    document
        .getElementById("rangeGreen")
        .addEventListener("input", changeTextColor);
    document
        .getElementById("rangeBlue")
        .addEventListener("input", changeTextColor);
};

const activeBgColor = () => {
    document.querySelector(".btn_bg_color").style.borderColor = "#FF0000";
    document.querySelector(".btn_text_color").style.borderColor = "#FFFFFF";

    document
        .getElementById("rangeRed")
        .removeEventListener("input", changeTextColor);
    document
        .getElementById("rangeGreen")
        .removeEventListener("input", changeTextColor);
    document
        .getElementById("rangeBlue")
        .removeEventListener("input", changeTextColor);

    document
        .getElementById("rangeRed")
        .addEventListener("input", changeBgColor);
    document
        .getElementById("rangeGreen")
        .addEventListener("input", changeBgColor);
    document
        .getElementById("rangeBlue")
        .addEventListener("input", changeBgColor);
};

// document.getElementById("rangeRed").addEventListener("input", changeBgColor);
// document.getElementById("rangeGreen").addEventListener("input", changeBgColor);
// document.getElementById("rangeBlue").addEventListener("input", changeBgColor);

document
    .getElementById("btn_text_color")
    .addEventListener("click", activeTextColor);
document
    .getElementById("btn_bg_color")
    .addEventListener("click", activeBgColor);

document.getElementById("rangeRed").addEventListener("input", changeBgColor);
document.getElementById("rangeGreen").addEventListener("input", changeBgColor);
document.getElementById("rangeBlue").addEventListener("input", changeBgColor);
document.querySelector(".btn_text_color").style.borderColor = "#FFFFFF";
document.querySelector(".btn_bg_color").style.borderColor = "#FFFFFF";
