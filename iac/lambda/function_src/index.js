const STATUS_GIF = {
  started: 'https://media.giphy.com/media/tXLpxypfSXvUc/giphy.gif', // rocket launching
  succeeded: 'https://media.giphy.com/media/MYDMiSizWs5sjJRHFA/giphy.gif', // micheal jordan celebrating
  failed: 'https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif', // anthony anderson crying
  canceled: 'https://media.giphy.com/media/IzXmRTmKd0if6/giphy.gif', // finger pressing abort button
}

module.exports.handler = (event, context, callback) => {
  try {
    let gif_url;
    const requestedState = JSON.parse(event.body);
    const state  = requestedState.state;
    console.log("state:", state);

    switch (state) {
      case 'STARTED':
        gif_url = STATUS_GIF.started
        break;
      case 'SUCCEEDED':
        gif_url = STATUS_GIF.succeeded
        break;
      case 'FAILED':
        gif_url = STATUS_GIF.failed
        break;
      case 'CANCELED':
        gif_url = STATUS_GIF.canceled
        break;
      default:
        gif_url = STATUS_GIF.started
        break;
    }
    console.log("gif_url:", gif_url);

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({ "url": gif_url }),
    }

    callback(null, response)
  }catch(err){
    console.log("error:", err);
    return "Something went wrong"
  }
}