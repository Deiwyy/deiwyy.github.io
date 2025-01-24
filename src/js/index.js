
import SamJs from 'sam-js';
import $ from 'jquery';

let selectedVoice = 0;

let samSpeakingPromise = null;

const voices = [
    { name: "SAM", speed: 72, pitch: 64, throat: 128, mouth: 128 },
    { name: "Elf", speed: 72, pitch: 64, throat: 110, mouth: 160 },
    { name: "Little Robot", speed: 92, pitch: 60, throat: 190, mouth: 190 },
    { name: "Stuffy Guy", speed: 82, pitch: 72, throat: 110, mouth: 105 },
    { name: "Little Old Lady", speed: 82, pitch: 32, throat: 145, mouth: 145 },
    { name: "Extra-Terrestrial", speed: 100, pitch: 64, throat: 150, mouth: 200 },
];


function createSam(settings = null, preset = null) {
    if (!settings && !preset) {
        return new SamJs({ pitch: 72, speed: 64, throat: 128, mouth: 128 });
    } else if (settings) {
        return new SamJs(settings);
    } else if (preset) {
        return new SamJs(voices[preset]);
    }
}

function loadVoiceOptions() {
    
    const $voiceSelect = $("#voices-select");
    
    voices.forEach(function(voice, index) {
        const $option = $(`<option value="${index}">${voice.name}</option>`);
        $voiceSelect.append($option);
    });
}

$("#voices-select").on('change', function() {
    selectedVoice = $(this).val();
});

$("#speak-button").on("click", function() {
    if (samSpeakingPromise) {
        samSpeakingPromise.abort();
    }
    const sam = createSam(null, selectedVoice);
    samSpeakingPromise = sam.speak($("#text").val());
    samSpeakingPromise.then(function() {samSpeakingPromise = null;});

});


loadVoiceOptions();

