import { NextResponse } from 'next/server';

export async function GET() {
  const isEnvSet = !!process.env.AZURE_OPENAI_API_KEY;
  const apiKeyLastFour = process.env.AZURE_OPENAI_API_KEY 
    ? `...${process.env.AZURE_OPENAI_API_KEY.slice(-4)}` 
    : 'not set';
    
  // Check if env variables are set
  return NextResponse.json({
    message: 'Environment check',
    envVars: {
      AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT || 'not set',
      AZURE_OPENAI_API_KEY: apiKeyLastFour,
      AZURE_OPENAI_MODEL: process.env.AZURE_OPENAI_MODEL || 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    },
    isConfigured: isEnvSet && !!process.env.AZURE_OPENAI_ENDPOINT
  });
} 