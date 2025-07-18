let captchaText = document.getElementById('captcha');
let ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.getElementById('textBox');
let submitButton = document.getElementById('submitButton');
let output = document.getElementById('output');
let refreshButton = document.getElementById('refreshButton');

let alphaNums = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p',
    'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9'
];

let c = "";

function generateCaptcha() {
    userText.value = "";
    output.innerHTML = "";
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);

    let captchaArray = [];
    for (let i = 0; i < 7; i++) {
        captchaArray.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }

    c = captchaArray.join('');
    ctx.fillText(c, captchaText.width / 4, captchaText.height / 2);

    // Add random lines
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * captchaText.width, Math.random() * captchaText.height);
        ctx.lineTo(Math.random() * captchaText.width, Math.random() * captchaText.height);
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Add random dots
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * captchaText.width, Math.random() * captchaText.height, 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial CAPTCHA render
generateCaptcha();

// Event: Press Enter
userText.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        checkCaptcha();
    }
});

// Event: Submit
submitButton.addEventListener('click', function () {
    checkCaptcha();
});

// Event: Refresh
refreshButton.addEventListener('click', function () {
    generateCaptcha();
});

// Function to validate CAPTCHA
function checkCaptcha() {
    if (userText.value === c) {
        output.classList.remove("incorrectCaptcha");
        output.classList.add("correctCaptcha");
        output.innerHTML = "✅ Correct!";
    } else {
        output.classList.remove("correctCaptcha");
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "❌ Incorrect, please try again!";
    }
}
