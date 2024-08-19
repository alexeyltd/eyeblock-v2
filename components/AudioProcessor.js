"use client";

import React, { useState } from "react";
import apiClient from "@/libs/api";

const AudioProcessor = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleProcessAudio = async () => {
    if (audioFile) {
      setIsLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', audioFile);

      try {
        // Replace with your API endpoint
        const {transcription} = await apiClient.post("/audio", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log("Server response:", transcription);

        // setTranscription(data.transcription);
        // setSummary(data.summary);
        // setSentiment(data.sentiment);
      } catch (err) {
        console.error("Error processing audio:", err);
        setError('An error occurred during processing. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Audio Processor</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleProcessAudio}
        className={`mt-4 py-2 px-4 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!audioFile || isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h4l3 5 4-10 3 5h4"
            />
          </svg>
        )}
        {isLoading ? 'Processing...' : 'Process Audio'}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {transcription && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Transcription</h2>
          <p className="text-gray-600">{transcription}</p>
        </div>
      )}
      {summary && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Summary</h2>
          <p className="text-gray-600">{summary}</p>
        </div>
      )}
      {sentiment && Object.keys(sentiment).length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Sentiment Analysis</h2>
          <p className="text-gray-600">
            Positive: {(sentiment.positive?.toFixed(2) * 100) || 0}%
          </p>
          <p className="text-gray-600">
            Negative: {(sentiment.negative?.toFixed(2) * 100) || 0}%
          </p>
          <p className="text-gray-600">
            Neutral: {(sentiment.neutral?.toFixed(2) * 100) || 0}%
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioProcessor;