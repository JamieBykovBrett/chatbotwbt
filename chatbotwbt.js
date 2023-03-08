const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Define a function to generate a response from the GPT-3.5-Turbo model
async function generateResponse(inputText) {
  const response = await fetch('https://api.gpt-3.5-turbo.com/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <script src="https://cdn.jsdelivr.net/npm/@openai/api@0.8.0/dist/index.iife.min.js"></script>
<script src="chatbot.js"></script>
'
    },
    body: JSON.stringify({
      prompt: inputText,
      max_tokens: 3000, // Maximum length of the generated response
      temperature: 0.5, // Controls the "creativity" of the generated response
      n: 1 // Number of responses to generate
    })
  });
  const responseData = await response.json();
  return responseData.choices[0].text;
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