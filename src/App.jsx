// App.js
import { useState } from "react";
import axios from "axios";
import HighlightQuotedWords from "./components/HighlightQuotedWords";
import "./index.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const profile = () => {
    window.location.href =
      "https://www.linkedin.com/in/sayan-senapati-430833211/";
  };

  async function generateAnswer() {
    setAnswer("Loading ..");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA44bMO1RKk2PnxGV6f89TGC7e_CXNkLO8",
        method: "POST",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      const generatedText = response.data.candidates[0].content.parts[0].text;
      console.log(response.data.candidates[0].content.parts[0].text);
      setAnswer(generatedText);
    } catch (error) {
      setAnswer("Error generating answer");
      console.error("Error generating answer:", error);
    }
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-gray-900 to-blue-900 animate-pulse opacity-30"></div>
        <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-4 space-y-6 relative z-10">
          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Chat AI
          </h1>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols={30}
            rows={10}
            className="w-full p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-700 text-white placeholder-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
            placeholder="Type your question here..."
          ></textarea>
          <button
            onClick={generateAnswer}
            className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Generate Answer
          </button>
          <pre className="w-full p-4 bg-gray-700 border border-gray-700 rounded-lg whitespace-pre-wrap transition duration-300 ease-in-out transform text-gray-200 text-sm">
            <HighlightQuotedWords text={answer} />
          </pre>
        </div>
      </div>

      <div className=" bg-inherit">
        <span
          className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent block mx-auto text-center cursor-pointer "
          onClick={profile}
        >
          Chat AI made by | @senapati484
        </span>
      </div>
    </>
  );
}

export default App;
