import { useEffect, useRef, useState } from "react";

export const meta = () => {
  return [
    { title: "Keyboard Event Viewer" },
    {
      name: "description",
      content:
        "A tool to view keyboard events and help debug keyboard-related issues",
    },
  ];
};

type KeyEvent = {
  type: string;
  key: string;
  keyCode?: number;
  inputType: string;
  isComposing: boolean;
  index: number;
};

function KeyEventViewer() {
  const [events, setEvents] = useState<KeyEvent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const add = (event: Omit<KeyEvent, "index">) =>
      setEvents((prev) => [{ ...event, index: prev.length }, ...prev]);

    const handleBeforeInput = (e: InputEvent) =>
      add({
        type: "beforeinput",
        key: "",
        inputType: e.inputType,
        isComposing: e.isComposing,
      });
    const handleInput = (e: Event) =>
      add({
        type: "input",
        key: "",
        inputType: (e as InputEvent).inputType,
        isComposing: (e as InputEvent).isComposing,
      });
    const handleKeyDown = (e: KeyboardEvent) =>
      add({
        type: "keydown",
        key: e.key,
        keyCode: e.keyCode,
        inputType: "",
        isComposing: e.isComposing,
      });
    const handleKeyUp = (e: KeyboardEvent) =>
      add({
        type: "keyup",
        key: e.key,
        keyCode: e.keyCode,
        inputType: "",
        isComposing: e.isComposing,
      });

    input.addEventListener("keydown", handleKeyDown);
    input.addEventListener("beforeinput", handleBeforeInput);
    input.addEventListener("input", handleInput);
    input.addEventListener("keyup", handleKeyUp);

    return () => {
      input.removeEventListener("beforeinput", handleBeforeInput);
      input.removeEventListener("input", handleInput);
      input.removeEventListener("keydown", handleKeyDown);
      input.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="tool-wrap">
      <p>
        This tool helps debug keyboard events by showing the exact sequence of
        events fired when typing. Type in the input below to see keydown, keyup,
        and input events in real-time.
      </p>
      <p>
        Based on{" "}
        <a href="https://w3c.github.io/uievents/tools/key-event-viewer.html">
          the W3C Key Event Viewer
        </a>
        , but designed to be more mobile-friendly.{" "}
        <a href="https://github.com/yen223/yens-blog-v2/blob/main/app/routes/projects.key-event-viewer.tsx">
          Source code
        </a>
        .
      </p>

      <input
        ref={inputRef}
        type="text"
        className="tool-input"
        placeholder="Type here to test keyboard events"
      />

      <div className="tool-row">
        <button className="tool-button" onClick={() => setEvents([])}>
          Clear events
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="tool-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Key</th>
              <th>Code</th>
              <th>Input Type</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.index}>
                <td>{event.type}</td>
                <td className="is-key">{event.key}</td>
                <td>{event.keyCode}</td>
                <td>{event.inputType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function KeyEventViewerPage() {
  return (
    <>
      <section className="home-hero">
        <div />
        <div>
          <h1>
            Keyboard <em>event viewer</em>
          </h1>
          <p className="lede">
            Type into the input below to see the keyboard events fired — handy
            for debugging IME, composition, and mobile-keyboard quirks.
          </p>
        </div>
      </section>

      <div className="section-head">
        <span className="kicker">
          <span className="arrow" aria-hidden="true" />
          tool
        </span>
        <h2>
          Live <em>events</em>
        </h2>
      </div>

      <KeyEventViewer />
    </>
  );
}
