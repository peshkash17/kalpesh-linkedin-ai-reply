import React, { useEffect, useRef, useState } from "react";
import AiIcon from "~/assets/Vector.svg";
import Arrow from "~/assets/Arrow.png";
import Insert from "~/assets/Insert.png";
import Regenerate from "~/assets/Regenerate.png";

const App: React.FC = () => {
  const [showIcon, setShowIcon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [showCommand, setShowCommand] = useState("");
  const [dummyResponse, setDummyResponse] = useState("");
  const inputRef = useRef<HTMLElement | null>(null);

// function to select the input field and append the icon
  const handleFocus = (event: FocusEvent) => {
    if (
      event.target instanceof HTMLElement &&  
      event.target.hasAttribute("contenteditable") &&
      event.target.closest(".msg-form__msg-content-container")
    ) {
      inputRef.current = event.target;

      const icon = document.createElement("img");
      icon.src = AiIcon;
      icon.style.position = "absolute";
      icon.style.bottom = "0";
      icon.style.right = "0";
      icon.style.width = "25px";
      icon.style.height = "25px";
      icon.style.cursor = "pointer";
      icon.style.backgroundColor = "white";
      icon.style.borderRadius = "50%";
      icon.style.padding = "5px";
      icon.style.margin = "5px";
      icon.style.zIndex = "999";

      icon.onmousedown = handleIconClick;
      event.target.parentElement?.appendChild(icon);

      setShowIcon(true);
    }
  };
// function to remove icon when input focusout
  const handleBlur = () => {
    if (inputRef.current) {
      const icon = inputRef.current.parentElement?.querySelector("img");
      if (icon) icon.remove();
    }
    setShowIcon(false);
  };

  const handleIconClick = (e: MouseEvent) => {
    e.preventDefault(); 
    // console.log("Icon clicked, opening modal");
    setIsModalOpen(true);
  };

  // function to insert response in the input
  const handleInsertClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();

      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(dummyResponse);
        range.insertNode(textNode);

        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        const inputEvent = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(inputEvent);
      }
    }
    setIsModalOpen(false);
  };

  const handleGenerateClick = () => {
    if (command.length === 0) return;
    setShowCommand(command);
    setCommand("");
    setDummyResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
  };

  useEffect(() => {
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  useEffect(() => {
    // console.log("Modal statechanged:", isModalOpen);
    setShowIcon(prev => !prev);
  }, [isModalOpen]);

  return (
    <>
    {isModalOpen && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '28px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '400px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {dummyResponse && (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <span style={{
                  padding: '12px',
                  backgroundColor: '#DFE1E7',
                  fontSize: '16px',
                  color: '#666D80',
                  borderRadius: '8px',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                }}>
                  {showCommand}
                </span>
              </div>
              <div style={{
                padding: '16px',
                backgroundColor: '#DBEAFE',
                color: '#666D80',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '16px',
                wordBreak: 'break-word',
              }}>
                {dummyResponse}
              </div>
            </>
          )}
          <div style={{ marginBottom: '16px' }}>
            <input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              type="text"
              placeholder="Your prompt"
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {dummyResponse && (
              <button
                onClick={handleInsertClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#666D80',
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  marginRight: '12px',
                  border: '1px solid #666D80',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={Insert}
                  alt="Insert Text"
                  style={{ width: '12px', color: '#666D80' }}
                />
                <span>Insert</span>
              </button>
            )}
            <button
              onClick={dummyResponse ? undefined : handleGenerateClick}
              style={{
                backgroundColor: '#3B82F6',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <img
                src={dummyResponse ? Regenerate : Arrow}
                alt="Generate"
                style={{ width: dummyResponse ? '16px' : '20px' }}
              />
              <span>{dummyResponse ? "Regenerate" : "Generate"}</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default App;