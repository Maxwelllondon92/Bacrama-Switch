// Global Variables
var play = false
var audio = true
var bpm = 60
var bpmMax = 60
var interval = 1000
var flashMode = document.getElementById('flash').checked
var rangeMode = document.getElementById('range').checked
var target = document.getElementById('target')
// Default Settings
document.getElementById('bpmIndicator').value = bpm;
document.getElementById('bpmIndicatorMax').value = bpmMax;
if (rangeMode) {
    document.getElementById('bpmIndicatorMax').style.setProperty('display', 'inline-block')
} else {
    document.getElementById('bpmIndicatorMax').style.setProperty('display', 'none')
}
// Event Listeners
document.getElementById('play').addEventListener("click", start)
document.getElementById('stop').addEventListener("click", stop)
document.getElementById('audio-on').addEventListener("click", audioOff)
document.getElementById('audio-off').addEventListener("click", audioOn)
document.getElementById('settingsBtn').addEventListener("click", showSettings)
document.getElementById('settingsCloseBtn').addEventListener("click", hideSettings)
document.getElementById('bpmIndicator').addEventListener("blur", bpmChange)
document.getElementById('bpmIndicatorMax').addEventListener("blur", bpmChange)
document.getElementById('flash').addEventListener("change", changeFlashMode)
document.getElementById('range').addEventListener("change", changeRangeMode)
// Functions
function change() {
    // Funzione che cambia il colore mostrato in base al rng
    if (play) {
        let color
        let colorRNG = Math.round(Math.random() * 100)
        let timeRNG = Math.random()
        let randomBPM = bpm + (timeRNG * bpmMax) - (timeRNG * bpm)
        
        interval = (60 / randomBPM) * 1000
        audio ? playAudio() : void (0);
        colorRNG < 50 ? color = 'red' : color = 'white'
        target.style.setProperty('background-image', `url(assets/${color}.png)`)

        if (flashMode) {
            setTimeout(() => { target.style.setProperty('background-image', `url(assets/grey.png)`) }, interval / 2)
        }
        setTimeout(() => { change() }, interval)
    }
}
function start() {
    // Avvia il ciclo della funzione change()
    if (play == false) {
        setTimeout(() => { change() }, interval)
        document.getElementById('stop').style.setProperty('display', 'inline-block')
        document.getElementById('play').style.setProperty('display', 'none')
        play = true
    }
}
function stop() {
    // Arresta il ciclo della funzione change()
    play = false
    target.style.setProperty('background-image', `url(assets/grey.png)`)
    document.getElementById('play').style.setProperty('display', 'inline-block')
    document.getElementById('stop').style.setProperty('display', 'none')
}
function bpmChange() {
    // Modifica la frequenza minima con cui la funzione change() si esegue
    bpm = Number(document.getElementById('bpmIndicator').value);
    bpmMax = Number(document.getElementById('bpmIndicatorMax').value);
    if (bpm>bpmMax||!rangeMode) {
        document.getElementById('bpmIndicatorMax').value = bpm
        bpmMax=bpm
    }
}
function changeFlashMode() {
    // Attiva o disattiva la modalità flash
    flashMode = !flashMode
}
function changeRangeMode() {
    // Attiva o disattiva la modalità range
    rangeMode = !rangeMode
    if (rangeMode) {
        document.getElementById('bpmIndicatorMax').style.setProperty('display', 'inline-block')
    } else {
        document.getElementById('bpmIndicatorMax').value = bpm
        document.getElementById('bpmIndicatorMax').style.setProperty('display', 'none')
    }
}
function playAudio() {
    // Riproduce il suono metronomo
    let audio = new Audio('assets/click.mp3');
    audio.play();
}
function audioOn() {
    // Attiva la riproduzione del suono metronomo
    audio = true
    document.getElementById('audio-on').style.setProperty('display', 'inline-block')
    document.getElementById('audio-off').style.setProperty('display', 'none')
}
function audioOff() {
    // Arresta la riproduzione del suono metronomo
    audio = false
    document.getElementById('audio-on').style.setProperty('display', 'none')
    document.getElementById('audio-off').style.setProperty('display', 'inline-block')
}
function showSettings() {
    // mostra il pannello impostazioni
    stop()
    document.getElementById('settings').style.setProperty('display', 'flex')
}
function hideSettings() {
    // nasconde il pannello impostazioni
    document.getElementById('settings').style.setProperty('display', 'none')
}