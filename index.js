// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
var i = 0 ,j = 0, k = 0, crscore=0; 
var flag_1 = 0,flag_2 = 0,flag_3 = 0;

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
/*
  function handleReadFromDB(agent){
    return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('user1').val();
     const dob = snapshot.child('dob').val();
      if(value != "Mohit"){
      		agent.add(`The value from database is ${value}`);
      } 
      else
      {
        agent.add('Wrong User Details.');
      }
    });
  }
  
  */
  function handleaadhar(agent){
  	const aadhar = agent.parameters.number;
    var aadhaar_Array = [];
    return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('user1/uid').val();
    const value1 = snapshot.child('user2/uid').val();
    const value2 = snapshot.child('user3/uid').val();
    const value3 = snapshot.child('user4/uid').val();
    const value4 = snapshot.child('user5/uid').val();
    const value5 = snapshot.child('user6/uid').val();
    const value6 = snapshot.child('user7/uid').val();
    const value7 = snapshot.child('user8/uid').val();
    const value8 = snapshot.child('user9/uid').val();
    const value9 = snapshot.child('user10/uid').val();
     aadhaar_Array.push(value9);
      aadhaar_Array.push(value8);
      aadhaar_Array.push(value7);
      aadhaar_Array.push(value6);
      aadhaar_Array.push(value5);
      aadhaar_Array.push(value4);
      aadhaar_Array.push(value3);
      aadhaar_Array.push(value2);
      aadhaar_Array.push(value1);
      aadhaar_Array.push(value);
	  for(j=0;j<aadhaar_Array.length;j++)
     {
      if(aadhaar_Array[j]==aadhar)
      {
        flag_1 = 1; 
        break;
      }
      else
      {
        flag_1 = 0;
      }
    }
      if(flag_1 === 0)
      {
        agent.add('Aadhaar Error');
      }
      
    });
  }
  function handlepan(agent)
  {
  	const pan = agent.parameters.number;
    var pan_array = [];
    return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('user1/pan_id').val();
    const value1 = snapshot.child('user2/pan_id').val();
    const value2 = snapshot.child('user3/pan_id').val();
    const value3 = snapshot.child('user4/pan_id').val();
    const value4 = snapshot.child('user5/pan_id').val();
    const value5 = snapshot.child('user6/pan_id').val();
    const value6 = snapshot.child('user7/pan_id').val();
    const value7 = snapshot.child('user8/pan_id').val();
    const value8 = snapshot.child('user9/pan_id').val();
    const value9 = snapshot.child('user10/pan_id').val();
      pan_array.push(value9);
      pan_array.push(value8);
      pan_array.push(value7);
      pan_array.push(value6);
      pan_array.push(value5);
      pan_array.push(value4);
      pan_array.push(value3);
      pan_array.push(value2);
      pan_array.push(value1);
      pan_array.push(value);
	  for(k = 0;k<pan_array.length;k++)
    {
      if(pan_array[k].equals(pan) === true)
      {
        flag_3 = 1; 
        break;
      }
      else
      {
        flag_3 = 0;
      }
    }
      if(flag_3 === 0)
      {
        agent.add('Pan Card Error');
      }
      if(i == j && i == k && flag_3 == 1&& flag_1 == 1 && flag_2 == 1)
     {
     }
     else
     {
       agent.add('Final Error');
     }
    });
  }
  function handlemobno(agent)
  {
  const mob_no = agent.parameters.phonenumber;
    var  phone_array = [];
    return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('user1/mobno').val();
    const value1 = snapshot.child('user2/mobno').val();
    const value2 = snapshot.child('user3/mobno').val();
    const value3 = snapshot.child('user4/mobno').val();
    const value4 = snapshot.child('user5/mobno').val();
    const value5 = snapshot.child('user6/mobno').val();
    const value6 = snapshot.child('user7/mobno').val();
    const value7 = snapshot.child('user8/mobno').val();
    const value8 = snapshot.child('user9/mobno').val();
    const value9 = snapshot.child('user10/mobno').val();
    phone_array.push(value9);
    phone_array.push(value8);
      phone_array.push(value7);
      phone_array.push(value6);
      phone_array.push(value5);
      phone_array.push(value4);
      phone_array.push(value3);
      phone_array.push(value2);
      phone_array.push(value1);
      phone_array.push(value);
	for(i=0;i<phone_array.length;i++)
    {
      if(phone_array[i]==mob_no)
      {
        flag_2 = 1; 
        break;
      }
      else
      {
        flag_2 = 0;
      }
    }
      if(flag_2 === 0)
      {
        agent.add('Phone Number Error');
      }
    });
  }
  
  function handlepamount(agent)
  {
    const loan_amt = agent.parameters.amount_req_user;
    var  salary_array = [];
  	return admin.database().ref('user').once('value').then((snapshot) => {
    const value = snapshot.child('user1/salary').val();
    const value1 = snapshot.child('user2/salary').val();
    const value2 = snapshot.child('user3/salary').val();
    const value3 = snapshot.child('user4/salary').val();
    const value4 = snapshot.child('user5/salary').val();
    const value5 = snapshot.child('user6/salary').val();
    const value6 = snapshot.child('user7/salary').val();
    const value7 = snapshot.child('user8/salary').val();
    const value8 = snapshot.child('user9/salary').val();
    const value9 = snapshot.child('user10/salary').val();
    salary_array.push(value9);
    salary_array.push(value8);
    salary_array.push(value7);
    salary_array.push(value6);
    salary_array.push(value5);
    salary_array.push(value4);
    salary_array.push(value3);
    salary_array.push(value2);
    salary_array.push(value1);
    salary_array.push(value);
      var salary = salary_array[i];
      if(salary >25000 && salary <100000 && loan_amt>15000 && loan_amt <200000)
      {
        agent.add('Loan has been granted succesfully');
        agent.add('Please provide me with your Email Id');
      }
      else if(salary >100000 && salary <600000 && loan_amt>200000 && loan_amt <800000)
      {
        agent.add('Loan has been granted succesfully');
        agent.add('Please provide me with your Email Id');
      }
      else if(salary >600000 && salary <900000 && loan_amt>800000 && loan_amt <1500000)
      {
        agent.add('Loan has been granted succesfully');
        agent.add('Please provide me with your Email Id');
      }
      else
      {
        agent.add('We Cannot Issue the loan ammount here but you can always contact ABC ');
      }
    });
  }
  
  function SendEmail(agent){
  
  }
  
  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  //intentMap.set('SaveToDB', handleSaveToDB);
  //intentMap.set('ReadFromDB', handleReadFromDB);
  intentMap.set('aadhar_data', handleaadhar);
  intentMap.set('mob_no', handlemobno);
  intentMap.set('pan_details', handlepan);
  intentMap.set('principal_amount', handlepamount);
  intentMap.set('user_email', SendEmail);
  agent.handleRequest(intentMap);
});
