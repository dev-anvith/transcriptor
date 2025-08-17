import { useState } from "react";
import axios from "axios";
import { SparklesIcon, ClipboardDocumentIcon, CheckIcon, XCircleIcon, TrashIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [promptType, setPromptType] = useState("summary");

  const promptOptions = [
    { key: "summary", label: "Key Takeaways" },
    { key: "detailed", label: "Detailed Summary" },
    { key: "mom", label: "Minutes of Meeting" },
    { key: "email", label: "Email Draft" },
  ];

  const handleSummarize = async () => {
    if (!transcript.trim()) {
      setError("Please paste a transcript first.");
      return;
    }
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const res = await axios.post(" https://transcriptor-7rm6.onrender.com/summarize", { 
        transcript,
        promptType,
      });
      setSummary(res.data.summary);
    } catch (err) {
      setError("Failed to get summary. Please try again later.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setTranscript("");
    setSummary("");
    setError("");
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-6 font-sans">
      <header className="w-full max-w-5xl mb-6">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-8 w-8 text-sky-500" />
          <h1 className="text-2xl sm:text-3xl font-bold">Meeting Summarizer</h1>
        </div>
      </header>

      <main className="w-full max-w-5xl flex-grow grid md:grid-cols-2 gap-6">
        {/* INPUT COLUMN */}
        <div className="flex flex-col space-y-4">
          <div className="flex-grow flex flex-col">
            <label htmlFor="transcript" className="block text-sm font-medium text-slate-600 mb-1">
              Your Transcript
            </label>
            <textarea
              id="transcript"
              className="w-full flex-grow p-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow resize-none"
              placeholder="Paste your meeting transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Select Summary Type
            </label>
            <div className="flex flex-wrap gap-2">
              {promptOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setPromptType(option.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    promptType === option.key
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={handleSummarize}
              disabled={loading}
              className="px-6 py-2 w-full sm:w-auto font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
            <button onClick={handleClear} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors" title="Clear All">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Generated Summary</h2>
          <div className="flex-grow w-full h-full min-h-[200px] p-3 bg-slate-50 rounded-md relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div><p className="mt-2 text-slate-500">Generating...</p></div></div>}
            {error && <div className="absolute inset-0 flex items-center justify-center p-4"><div className="text-center text-rose-500"><XCircleIcon className="h-8 w-8 mx-auto mb-2"/><p>{error}</p></div></div>}
            {!loading && !error && !summary && <div className="absolute inset-0 flex items-center justify-center"><p className="text-slate-400">Your summary will appear here.</p></div>}
            {summary && (
              <>
                <textarea
                  className="w-full h-full bg-transparent border-none focus:ring-0 resize-none outline-none"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button onClick={handleCopy} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors" title="Copy to Clipboard">
                    {copied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                  </button>
                  
                  <a
                    href={`mailto:?subject=Meeting Summary&body=${encodeURIComponent(summary)}`}
                    className="p-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors inline-block"
                    title="Share via Email"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </a>

                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}