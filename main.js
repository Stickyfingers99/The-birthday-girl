
'use strict';

import './style.css';

// Reveal the page after the stylesheet has loaded.
document.body.style.visibility = 'visible';

// Intro elements
const intro = document.querySelector('.bounce');
const rollText = document.querySelector('.roll-text');
const rollingWords = document.querySelectorAll('.roll-text span');
const readyText = document.querySelector('.ready-text');
const startButton = document.querySelector('.please');

// Birthday reveal elements
const spaceBackground = document.querySelector('#space-background');
const birthdaySong = document.querySelector('#birthday-song');
const countdownText = document.querySelector('#countdown');
const letterRain = document.querySelector('#letter-rain');
const birthdayMessage = document.querySelector('#birthday-message');
const birthdayTitle = document.querySelector('#birthday-title');
const balloonRain = document.querySelector('#balloon-rain');

// Page sections
const experience = document.querySelector('#experience');
const scrapbook = document.querySelector('#scrapbook');
const flipbookSection = document.querySelector('#flipbook-section');

// Flipbook elements
const openBookButton = document.querySelector('#open-book');
const bookCover = document.querySelector('#book-cover');
const startBookButton = document.querySelector('#start-book');
const bookPage = document.querySelector('#book-page');
const pageNumber = document.querySelector('#page-number');
const pageHeading = document.querySelector('#page-heading');
const pageDescription = document.querySelector('#page-description');
const pageCounter = document.querySelector('#page-counter');
const previousPageButton = document.querySelector('#previous-page');
const nextPageButton = document.querySelector('#next-page');
const bookControls = document.querySelector('#book-controls');
const bookEnding = document.querySelector('#book-ending');
const backToLetterButton = document.querySelector('#back-to-letter');

const wait = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

// Keep the background video stopped until the visitor starts the reveal.
spaceBackground.pause();
spaceBackground.classList.remove('active');

// Countdown sound
let audioContext;

async function prepareAudio() {
    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    audioContext ??= new AudioContextClass();

    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }
}

function playTick(isFinal = false) {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.value = isFinal ? 660 : 880;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.26);
}

// Intro sequence
setTimeout(() => {
    intro.classList.add('hidden');
}, 8000);

setTimeout(() => {
    rollText.classList.remove('hidden');

    for (const [index, word] of rollingWords.entries()) {
        word.style.animationDelay = `${(index + 1) * 150}ms`;
        word.classList.add('roll-in');
    }
}, 8100);

setTimeout(() => {
    rollText.classList.add('hidden');
    readyText.classList.remove('hidden');
}, 13300);

setTimeout(() => {
    startButton.classList.remove('hidden');
}, 15000);

// Falling letters for the birthday reveal
async function showLetterRain() {
    letterRain.innerHTML = '';
    letterRain.classList.remove('hidden');

    const letters = 'HAPPYBIRTHDAYTOYOU';
    const totalLetters = 240;

    for (let i = 0; i < totalLetters; i++) {
        const letter = document.createElement('span');

        letter.textContent =
            letters[Math.floor(Math.random() * letters.length)];

        letter.className = 'falling-letter';
        letter.style.left = `${Math.random() * 100}%`;
        letter.style.animationDelay = `${Math.random() * 1.2}s`;
        letter.style.animationDuration =
            `${1.8 + Math.random() * 1.7}s`;
        letter.style.fontSize =
            `${1.1 + Math.random() * 1.8}rem`;

        letterRain.appendChild(letter);
    }

    await wait(3600);

    letterRain.classList.add('hidden');
    letterRain.innerHTML = '';
}

// Display only HAPPY BIRTHDAY
function showBirthdayTitle() {
    birthdayTitle.innerHTML = '';

    for (const [wordIndex, word] of ['HAPPY', 'BIRTHDAY'].entries()) {
        const wordContainer = document.createElement('span');
        wordContainer.className = 'birthday-word';

        for (const [letterIndex, character] of [...word].entries()) {
            const letter = document.createElement('span');

            letter.textContent = character;
            letter.className = 'flip-letter';
            letter.style.animationDelay =
                `${(wordIndex * 8 + letterIndex) * 100}ms`;

            wordContainer.appendChild(letter);
        }

        birthdayTitle.appendChild(wordContainer);
    }

    birthdayMessage.classList.remove('hidden');
}

// Realistic glossy balloons with individual colours and drifting paths
async function showBalloons() {
    balloonRain.innerHTML = '';
    balloonRain.classList.remove('hidden');

    const colours = [
        { color: '#f472b6', shadow: '#9d174d', highlight: '#fbcfe8' },
        { color: '#a78bfa', shadow: '#5b21b6', highlight: '#ede9fe' },
        { color: '#60a5fa', shadow: '#1e40af', highlight: '#dbeafe' },
        { color: '#facc15', shadow: '#a16207', highlight: '#fef9c3' },
        { color: '#34d399', shadow: '#065f46', highlight: '#d1fae5' },
        { color: '#fb923c', shadow: '#9a3412', highlight: '#ffedd5' },
        { color: '#f87171', shadow: '#991b1b', highlight: '#fee2e2' },
        { color: '#e879f9', shadow: '#86198f', highlight: '#fae8ff' }
    ];

    const totalBalloons = 55;

    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement('span');
        const palette =
            colours[Math.floor(Math.random() * colours.length)];

        const width = 26 + Math.random() * 25;
        const height = width * (1.2 + Math.random() * 0.2);
        const drift = Math.random() * 100 - 50;

        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;

        balloon.style.setProperty('--balloon-color', palette.color);
        balloon.style.setProperty('--balloon-shadow', palette.shadow);
        balloon.style.setProperty('--balloon-highlight', palette.highlight);
        balloon.style.setProperty('--balloon-width', `${width}px`);
        balloon.style.setProperty('--balloon-height', `${height}px`);
        balloon.style.setProperty('--drift', `${drift}px`);
        balloon.style.setProperty('--drift-back', `${drift * -0.55}px`);
        balloon.style.setProperty(
            '--string-length',
            `${35 + Math.random() * 40}px`
        );

        balloon.style.animationDuration =
            `${3.5 + Math.random() * 1.5}s`;
        balloon.style.animationDelay =
            `${Math.random() * 0.5}s`;

        balloonRain.appendChild(balloon);
    }

    // Keep the balloon effect on screen for five seconds.
    await wait(5000);

    balloonRain.classList.add('hidden');
    balloonRain.innerHTML = '';
}

// Birthday experience
let hasStarted = false;

startButton.addEventListener('click', async () => {
    if (hasStarted) return;

    hasStarted = true;
    startButton.classList.add('hidden');
    readyText.classList.add('hidden');

    try {
        await prepareAudio();

        spaceBackground.pause();
        spaceBackground.currentTime = 0;

        try {
            await spaceBackground.play();
            spaceBackground.classList.add('active');
        } catch (error) {
            console.warn('The background video could not play:', error);
        }

        await wait(500);

        // Ten-second countdown: 10 down to 1, then 0.
        for (let number = 10; number >= 1; number--) {
            countdownText.textContent = String(number);
            countdownText.classList.remove('hidden', 'countdown-pop');

            void countdownText.offsetWidth;
            countdownText.classList.add('countdown-pop');

            playTick();
            await wait(1000);
        }

        countdownText.textContent = '0';
        countdownText.classList.remove('countdown-pop');

        void countdownText.offsetWidth;
        countdownText.classList.add('countdown-pop');

        playTick(true);
        await wait(500);
        countdownText.classList.add('hidden');

        // Start the birthday recording.
        try {
            birthdaySong.currentTime = 0;
            await birthdaySong.play();
        } catch (error) {
            console.error(
                'The birthday recording could not play. Check public/happy-birthday.mp3.',
                error
            );
        }

        await showLetterRain();
        showBirthdayTitle();

        // Keep the title visible while the balloons appear.
        await showBalloons();

        experience.classList.add('hidden');
        scrapbook.classList.remove('hidden');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Birthday experience error:', error);
    }
});

// The 22 things. You can personalise these later.
const thingsILike = [
    {
        title: 'Your smile',
        text: 'It has a way of making an ordinary moment feel brighter.'
    },
    {
        title: 'Your laugh',
        text: 'I love those moments when you laugh freely and forget everything else.'
    },
    {
        title: 'Your kindness',
        text: 'The care you show people says a lot about the person you are.'
    },
    {
        title: 'Your personality',
        text: 'There is something unmistakably you about the way you carry yourself.'
    },
    {
        title: 'Your sense of humour',
        text: 'You know how to make a moment lighter and more enjoyable.'
    },
    {
        title: 'Your beautiful heart',
        text: 'I appreciate the softness and care behind the person everyone sees.'
    },
    {
        title: 'Your confidence',
        text: 'I like seeing you own who you are and take up your space.'
    },
    {
        title: 'Your little quirks',
        text: 'The little things that make you different are part of your charm.'
    },
    {
        title: 'Your honesty',
        text: 'I value being able to appreciate the real person you are.'
    },
    {
        title: 'Your energy',
        text: 'You bring your own feeling into a room and into a conversation.'
    },
    {
        title: 'Your determination',
        text: 'I admire that you keep moving towards the things that matter to you.'
    },
    {
        title: 'Your creativity',
        text: 'I like the way you bring your own ideas and perspective to things.'
    },
    {
        title: 'Your thoughtfulness',
        text: 'The little things you notice and remember can mean a lot.'
    },
    {
        title: 'Your strength',
        text: 'I admire you for continuing even when things are not easy.'
    },
    {
        title: 'Your individuality',
        text: 'You have your own way of being, and that is something worth celebrating.'
    },
    {
        title: 'Your warmth',
        text: 'You can make the people around you feel welcome and appreciated.'
    },
    {
        title: 'Your ambition',
        text: 'I like that you have dreams and things you want to make happen.'
    },
    {
        title: 'Your expressiveness',
        text: 'Your reactions, stories, and little expressions make time with you memorable.'
    },
    {
        title: 'Your loyalty',
        text: 'I appreciate the way you value the people who matter to you.'
    },
    {
        title: 'Your perspective',
        text: 'You bring your own point of view, and I enjoy seeing the world through it.'
    },
    {
        title: 'The memories we share',
        text: 'I am glad we have moments that we can look back on and smile about.'
    },
    {
        title: 'Simply being you',
        text: 'You do not need to be anyone else to be someone worth celebrating.'
    }
];

let currentPage = 0;

function renderPage(index) {
    currentPage = Math.max(
        0,
        Math.min(index, thingsILike.length - 1)
    );

    const item = thingsILike[currentPage];

    pageNumber.textContent =
        `${String(currentPage + 1).padStart(2, '0')} / 22`;
    pageCounter.textContent = `${currentPage + 1} of 22`;
    pageHeading.textContent = item.title;
    pageDescription.textContent = item.text;

    bookPage.classList.remove('turning');
    void bookPage.offsetWidth;
    bookPage.classList.add('turning');

    previousPageButton.disabled = currentPage === 0;

    const isLastPage = currentPage === thingsILike.length - 1;

    nextPageButton.textContent = isLastPage
        ? 'Finish ♡'
        : 'Next page →';

    bookEnding.classList.toggle('hidden', !isLastPage);
}

function openFlipbook() {
    scrapbook.classList.add('hidden');
    flipbookSection.classList.remove('hidden');

    bookCover.classList.remove('hidden');
    bookPage.classList.add('hidden');
    bookControls.classList.add('hidden');
    bookEnding.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

openBookButton.addEventListener('click', openFlipbook);

startBookButton.addEventListener('click', () => {
    bookCover.classList.add('hidden');
    bookPage.classList.remove('hidden');
    bookControls.classList.remove('hidden');

    renderPage(0);
});

previousPageButton.addEventListener('click', () => {
    if (currentPage > 0) {
        renderPage(currentPage - 1);
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < thingsILike.length - 1) {
        renderPage(currentPage + 1);
    } else {
        bookEnding.classList.remove('hidden');
    }
});

backToLetterButton.addEventListener('click', () => {
    flipbookSection.classList.add('hidden');
    scrapbook.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
});
