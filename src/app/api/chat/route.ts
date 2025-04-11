import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    console.error('Invalid request: messages array is required');
    return NextResponse.json({ error: 'Invalid request: messages array is required' }, { status: 400 });
  }

  const OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
  const OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
  const OPENAI_MODEL = process.env.AZURE_OPENAI_MODEL || 'gpt-35-turbo';
  const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || '2024-02-01';
  const DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-35-turbo';

  // Log environment variables (without revealing full API key)
  console.log('Environment variables check:');
  console.log('AZURE_OPENAI_ENDPOINT:', OPENAI_ENDPOINT ? '✓ Set' : '✗ Missing');
  console.log('AZURE_OPENAI_API_KEY:', OPENAI_API_KEY ? '✓ Set' : '✗ Missing');
  console.log('AZURE_OPENAI_MODEL:', OPENAI_MODEL);
  console.log('AZURE_OPENAI_API_VERSION:', API_VERSION);
  console.log('AZURE_OPENAI_DEPLOYMENT_NAME:', DEPLOYMENT_NAME);

  if (!OPENAI_API_KEY) {
    console.error('Azure OpenAI API key is missing');
    return NextResponse.json({ error: 'Server configuration error: API key missing' }, { status: 500 });
  }

  if (!OPENAI_ENDPOINT) {
    console.error('Azure OpenAI endpoint is missing');
    return NextResponse.json({ error: 'Server configuration error: API endpoint missing' }, { status: 500 });
  }

  try {
    // Format the URL according to Azure OpenAI documentation - use deployments/{deployment-name}/chat/completions
    const apiUrl = `${OPENAI_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`;
    console.log(`Making request to ${apiUrl}`);
    
    const requestBody = JSON.stringify({
      messages,
      max_tokens: body.max_tokens || 800,
      temperature: body.temperature || 0.7,
    });
    
    console.log('Request body:', JSON.stringify({
      messages: messages.map(m => ({ role: m.role, content: m.content.substring(0, 50) + (m.content.length > 50 ? '...' : '') })),
      max_tokens: body.max_tokens || 800,
      temperature: body.temperature || 0.7,
    }));

    console.log('API Key (last 4 chars):', OPENAI_API_KEY ? `...${OPENAI_API_KEY.slice(-4)}` : 'not set');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': OPENAI_API_KEY
      },
      body: requestBody,
    });

    // Log response status
    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error status:', response.status);
      console.error('OpenAI API error response:', errorText);
      return NextResponse.json(
        { error: `OpenAI API error ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
} 