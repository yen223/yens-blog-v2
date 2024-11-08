import { useEffect, useRef, useState } from "react";
import { Container } from "~/components/Container";

export const meta = () => {
  return [
    { title: "Keyboard Event Viewer" },
    { name: "description", content: "A tool to view keyboard events and help debug keyboard-related issues" },
  ];
};

function KeyEventViewer() {
    const [events, setEvents] = useState<{ type: string, key: string, keyCode?: number, inputType: string, isComposing: boolean }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const handleBeforeInput = (e: InputEvent) => {
            setEvents(prev => [{
                type: 'beforeinput',
                key: '',
                keyCode: undefined,
                inputType: e.inputType,
                isComposing: e.isComposing
            }, ...prev]);
        };

        const handleInput = (e: Event) => {
            setEvents(prev => [{
                type: 'input',
                key: '',
                keyCode: undefined,
                inputType: (e as InputEvent).inputType,
                isComposing: (e as InputEvent).isComposing
            }, ...prev]);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            setEvents(prev => [{
                type: 'keydown',
                key: e.key,
                keyCode: e.keyCode,
                inputType: '',
                isComposing: e.isComposing
            }, ...prev]);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setEvents(prev => [{
                type: 'keyup',
                key: e.key,
                keyCode: e.keyCode,
                inputType: '',
                isComposing: e.isComposing
            }, ...prev]);
        };
        input.addEventListener('keydown', handleKeyDown);
        input.addEventListener('beforeinput', handleBeforeInput);
        input.addEventListener('input', handleInput);
        input.addEventListener('keyup', handleKeyUp);

        return () => {
            input.removeEventListener('beforeinput', handleBeforeInput);
            input.removeEventListener('input', handleInput);
            input.removeEventListener('keydown', handleKeyDown);
            input.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-8">
                Keyboard Event Viewer
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                This tool helps debug keyboard events by showing the exact sequence of events fired when typing. 
                Type in the input box below to see keydown, keyup, and input events in real-time.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                Based on <a href="https://w3c.github.io/uievents/tools/key-event-viewer.html" className="text-teal-500 hover:underline">the W3C Key Event Viewer</a>
            </p>
            <input
                type="text"
                className="w-full border rounded p-2 dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                placeholder="Type here to test keyboard events"
                ref={inputRef}
            />
            <button
                onClick={() => setEvents([])}
                className="mt-4 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded text-sm text-zinc-900 dark:text-zinc-100"
            >
                Clear Events
            </button>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b dark:border-zinc-700">
                            <th className="text-left p-2">Event Type</th>
                            <th className="text-left p-2">Key</th>
                            <th className="text-left p-2">Code</th>
                            <th className="text-left p-2">Input Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, i) => (
                            <tr key={i} className="border-b dark:border-zinc-700">
                                <td className="p-2 text-zinc-400">{event.type}</td>
                                <td className="p-2 text-zinc-400 font-semibold">{event.key}</td>
                                <td className="p-2 text-zinc-400">{event.keyCode}</td>
                                <td className="p-2 text-zinc-400">{event.inputType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function KeyEventViewerPage() {
    return <Container className="my-8">
        <KeyEventViewer />
    </Container>
}
