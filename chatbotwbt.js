const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Initialize the OpenAI API
const openai = new OpenAI('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');

// Define a function to generate a response from the GPT-3.5-Turbo model
async function generateResponse(inputText) {
  const response = await openai.complete({
    engine: 'davinci',
    prompt: inputText,
    maxTokens: 3000, // Maximum length of the generated response
    temperature: 0.5, // Controls the "creativity" of the generated response
    n: 1 // Number of responses to generate
  });
  return response.data.choices[0].text;
}

// Define a function to add a message to the chatbot
function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (sender === 'chatbot') {
    messageElement.classList.add('chatbot-message');
  } else {
    messageElement.classList.add('user-message');
  }
  messageElement.innerText = text;
  chatbotMessages.appendChild(messageElement);
}

// Define an event listener for the send button
sendButton.addEventListener('click', async () => {
  const userInputText = userInput.value;
  addMessage(userInputText, 'user');
  userInput.value = '';
  const chatbotResponse = await generateResponse(userInputText);
  addMessage(chatbotResponse, 'chatbot');
});
