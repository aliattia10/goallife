import { Handler } from '@netlify/functions';
import axios from 'axios';

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const TTS_MODEL = 'facebook/mms-tts-eng'; // or 'espnet/kan-bayashi_ljspeech_vits'

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
    const { text } = JSON.parse(event.body || '{}');

    if (!text) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Text is required' }),
      };
    }

    // Call Hugging Face Inference API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${TTS_MODEL}`,
      { inputs: text },
      {
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert audio buffer to base64
    const audioBase64 = Buffer.from(response.data).toString('base64');
    const audioDataUrl = `data:audio/wav;base64,${audioBase64}`;

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioUrl: audioDataUrl }),
    };
  } catch (error: any) {
    console.error('Text-to-Speech Error:', error);
    
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
        error: 'Failed to generate speech',
        details: error.message 
      }),
    };
  }
};
