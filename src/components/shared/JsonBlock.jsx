import { useState } from "react";

const JsonBlock = ({ json }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="relative">
            <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap break-words">
                <code>{JSON.stringify(json, null, 2)}</code>
            </pre>

            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-xs text-blue-500 hover:underline"
            >
                {copied ? "Copied!" : "copy"}
            </button>
        </div>
    );
};

export default JsonBlock;
