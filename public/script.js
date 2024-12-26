document.getElementById('submit-query').addEventListener('click', async () => {
  const userQuery = document.getElementById('user-query').value;
  
  if (!userQuery.trim()) {
    return;
  }

  // Display user query in the chat box
  appendMessage('user', userQuery);

  // Send the query to the server
  const response = await fetch('/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: userQuery })
  });

  const data = await response.json();

  // Display response from the bot
  if (data.success) {
    const botMessage = data.data.map(item => {
      return `<strong>${item.title}</strong><br>${item.description}`;
    }).join('<br><br>');

    appendMessage('bot', botMessage);
  } else {
    appendMessage('bot', data.message || 'Sorry, I could not find any relevant results.');
  }

  // Clear the input field
  document.getElementById('user-query').value = '';
});

// Function to append messages to the chat box
function appendMessage(type, message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.innerHTML = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
