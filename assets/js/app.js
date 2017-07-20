// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAvs-hmtzl9oKf8-Cgsl5ZSAydhHOGwTHo',
  authDomain: 'trainproject-72316.firebaseapp.com',
  databaseURL: 'https://trainproject-72316.firebaseio.com',
  projectId: 'trainproject-72316',
  storageBucket: '',
  messagingSenderId: '67730324689'
};
var trainId = 'two';

// var trains = [
//   {
//     name: 'Bullet',
//     destination: 'Houston',
//     frequency: 35,
//     // arrival_time: new Date(2017, 6, 19, 20, 24, 0)
//     first_train_time: "04:30"
//   },
//   {
//     name: 'Oregon Trail',
//     destination: 'Portland',
//     frequency: 16,
//     first_train_time: "10:30"
//   }
// ];

var trains = [];

firebase.initializeApp(config);
var db = firebase.database();


var dbObject;
db.ref('trains/').once('value').then(snapshot=>{
  dbObject = snapshot.val();
  for(key in dbObject){
    trains.push(dbObject[key]);
  }
  populateTable();
})

for(key in dbObject){
  console.log(key);
}



//train parameter is an object
function addTrain(train) {
  db.ref('trains/').push(train);
  trainId++;
}


//
// // writeUserData('dannynhois','danny','dannynhois@gmaill.com','https://dannynhois.github.io/assets/images/profile_picture.jpg');
// console.log('app is connected');
// var divObject = document.getElementById('object');
// var html;
// db.ref('users/dannynhois').once('value').then(snapshot => {
//   console.log(snapshot.val());
//   var username = snapshot.val().username;
//   html = username;
//   // console.log(username):
// })
//
// divObject.innerHTML = html;

function populateTable () {
  var divTable = document.getElementById('train-times');

  var html = `<table class='table table-striped table-bordered'>
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
    if(!train){
      return;
    }
    var minutesAway = moment(train.first_train_time, 'HH:mm').diff(moment(), 'minutes');
    var arrivalTime = moment(train.first_train_time, 'HH:mm').format('HH:mm');

    //logic for next arrival
    while(minutesAway < 0){
      arrivalTime = moment(arrivalTime, 'HH:mm').add(train.frequency, 'minutes').format('HH:mm');
      minutesAway = moment(arrivalTime, 'HH:mm').diff(moment(), 'minutes');
    }

    //convert from military to am/pm
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
