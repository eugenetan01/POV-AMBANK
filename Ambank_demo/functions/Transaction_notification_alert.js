var TeleSignSDK = require('telesignsdk');

exports = async function(changeEvent){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)

  const customerId = "F30BC64C-3CB5-435A-AA8C-2962451EFDFF";
  const apiKey = "X8QJksJFWKF4XUTYISJL58vAVyvUEO22ilzpZ2etHLpiQ4t/kxUivCwVZzXBEc+7ctBtefQyrQ+SdGDpAIpsdQ==";
  const rest_endpoint = "https://rest-api.telesign.com";
  const timeout = 10*1000; // 10 secs

  const client = new TeleSignSDK( customerId,
  apiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
  );
 
  console.log(changeEvent.fullDocument)
  const {_id, total, account_id} = changeEvent.fullDocument
  
  //const phoneNumber = ["6598194613"];
  const phoneNumber = "60193883724"//"60122339581";
  
  console.log(total);
  
  if (total > 1000000){
      const message = `Hi Ms. Ez! Transaction ID: ${_id} is above $1,000,000 made by account ${account_id}. Transaction value is: ${total} Please login to view.`;
      const messageType = "ARN";
      
      console.log(message);
    
      console.log("## MessagingClient.message ##");
    
      function messageCallback(error, responseBody) {
        if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody["status"]["code"]}` +
            `, description: ${responseBody["status"]["description"]}`);
        } else {
        console.error("Unable to send message. " + error);
        }
      }
      client.sms.message(messageCallback, phoneNumber, message, messageType);
      
  }else{
      console.log("nothing");
  }

  return;
};