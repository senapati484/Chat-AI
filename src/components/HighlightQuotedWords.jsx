import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FiCopy, FiChevronsRight } from "react-icons/fi";

const HighlightQuotedWords = ({ text }) => {
  const [copyStatus, setCopyStatus] = useState({});
  const codeRefs = useRef([]);

  const handleCopy = (codeText, index) => {
    navigator.clipboard.writeText(codeText);
    setCopyStatus((prevStatus) => ({ ...prevStatus, [index]: "Copied" }));
    setTimeout(() => {
      setCopyStatus((prevStatus) => ({ ...prevStatus, [index]: "Copy code" }));
    }, 1000);
  };

  const processText = (text) => {
    const parts = text.split(
      /(```.*?```)|(["'][^"']*["'])|(\*\*[^*]*\*\*)|(\d+\.*\d*)|(`.*?`)|(\[.*?\])|(\(.*?\))|(\s\*\s)/s
    );

    return parts.map((part, index) => {
      if (part) {
        if (part.startsWith("```") && part.endsWith("```")) {
          const codeText = part.slice(3, -3);
          return (
            <div
              key={index}
              className="relative bg-gray-900 text-white rounded-lg my-4 overflow-hidden"
            >
              <div className="flex justify-between items-center p-2 bg-gray-800">
                <span className="text-gray-400">code</span>
                <button
                  onClick={() => handleCopy(codeText, index)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white"
                >
                  <FiCopy />
                  <span>{copyStatus[index] || "Copy code"}</span>
                </button>
              </div>
              <pre
                className="p-2 text-white overflow-x-auto text-sm md:text-base lg:text-lg"
                ref={(el) => (codeRefs.current[index] = el)}
              >
                {codeText}
              </pre>
            </div>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          const highlightedText = part.slice(2, -2);
          return (
            <span
              key={index}
              className="font-bold bg-gray-800 text-white p-1 rounded text-sm md:text-base lg:text-lg"
            >
              {highlightedText}
            </span>
          );
        }
        if (part.startsWith('"') && part.endsWith('"')) {
          const highlightedText = part.slice(1, -1);
          return (
            <span key={index} className="text-sm md:text-base lg:text-lg">
              {highlightedText}
            </span>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          const highlightedText = part;
          return (
            <span key={index} className="text-sm md:text-base lg:text-lg">
              {highlightedText}
            </span>
          );
        }
        if (/^\d+(\.\d+)?$/.test(part)) {
          return (
            <span
              key={index}
              className="font-bold text-sm md:text-base lg:text-lg"
            >
              {part}
            </span>
          );
        }
        if (part.startsWith("[") && part.endsWith("]")) {
          const linkText = part.slice(1, -1);
          return (
            <a
              key={index}
              href={linkText}
              className="text-blue-500 underline hover:text-blue-700 px-2 text-sm md:text-base lg:text-lg"
            >
              {linkText}
            </a>
          );
        }
        if (part.startsWith("(") && part.endsWith(")")) {
          const linkText = part.slice(1, -1);
          const showingLink = part.slice(8, -0);
          return (
            <a
              key={index}
              href={linkText}
              className="text-blue-500 underline hover:text-blue-700 px-2 text-sm md:text-base lg:text-lg"
            >
              {showingLink}
            </a>
          );
        }
        if (part.trim() === "*") {
          return (
            <span key={index} className="font-bold text-black">
              <FiChevronsRight className="text-white mt-3 mb-1 text-sm md:text-base lg:text-lg" />
            </span>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg">
      {processText(text)}
    </div>
  );
};

HighlightQuotedWords.propTypes = {
  text: PropTypes.string.isRequired,
};

export default HighlightQuotedWords;
