import axios from 'axios';
import fs from 'fs/promises';

export const transcribeAudioFile = async (filePath) => {
  try {
    const url = 'https://api.openai.com/v1/audio/transcriptions';

    // Read the audio file as a buffer
    const fileBuffer = await fs.readFile(filePath);

    // Create a form data object to upload the file
    const formData = new FormData();
    formData.append('model', 'whisper-1');
    formData.append('file', new Blob([fileBuffer]), filePath.split('/').pop()); // file name
    formData.append('response_format', 'verbose_json');
    formData.append('timestamp_granularities', 'word');

    const options = {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(url, formData, options);

    const transcription = response.data.text;
    const words = response.data.words;

    console.log('Transcription:', transcription);
    console.log('Words:', words);

    return { transcription, words };
  } catch (error) {
    console.error('Transcription Error:', error.response?.data || error.message);
    throw new Error('Failed to transcribe audio file');
  }
};
