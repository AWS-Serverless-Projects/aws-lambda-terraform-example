import * as React from "react";
import './App.css';

function App() {
  const [status, setStatus] = React.useState("");
  const [gifUrl, setGifUrl] = React.useState("");

  const formHandler = async () => {
    try {
      const lambdaEndpoint = "https://1gtgtcj0t7.execute-api.eu-west-1.amazonaws.com/dev/resource";
      const response = await fetch(lambdaEndpoint, {
        method: 'POST',
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify({ "state": status })
      });

      const responseUrl = await response.json();
      setGifUrl(responseUrl.url)

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form 
        onSubmit={e => {
          e.preventDefault();
          formHandler();
        }}
      >
        <input type="radio" id="start" name="status" value="START" defaultChecked 
          onChange={e => setStatus(e.target.value)}
        />
        <label htmlFor="start">Start</label><br />
        <input type="radio" id="succeeded" name="status" value="SUCCEEDED" 
          onChange={e => setStatus(e.target.value)}
        />
        <label htmlFor="succeeded">Succeeded</label><br />
        <input type="radio" id="failed" name="status" value="FAILED" 
          onChange={e => setStatus(e.target.value)}
        />
        <label htmlFor="failed">Failed</label><br />
        <input type="radio" id="cancelled" name="status" value="CANCELLED" 
          onChange={e => setStatus(e.target.value)}
        />
        <label htmlFor="cancelled">Cancelled</label><br /><br />
        <input type="submit" value="Submit" />
      </form> 
      <div>
        <h3>Selected GIF</h3>
        <div><img src={gifUrl} alt="loading..." /></div>
      </div>
    </div>
  );
}

export default App;
