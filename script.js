const form = document.getElementById('newsletter-form');
const name = document.getElementById('nameInput');
const email = document.getElementById('emailInput');
const newsletterButton = document.querySelector('.newsletter-button');
const wrapperDiv = document.querySelector('.wrapper');
const body = document.querySelector('.body');
const subscribedNote = document.querySelector('.subscribednote');
const subscribedNoteText = document.getElementById('subscribednotetext');
const darkmodebtn = document.querySelector('.darkmodebutton');

newsletterButton.addEventListener('click', function() {
    if (newsletterButton.innerText === "Subscribe to our newsletter") {
        newsletterButton.innerHTML = "&#x2716;";
        wrapperDiv.style.opacity = 1;
    }
    else if (newsletterButton.innerText != "Subscribe to our newsletter"){
        newsletterButton.innerText = "Subscribe to our newsletter";
        wrapperDiv.style.opacity = 0;
    }
  });


form.addEventListener('submit', e => {
    subscribedNote.style.opacity = 0;
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputcontrol = element.parentElement;
    const errorDisplay = inputcontrol.querySelector('.error');

    errorDisplay.innerText = message;
    inputcontrol.classList.add('error');
    inputcontrol.classList.remove('success')
}

const setSuccess = element => {
    const inputcontrol = element.parentElement;
    const errorDisplay = inputcontrol.querySelector('.error');

    errorDisplay.innerText = '';
    inputcontrol.classList.add('success');
    inputcontrol.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    
    const nameVal = name.value.trim();
    const emailVal = email.value.trim();

    //Check if name is valid
    if(nameVal === '') {
        setError(name, '');
    } else {
        setSuccess(name);
    }
    
    //Check if email is valid
    if(emailVal === '') {
        setError(email, '');
    } else if (!isValidEmail(emailVal)) {
        setError(email, '');
    } else {
        setSuccess(email);
    }
    if ((nameVal != '') && (emailVal != '') && (isValidEmail(emailVal))) {
        wrapperDiv.style.opacity = 0;
        subscribedNoteText.textContent = "Dear " + nameVal + ", you have successfully subscribed for a personalized newsletter";
        subscribedNote.style.opacity = 1;
        setTimeout(function() {
            subscribedNote.style.opacity = 0;
          }, 3000);
    }
    

    preventDefault();  
}
//Changing the color variables defines in CSS to activate and deactivate dark mode
function changeColor() {
    if (darkmodebtn.textContent === "Dark Mode") {
        darkmodebtn.textContent = "Light Mode";
        const root = document.documentElement;
        root.style.setProperty('--black', '#FFFFFF');
        root.style.setProperty('--white', '#000000');
        root.style.setProperty('--darkblue', '#E5E5E5');
        root.style.setProperty('--lightgrey', '#14213D');
    
  }
  else {
    darkmodebtn.textContent = "Dark Mode";
    const root = document.documentElement;
    root.style.setProperty('--black', '#000000');
    root.style.setProperty('--white', '#FFFFFF');
    root.style.setProperty('--darkblue', '#14213D');
    root.style.setProperty('--lightgrey', '#E5E5E5');
  }
}

window.addEventListener('load', function() {
    // Load the XML document
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let xmlDoc = xhr.responseXML;
        let people = xmlDoc.getElementsByTagName("person");
        let table = document.createElement("table");
        
        // Create table headers
        let headers = ["Name", "Age", "Gender", "Weight", "Points"];
        let headerRow = document.createElement("tr");
        for (let i = 0; i < headers.length; i++) {
          let headerCell = document.createElement("th");
          let headerText = document.createTextNode(headers[i]);
          headerCell.appendChild(headerText);
          headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);
        
        // Add data rows to the table
        for (let i = 0; i < people.length; i++) {
          let person = people[i];
          let name = person.getElementsByTagName("name")[0].childNodes[0].nodeValue;
          let age = person.getElementsByTagName("age")[0].childNodes[0].nodeValue;
          let gender = person.getElementsByTagName("gender")[0].childNodes[0].nodeValue;
          let weight = person.getElementsByTagName("weight")[0].childNodes[0].nodeValue;
          let points = person.getElementsByTagName("points")[0].childNodes[0].nodeValue;
          
          let row = document.createElement("tr");
          let nameCell = document.createElement("td");
          let ageCell = document.createElement("td");
          let genderCell = document.createElement("td");
          let weightCell = document.createElement("td");
          let pointsCell = document.createElement("td");
          
          let nameText = document.createTextNode(name);
          let ageText = document.createTextNode(age);
          let genderText = document.createTextNode(gender);
          let weightText = document.createTextNode(weight);
          let pointsText = document.createTextNode(points);
          
          nameCell.appendChild(nameText);
          ageCell.appendChild(ageText);
          genderCell.appendChild(genderText);
          weightCell.appendChild(weightText);
          pointsCell.appendChild(pointsText);
          
          row.appendChild(nameCell);
          row.appendChild(ageCell);
          row.appendChild(genderCell);
          row.appendChild(weightCell);
          row.appendChild(pointsCell);
          
          table.appendChild(row);
        }
        
        // Add the table to the HTML page
        document.body.appendChild(table);
      }
    }
    
    xhr.open("GET", "MyListPage.xml", true);
    xhr.send();
  });
  