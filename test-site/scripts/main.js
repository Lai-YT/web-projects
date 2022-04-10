
var myImage = document.querySelector('img');

/**
 * @brief Switches the image src when the image is clicked.
 */
myImage.onclick = function() {
  let mySrc = myImage.getAttribute('src');
  if (mySrc === 'images/firefox-logo.png') {
    mySrc = 'images/firefox-nightly-logo.png';
  } else {
    mySrc = 'images/firefox-logo.png';
  }
  myImage.setAttribute('src', mySrc);
}


if (!sessionStorage.getItem('name')) {
  setUserName();
}
showUserName();

var myButton = document.querySelector('button');

myButton.onclick = function() {
  setUserName();
  showUserName();
};

/**
 * @brief Shows a prompt for user to enter his/her name.
 *
 * The prompt is non-cancellable and only non-empty names are allowed.
 */
function setUserName() {
  let myName = prompt('Please enter your name.');

  /* the user must enter a non-empty name */
  if (myName === null || !myName) {
    setUserName();
  }
  /* API call */
  sessionStorage.setItem('name', myName);
}

/**
 * @brief Shows the user's name to the h1 header.
 *
 * Make sure the user's name has been set, otherwise exception may be raised.
 */
function showUserName() {
  let myHeading = document.querySelector('h1');
  myHeading.innerHTML = 'Mozilla is cool, ' + sessionStorage.getItem('name');
}
