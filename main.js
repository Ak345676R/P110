
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera = document.getElementById("camera")
Webcam.attach("#camera")
function takesnapshot() {
    Webcam.snap(function(dataUri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+dataUri+"'>"
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6PEwx4yzt/model.json", modelLoaded)
function modelLoaded() {
    console.log("Model Loaded!")
}
function check() {
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if(error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_object_name").innerHTML = results[0].label
        gesture = results[0].label
        toSpeak = ""
        if(gesture == "Best") {
            toSpeak = "Best"
            document.getElementById("result_gesture_icon").innerHTML = "&#128077;"
        } else if(gesture == "Amazing") {
            toSpeak = "Amazing"
            document.getElementById("result_gesture_icon").innerHTML = "&#128076;"
        } else if (gesture == "L") {
            toSpeak = "L"
            document.getElementById("result_gesture_icon").innerHTML = "&#128078;"
        }
        speak()
    }
}
function speak() {
    var synth = window.speechSynthesis
    speakdata = toSpeak
    var utterThis = new SpeechSynthesisUtterance(speakdata)
    synth.speak(utterThis)
}