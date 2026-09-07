import { useState } from "react";

const apiEndpoint = "http://localhost:3000/petite-url/";
let shortURL = "";

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("initial"); //"success", "failure",...

  // copied cannot be in status , contradicts (will delete output bar is status changed)
  // one state each for actual and shadow (they swap between each other)
  const [isCopied, setIsCopied] = useState(false);
  const [isCopiedShadow, setIsCopiedShadow] = useState(false);

  async function handleShorten() {
    setStatus("initial");
    setIsCopied(false);
    setIsCopiedShadow(false);

    const longURL = { long_url: text.trim() };

    try {
      // Make HTTP Request to server
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(longURL),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setStatus("success");
      shortURL = "http://localhost:3000/petite-url/" + data.shortCode;
    } catch (error) {
      console.error("Error caught:", error);
      setStatus("failure");
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shortURL);

    // code that swaps the visibility of the actual and shadow
    // both start false, first time click, else case runs,
    // any consecutive clicks, toggles between if and else cases
    if (isCopied) {
      setIsCopied(false);
      setIsCopiedShadow(true);
    } else {
      setIsCopied(true);
      setIsCopiedShadow(false);
    }
  }

  return (
    <div className="container">
      <div className="header" id="mainHeader">
        Petite URL (URL Shortener)
      </div>

      <div className="input-area">
        <input
          id="longURLInput"
          type="text"
          placeholder="Long URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button id="shortenBtn" onClick={() => handleShorten()}>
          Shorten
        </button>
      </div>

      {status == "success" && (
        <div className="output">
          Short URL:
          <a href={shortURL} target="_blank">
            {shortURL}
          </a>
          <button id="copyUrlBtn" onClick={() => handleCopyLink()}></button>
        </div>
      )}

      {status == "failure" && (
        <div className="output">Invalid URL Provided!</div>
      )}

      {(isCopied || isCopiedShadow) && (
        <div className="invisible-container">
          {isCopied && (
            <div className="output" id="outputReal">
              Link Copied
            </div>
          )}
          {isCopiedShadow && (
            <div className="output" id="outputShadow">
              Link Copied
            </div>
          )}
        </div>
      )}

      <div className="header" id="historyHeader">
        History
      </div>

      <div className="history-area" id="historyArea">
        (Additional Optional Feature)
        <br />
        History has a scroll down for overflow <br />
        History shows the long and short URL pair
        <br />
        True history uses the browser's cache/cookies
      </div>
    </div>
  );
}
