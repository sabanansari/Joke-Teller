
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button

function toggleButton(){
    button.disabled = !button.disabled;
}

function tellMe(joke){
    VoiceRSS.speech({
        key: API_KEY,
        src: `${joke}`,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// test();

// Get Jokes from Joke API

async function getJokes(){

    let joke = '';

    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        const data = await response.json();

        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }

        tellMe(joke);

        // Disable Button
        toggleButton();
        
    } catch (error) {
        console.log(error);
    }
}

// Event Listener for tell me joke button

button.addEventListener('click',getJokes);

audioElement.addEventListener('ended',toggleButton);