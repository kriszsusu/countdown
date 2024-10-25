const monthsElement = document.getElementById('months');
const weeksElement = document.getElementById('weeks');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const titleElement = document.getElementById('title');

const breaksData = [
    { name: "őszi", month: 9, day: 25 },    // október 25 
    { name: "téli", month: 11, day: 20 },   // december 20
    { name: "tavaszi", month: 3, day: 16 }, // április 16
    { name: "nyári", month: 5, day: 13 }    // június 13
];

function getNextBreak() {
    const now = new Date();
    const currentYear = now.getFullYear();

    const upcomingBreaks = breaksData.map(breakInfo => {
        let breakDate = new Date(currentYear, breakInfo.month, breakInfo.day);
        if (breakDate < now) {
            breakDate = new Date(currentYear + 1, breakInfo.month, breakInfo.day);
        }
        return { name: breakInfo.name, date: breakDate };
    });

    upcomingBreaks.sort((a, b) => a.date - b.date);
    return upcomingBreaks[0];
}

const nextBreak = getNextBreak();
titleElement.innerText = `${String(nextBreak.name).charAt(0).toUpperCase() + String(nextBreak.name).slice(1)} szünetig hátralevő idő`;

if (nextBreak.name == "téli") document.querySelector(".snowflakes").style.display = "block";

const images = {
    "őszi": [
        "autumn/image1.jpg", "autumn/image2.jpg", "autumn/image3.jpg",
        "autumn/image4.jpg", "autumn/image5.jpg", "autumn/image6.jpg",
        "autumn/image7.jpg", "autumn/image8.jpg", "autumn/image9.jpg",
        "autumn/image10.jpg"
    ],
    "téli": [    
        "winter/image1.jpg", "winter/image2.jpg", "winter/image3.jpg",
        "winter/image4.jpg", "winter/image5.jpg", "winter/image6.jpg",
        "winter/image7.jpg", "winter/image8.jpg", "winter/image9.jpg",
        "winter/image10.jpg"
    ],
    "tavaszi": [
        "spring/image1.jpg", "spring/image2.jpg", "spring/image3.jpg",
        "spring/image4.jpg", "spring/image5.jpg", "spring/image6.jpg",
        "spring/image7.jpg", "spring/image8.jpg", "spring/image9.jpg",
        "spring/image10.jpg"
    ],
    "nyári": [
        "summer/image1.jpg", "summer/image2.jpg", "summer/image3.jpg",
        "summer/image4.jpg", "summer/image5.jpg", "summer/image6.jpg",
        "summer/image7.jpg", "summer/image8.jpg", "summer/image9.jpg",
        "summer/image10.jpg"
    ]
};

const seasonImages = images[nextBreak.name];
const randomImage = seasonImages[Math.floor(Math.random() * seasonImages.length)];

document.querySelector(".background").style.backgroundImage = `url(https://susu.liba.lol/countdown/backgrounds/${randomImage})`;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = nextBreak.date.getTime() - now;

    const totalSeconds = Math.floor(distance / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInWeek = 604800;
    const secondsInMonth = 2629746;

    const months = Math.floor(totalSeconds / secondsInMonth);
    const weeks = Math.floor((totalSeconds % secondsInMonth) / secondsInWeek);
    const days = Math.floor((totalSeconds % secondsInWeek) / secondsInDay);
    const hours = Math.floor((totalSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);
    const seconds = Math.floor(totalSeconds % secondsInMinute);

    monthsElement.innerText = months.toString().padStart(2, '0');
    monthsElement.style.display = months > 0 ? "inline" : "none";

    weeksElement.innerText = weeks.toString().padStart(2, '0');
    weeksElement.style.display = (weeks > 0 || months > 0) ? "inline" : "none";

    daysElement.innerText = days.toString().padStart(2, '0');
    daysElement.style.display = (days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    hoursElement.innerText = hours.toString().padStart(2, '0');
    hoursElement.style.display = (hours > 0 || days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    minutesElement.innerText = minutes.toString().padStart(2, '0');
    minutesElement.style.display = (minutes > 0 || hours > 0 || days > 0 || weeks > 0 || months > 0) ? "inline" : "none";

    secondsElement.innerText = seconds.toString().padStart(2, '0');

    if (distance <= 0) {
        document.querySelector('.countdown').innerHTML = `
        <div class="time">
            <span id="seconds">🎉</span>
            <span class="label">${String(nextBreak.name).charAt(0).toUpperCase() + String(nextBreak.name).slice(1)} szünet van!</span>
        </div>
        `;
        clearInterval(countdownInterval);
        return;
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
