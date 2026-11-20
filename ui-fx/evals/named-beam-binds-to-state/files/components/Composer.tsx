"use client";

import { useState } from "react";
import { useChat } from "../lib/chat";
import styles from "./Composer.module.css";

export function Composer() {
  const { messages, sendMessage, status, stop } = useChat();
  const [input, setInput] = useState("");
  const isStreaming = status === "submitted" || status === "streaming";

  return (
    <div className={styles.thread}>
      <ol className={styles.messages}>
        {messages.map((message) => (
          <li key={message.id} data-role={message.role}>
            {message.text}
          </li>
        ))}
      </ol>
      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault();
          if (!input.trim() || isStreaming) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <textarea
          className={styles.input}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask anything"
          aria-label="Message"
          rows={2}
        />
        <div className={styles.actions}>
          {isStreaming ? (
            <button type="button" className={styles.stop} onClick={() => stop()}>
              Stop
            </button>
          ) : (
            <button type="submit" className={styles.send} disabled={!input.trim()}>
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
