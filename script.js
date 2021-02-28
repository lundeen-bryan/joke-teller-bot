const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to voice RSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'e87a2fcc57c94a23bcc2a1b444593ff7',
    src: joke,
    hl: 'en-us',
  });
}

//Get jokes from joke api
async function getJokes() {
  let joke = '';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // catch errors
    console.log('Whoops', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
