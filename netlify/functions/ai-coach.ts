import { Handler } from '@netlify/functions';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const handler: Handler = async (event) => {
  // CORS headers
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
    const { message, context } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Build system prompt with user context
    const systemPrompt = `You are an AI Life Coach helping users achieve their goals and transform their lives. 
You have access to the user's current data:
${context ? JSON.stringify(context, null, 2) : 'No context available'}

Provide personalized, actionable advice based on their goals, habits, exercise, diet, and progress.
Be encouraging, specific, and data-driven. Keep responses concise but meaningful.`;

    // Call Groq API with Llama 3
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      model: 'llama3-70b-8192', // or 'mixtral-8x7b-32768'
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response }),
    };
  } catch (error: any) {
    console.error('AI Coach Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message 
      }),
    };
  }
};
