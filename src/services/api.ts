interface MessageRequest {
  promt_id: string;
  client_id: string;
  api: string;
  message_id: string;
  message: string;
  user_chat_id: string;
  store_user_email: string | null;
}

const API_CONFIG = {
  PROMT_ID: "17796",
  CLIENT_ID: "aefc22b8-8529-43fc-a8c5-45edd80b1a1",
  API_URL: "eu1.api.pro-talk.ru"
};

export async function sendMessage(message: string, messageId: string = "6", userChatId: string = "1") {
  const data: MessageRequest = {
    promt_id: API_CONFIG.PROMT_ID,
    client_id: API_CONFIG.CLIENT_ID,
    api: API_CONFIG.API_URL,
    message_id: messageId,
    message: message,
    user_chat_id: userChatId,
    store_user_email: "None"
  };

  const response = await fetch("https://functions.pro-talk.ru/api/v1.0/chatgpt_widget_message_api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://eu1.emb.atiks.org/upload_tmp", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function getReply(messageId: string = "6") {
  const data = {
    promt_id: API_CONFIG.PROMT_ID,
    client_id: API_CONFIG.CLIENT_ID,
    api: API_CONFIG.API_URL,
    message_id: messageId,
  };

  const response = await fetch("https://functions.pro-talk.ru/api/v1.0/chatgpt_widget_get_reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}