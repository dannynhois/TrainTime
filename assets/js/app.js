// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAvs-hmtzl9oKf8-Cgsl5ZSAydhHOGwTHo',
  authDomain: 'trainproject-72316.firebaseapp.com',
  databaseURL: 'https://trainproject-72316.firebaseio.com',
  projectId: 'trainproject-72316',
  storageBucket: '',
  messagingSenderId: '67730324689'
};

var trains = [];
var btnSubmit = document.getElementById('submit');

firebase.initializeApp(config);
var db = firebase.database();
var trainRefresher;

var dbObject;
loadDatabase();

// read database and assign to trains array
function loadDatabase () {
  db.ref('trains/').once('value').then(snapshot => {
    dbObject = snapshot.val();
    for (key in dbObject) {
      trains.push(dbObject[key]);
    }

    // populate HTML and create interval to run every minute
    populateTable();
    trainRefresher = setInterval(populateTable, 60000);
  });
}

// train parameter is an object
function addTrain (train) {
  db.ref('trains/').push(train);
  trains.push(train);
}

function populateTable () {
  var divTable = document.getElementById('train-times');

  var html = `<table class='table table-striped'>
                <thead>
                  <tr>
                    <th>Train Name</th>
                    <th>Destination</th>
                    <th>Frequency (min)</th>
                    <th>Next Arrival</th>
                    <th>Minutes Away</th>
                  </tr>
                </thead>
                <tbody>`;

  // loop through object and populate table body
  trains.forEach(train => {
    if (!train) {
      return;
    }
    var minutesAway = moment(train.first_train_time, 'HH:mm').diff(moment(), 'minutes');
    var arrivalTime = moment(train.first_train_time, 'HH:mm').format('HH:mm');

    // logic for next arrival
    while (minutesAway < 0) {
      arrivalTime = moment(arrivalTime, 'HH:mm').add(train.frequency, 'minutes').format('HH:mm');
      minutesAway = moment(arrivalTime, 'HH:mm').diff(moment(), 'minutes');
    }

    // convert from military to am/pm
    arrivalTime = moment(arrivalTime, 'HH:mm').format('hh:mm A');
    // console.log(moment());
    html += `<tr>
                <th>${train.name}</th>
                <th>${train.destination}</th>
                <th>${train.frequency}</th>
                <th>${arrivalTime}</th>
                <th>${minutesAway}</th>
              </tr>`;
  });

  html += '</table>';
  divTable.innerHTML = html;
}

// submit new train to database
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  // get values of form on click
  var newTrain = {
    name: document.getElementById('train-name').value,
    destination: document.getElementById('destination').value,
    frequency: document.getElementById('frequency').value,
    first_train_time: document.getElementById('first-train').value
  };

  // add train and update
  addTrain(newTrain);
  populateTable();
});
