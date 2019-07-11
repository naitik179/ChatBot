// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL:'ws://dfdatabasedemo-apgkwd.firebaseio.com/' 
});
  
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  function handleSaveToDB(agent){
    const text = agent.parameters.text;
    return admin.database().ref('data').set({
    first_name: 'RAhul',
     last_name: 'Sharma',
      text:text
    });
 
  }
  /*
  function handleReadFromDB(agent){
    return admin.database().ref('data').once('value').then((snapshot) => {
    const value = snapshot.child('first_name').val();
      if(value !== null){
      		agent.add(`The value from database is ${value}`);
      } 
    });
  }
  */
  function handleReadFromDB(agent){
    return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('mob_no').val();
     const dob = snapshot.child('dob').val();
      if(dob != "28-03-1999"){
      		agent.add(`The value from database is ${value}`);
      } 
      else
      {
        agent.add('Wrong User Details.');
      }
    });
  }
  function handleaadhar(agent){
  	const aadhar = agent.parameters.number;
    return admin.database().ref('aadhar_details').once('value').then((snapshot) => {
    const value = snapshot.child('uid').val();
     //const dob = snapshot.child('dob').val();
      if(aadhar == value){
      		agent.add(`Inputted Value : ${value} is in our database.`);
      } 
      else
      {
        agent.add('No Data found in our Database!');
      }
    });
  }
  
  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SaveToDB', handleSaveToDB);
  intentMap.set('ReadFromDB', handleReadFromDB);
  intentMap.set('aadhar_data', handleaadhar);
  agent.handleRequest(intentMap);
});
