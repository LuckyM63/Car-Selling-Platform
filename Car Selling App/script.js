// JavaScript for the image slider
let currentSlide = 0;

function changeSlide(n) {
  showSlide((currentSlide += n));
}

function showSlide(n) {
  const slides = document.getElementById("slides");
  const allSlides = document.getElementsByClassName("slide");

  if (n >= allSlides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = allSlides.length - 1;
  } else {
    currentSlide = n;
  }

  slides.style.transform = `translateX(${-currentSlide * 100}%)`;
}


function showPage(pageId) {
    // Hide all sections
    document.getElementById('slider').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('login').style.display = 'none';

    // Show the selected section
    if (pageId === 'slider') {
        document.getElementById('slider').style.display = 'block';
    } else {
        document.getElementById(pageId).style.display = 'block';
    }
}

// You may want to call showPage with the default section to display
document.addEventListener('DOMContentLoaded', function () {
    showPage('slider');  // Show the slider by default
});

// Update the navigation links to prevent the default behavior and handle the click
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('nav a');
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent the default behavior of the link
            var pageId = this.getAttribute('href').substring(1);  // Get the target page id
            showPage(pageId);  // Show the selected section
        });
    });
});


function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
        alert(data.message);
        // Redirect or perform other actions on successful login
    } else {
        alert(data.message);
    }
}

async function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
        alert(data.message);
        // Redirect or perform other actions on successful signup
    } else {
        alert(data.message);
    }
}
