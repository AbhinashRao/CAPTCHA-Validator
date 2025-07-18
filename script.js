let captchaText = document.getElementById('captcha');
let ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.getElementById('textBox');
let submitButton = document.getElementById('submitButton');
let output = document.getElementById('output');
let refreshButton = document.getElementById('refreshButton');

let alphaNums = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U',
    'V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
    'q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'
];

let c = "";

function generateCaptcha() {
    userText.value = "";
    output.innerHTML = "";
    output.classList.remove("correctCaptcha", "incorrectCaptcha");

    ctx.clearRect(0, 0, captchaText.width, captchaText.height);

    let captchaArray = [];
    for (let i = 0; i < 7; i++) {
        captchaArray.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }

    c = captchaArray.join('');
    ctx.fillText(c, captchaText.width / 4, captchaText.height / 2);
}

// Initial CAPTCHA
generateCaptcha();

// Validate on Enter
userText.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        validateCaptcha();
    }
});

// Validate on Submit
submitButton.addEventListener('click', function () {
    validateCaptcha();
});

// Refresh CAPTCHA
refreshButton.addEventListener('click', function () {
    generateCaptcha();
});

function validateCaptcha() {
    output.classList.remove("correctCaptcha", "incorrectCaptcha");
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        output.innerHTML = "Correct!";
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect, please try again!";
    }
}
