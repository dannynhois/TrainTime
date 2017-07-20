// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAvs-hmtzl9oKf8-Cgsl5ZSAydhHOGwTHo',
  authDomain: 'trainproject-72316.firebaseapp.com',
  databaseURL: 'https://trainproject-72316.firebaseio.com',
  projectId: 'trainproject-72316',
  storageBucket: '',
  messagingSenderId: '67730324689'
};

var trains = [
  {
    name: 'Bullet',
    destination: 'Houston',
    frequency: 60,
    arrival_time: new Date(2017, 6, 19, 20, 24, 0)
  },
  {
    name: 'Oregon Trail',
    destination: 'Portland',
    frequency: 360,
    arrival_time: new Date(2017, 6, 19, 21, 34, 0)
  }
];
// firebase.initializeApp(config);

// var db = firebase.database();

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
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
    var minutesAway = moment(train.arrival_time).diff(moment(), 'minutes');
    var arrivalTime = moment(train.arrival_time).format('HH:mm');
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

populateTable();
