console.log("Welcome to Notes making app");
showNotes();
let btn = document.getElementById("addBtn");
btn.addEventListener('click', function() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    console.log(day, month, year);
    let title = document.getElementById("addTitle");
    let noteContent = document.getElementById("addNotes");
    if (title.value == "" || noteContent.value == "") {
        alert("You cannot have notes without having either title or content!!");
    } else {
        let existingNotes = localStorage.getItem("existingNotes");
        if (existingNotes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(existingNotes);
        }
        let varObj = {
            day,
            month,
            year,
            title: title.value,
            note: noteContent.value
        };
        notesObj.push(varObj);
        localStorage.setItem("existingNotes", JSON.stringify(notesObj));
        title.value = "";
        noteContent.value = "";
        showNotes();
    }
});
// Function to show notes :)
function showNotes() {
    let existingNotes = localStorage.getItem("existingNotes");
    if (existingNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(existingNotes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 my-2">
                <div class="card crd cardBox>
                    <div class="card-body">
                    <div id="${index}">
                        <h5 class="card-title p-1">${element.title}<span class="lead p-2">${element.day}/${element.month}/${element.year}</span></h5>
                        <p class="card-text p-1">${element.note}</p>
                        </div>
                        <hr class ="mx-2">
                       <div class="row my-2 mx-2">
                         <svg width="2em" height="2em" viewBox="0 0 16 16" id="${index}" onclick="deleteNotes(this.id)" class="bi bi-trash-fill btn-outline-danger " data-toggle="tooltip" data-placement="top" title="Delete" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1 H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                             </svg> 
                             <div class= "border border-dark mx-4">
                             <svg width="2em" height="2em" viewBox="0 0 16 16" id="${index}" onclick="speakNotes(this.id)" class="bi bi-play-fill" data-toggle="tooltip" data-placement="top" title="Play"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                             <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                           </svg>
                        <svg width="2em" height="2em" viewBox="0 0 16 16" onclick="toggle(false)" class="bi bi-pause-fill" data-toggle="tooltip" data-placement="top" title="Pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>    </div> 
<svg width="2em" height="2em" viewBox="0 0 16 16" id="${index}" class="bi bi-arrow-down-square-fill mx-2 " onclick="printNotes(this.id)" data-toggle="tooltip" data-placement="top" title="Print" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>                          
                            </div>
                    </div>
                </div>
            </div>
     `;
    });
    let display = document.getElementById('notesDisplay');
    if (notesObj.length != 0) {
        display.innerHTML = html;
    } else {
        display.innerHTML = `<b>You have not created any notes.<br>Create One</b>`;
    }
}
// Function to delete notes.
function deleteNotes(index) {
    let existingNotes = localStorage.getItem("existingNotes");
    if (existingNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(existingNotes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("existingNotes", JSON.stringify(notesObj));
    showNotes();

}
// search 
let searchtxt = document.getElementById('searchtxt'); // grap search box
searchtxt.addEventListener('input', function() { //add inpult event on it
    let inputvalue = searchtxt.value.toLowerCase(); // lowercase is used to conver the inputtext into lower case (if user inputs in Upper case) that helps in search the notes
    let notecard = document.getElementsByClassName('crd'); // grab crd class element
    Array.from(notecard).forEach(function(element) { // makeing an array from note card 
        let cardtxt = element.getElementsByTagName("p")[0];
        cardtxt = cardtxt.innerText.toLowerCase();
        if (cardtxt.includes(inputvalue.toLowerCase())) {
            element.style.display = "block"; // block is used to show the content
        } else {
            element.style.display = "none"; // none is used to not show content
        }
    });
});
const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
//  Funtion to extract voices from system.
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}
// Function to Listen notes.
function speakNotes(index) {
    let existingNotes = localStorage.getItem("existingNotes");
    if (existingNotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(existingNotes);
    }
    msg.text = notesObj[index].note;
    console.log(msg.text);
    toggle();
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
// Function to print Notes. Windows Variable is used.
function printNotes(index) {
    var divContents = document.getElementById(index).innerHTML;
    var a = window.open('', '', 'height=900, width=800');
    a.document.write('<html>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}
