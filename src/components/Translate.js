import React, { useState } from "react";
import languages from "../languages";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("hi-IN");
  const [loading, setLoading] = useState(false);

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);
  };

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  };
  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleIconClick = (target, id) => {
    if (target.classList.contains("fa-copy")) {
      if (id === "from") {
        copyContent(fromText);
      } else {
        copyContent(toText);
      }
    } else {
      if (id === "from") {
        utterText(fromText, fromLanguage);
      } else {
        utterText(toText, toLanguage);
      }
    }
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="title">
        <h1>Translating App</h1>
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              className="from-text"
              name="from"
              id="from"
              placeholder="Enter text"
              value={fromText}
              onChange={(event) => setFromText(event.target.value)}
            ></textarea>
            <textarea
              className="to-text"
              name="to"
              id="to"
              placeholder="Translation"
              value={toText}
              readOnly
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i
                  id="from"
                  class="fa-solid fa-volume-high"
                  onClick={(event) => handleIconClick(event.target, "from")}
                ></i>
                <i
                  id="from"
                  class="fa-solid fa-copy"
                  onClick={(event) => handleIconClick(event.target, "from")}
                ></i>
              </div>
              <select
                value={fromLanguage}
                onChange={(event) => setFromLanguage(event.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange" onClick={handleExchange}>
              <i class="fa-solid fa-rotate"></i>
            </li>
            <li className="row  to">
              <select
                value={toLanguage}
                onChange={(event) => setToLanguage(event.target.value)}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <i
                  id="to"
                  class="fa-solid fa-copy"
                  onClick={(event) => handleIconClick(event.target, "to")}
                ></i>
                <i
                  id="to"
                  class="fa-solid fa-volume-high"
                  onClick={(event) => handleIconClick(event.target, "to")}
                ></i>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate}>
          {loading ? "Translating..." : "Translate Text"}
        </button>
      </div>
    </>
  );
};

export default Translate;




