import { Handler } from '@netlify/functions';
import axios from 'axios';

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const WHISPER_MODEL = 'openai/whisper-large-v3';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { audioData } = JSON.parse(event.body || '{}');

    if (!audioData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Audio data is required' }),
      };
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioData.split(',')[1], 'base64');

    // Call Hugging Face Inference API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${WHISPER_MODEL}`,
      audioBuffer,
      {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'audio/wav',
        },
      }
    );

    const transcription = response.data.text || '';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ transcription }),
    };
  } catch (error: any) {
    console.error('Speech-to-Text Error:', error);
    
    // Handle model loading
    if (error.response?.status === 503) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ 
          error: 'Model is loading, please try again in a moment',
          estimated_time: error.response.data?.estimated_time 
        }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to transcribe audio',
        details: error.message 
      }),
    };
  }
};
