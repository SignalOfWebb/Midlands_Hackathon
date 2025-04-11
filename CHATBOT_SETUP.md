# AI Learning Assistant Chatbot

This document explains how to set up and configure the AI Learning Assistant chatbot for the Birmingham AI Navigator platform.

## Overview

The AI Learning Assistant is an integrated chatbot powered by Azure OpenAI's GPT-4o model. It helps users:

- Get answers to questions about AI concepts
- Receive guidance on navigating the learning platform
- Get explanations about content in the current module/lesson
- Find relevant learning resources based on their interests

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root with the following configuration:

```
AZURE_OPENAI_API_KEY=your_api_key_from_hackathon
```

Replace `your_api_key_from_hackathon` with the actual API key provided by the hackathon.

**IMPORTANT**: After creating the `.env.local` file, restart your development server for the changes to take effect:

```bash
# Stop your current server (Ctrl+C) and then restart
npm run dev
```

### 2. Deployment Configuration

For production deployment, add the following environment variables to your hosting platform:

- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key

### 3. Context-Aware Chat Implementation

To make the chatbot aware of the lesson or module a user is currently viewing, you can pass context to the ChatWidget component:

```tsx
// Example in a lesson page
<ChatWidget 
  context={{
    title: lessonData.title,
    content: currentSection?.content
  }}
/>
```

## Troubleshooting

If you're seeing the error "I'm sorry, I encountered an error. Please try again." when using the chatbot, follow these steps:

### 1. Verify Environment Variables

- Ensure you have created a `.env.local` file in the project root directory
- Make sure the API key is correctly entered without any typos or extra spaces
- Restart your development server after creating/updating the `.env.local` file

### 2. Check API Configuration

You can check if your API configuration is correctly loaded by visiting:

```
http://localhost:3000/api/test-env
```

This will show if your environment variables are properly set up without revealing your full API key.

### 3. Check Browser Console

Open your browser's developer tools (F12) and look for error messages in the Console tab. Common errors include:

- `API request failed: 401` - This indicates an authentication error, usually from an invalid API key
- `API request failed: 404` - This suggests the API endpoint might be incorrect
- `Failed to fetch` - This can indicate network issues or CORS problems

### 4. Common Issues and Solutions

#### API Key Not Loading

If the API key isn't loading:

1. Make sure the file is named exactly `.env.local` (not `.env` or any other variation)
2. Check if the variable name is exactly `AZURE_OPENAI_API_KEY`
3. Restart your development server
4. Try closing and reopening your code editor

#### Azure OpenAI API Errors

If you see errors from the Azure OpenAI API:

1. Verify that the API key has sufficient credits/quota
2. Check that the model name (`gpt-4o`) is available on your API key
3. Ensure the API version is compatible (`2024-02-01`)

#### CORS Issues

If you're seeing CORS errors:

1. Make sure all requests are going through the server-side API route
2. Check that the Next.js API route is properly configured

## Customization

### System Prompt

To customize how the chatbot responds, you can modify the system prompt in `src/lib/chat-service.ts`. The system prompt sets the tone, personality, and capabilities of the AI assistant.

### UI Customization

The chat interface can be customized by modifying the `ChatWidget.tsx` component. It uses Chakra UI components and follows the black and white theme with blue accent color (#4154de).

## Architecture

1. **Frontend Component**: `ChatWidget.tsx` provides the chat interface
2. **API Route**: `/api/chat` handles secure communication with Azure OpenAI
3. **Chat Service**: `chat-service.ts` provides helper functions and manages prompts

## Security Considerations

- The API key is stored in environment variables and never exposed to the client
- API requests are proxied through a server-side API route for security
- User messages are validated before being sent to the API 