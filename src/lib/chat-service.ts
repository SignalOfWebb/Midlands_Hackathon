type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ChatCompletionResponse = {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export async function getChatCompletion(messages: Message[]): Promise<string> {
  try {
    console.log('Starting API request to chat service');
    
    // Call our API route instead of Azure OpenAI directly
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error response from chat API:', data);
      throw new Error(`API request failed: ${response.status} - ${data.error || 'Unknown error'}`);
    }

    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response from API:', data);
      throw new Error('Received invalid response format from API');
    }

    console.log('Successfully received response from chat API');
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in getChatCompletion:', error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}

export function createSystemPrompt(context?: string): string {
  const basePrompt = `You are an AI learning assistant for the Birmingham AI Navigator, an AI literacy platform helping council staff learn about AI concepts and technologies.

Your role is to:
1. Answer questions about AI concepts in a clear, educational manner
2. Provide practical examples of AI applications relevant to council work
3. Help users navigate the learning platform
4. Suggest relevant learning modules based on the user's interests or questions

Keep your responses concise, friendly, and focused on helping the user learn.`;

  if (context) {
    return `${basePrompt}\n\nThe user is currently viewing: ${context}`;
  }

  return basePrompt;
} 