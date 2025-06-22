
# 📧 Smart Email AI Agent

A smart AI-powered assistant that connects to your email inbox, summarizes content, detects tone, and generates intelligent replies using Spring Boot, Spring AI, and Gemini LLM — all integrated with a Chrome Extension for seamless usage.

---

## 🚀 Features

* 🔗 **Email Integration**: Fetch emails securely using IMAP via Chrome Extension
* 🧠 **AI Summarization**: Generates concise summaries using Gemini LLM (via Spring AI)
* 💬 **Smart Replies**: Drafts context-aware responses automatically
* 🎯 **Tone Detection**: Understands the mood (formal, urgent, casual) of emails
* 🔐 **Secure Access**: JWT-based authentication and user session management
* 🌐 **RESTful APIs**: Modular endpoints for email, summary, and reply actions

---

## 🛠️ Tech Stack

| Layer        | Technologies                       |
| ------------ | ---------------------------------- |
| Backend      | Java, Spring Boot, Spring AI       |
| AI Services  | Gemini LLM (via Spring AI)         |
| Email Access | JavaMail, Chrome Extension (IMAP)  |
| Security     | Spring Security, JWT               |
| Database     | H2 (Dev) / MySQL/PostgreSQL (Prod) |
| Build Tool   | Maven                              |

---

## 📷 Chrome Extension Integration

* The Chrome Extension securely accesses the user’s inbox
* Communicates with the Spring Boot backend to trigger AI-based processing
* Injects smart summaries and reply suggestions into the Gmail UI

---

## 📂 Project Structure

```
📦smart-email-ai-agent
 ┣ 📁src
 ┃ ┣ 📁main
 ┃ ┃ ┣ 📁java/com/example/emailai
 ┃ ┃ ┃ ┣ 📄EmailController.java
 ┃ ┃ ┃ ┣ 📄EmailService.java
 ┃ ┃ ┃ ┣ 📄AIService.java
 ┃ ┃ ┃ ┣ 📄AuthController.java
 ┃ ┣ 📁resources
 ┃ ┃ ┣ 📄application.yml
 ┃ ┃ ┣ 📄templates/index.html
 ┣ 📁chrome-extension
 ┃ ┣ 📄manifest.json
 ┃ ┣ 📄content.js
 ┃ ┣ 📄background.js
 ┃ ┣ 📄popup.html
```

---

## 📡 API Endpoints

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/emails`              | Get list of fetched emails |
| GET    | `/emails/{id}/summary` | Get AI-generated summary   |
| POST   | `/emails/{id}/reply`   | Generate smart reply       |
| POST   | `/auth/login`          | User login                 |
| POST   | `/auth/register`       | User registration          |

---

## ⚙️ Setup Instructions

1. **Clone the Repo**

```bash
git clone https://github.com/your-username/smart-email-ai-agent.git
cd smart-email-ai-agent
```

2. **Configure Application**

Update `application.yml` with:

```yaml
openai:
  api-key: YOUR_GEMINI_API_KEY
spring:
  mail:
    username: your-email
    password: your-password
    host: smtp.gmail.com
    port: 587
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true
```

3. **Run the Backend**

```bash
mvn spring-boot:run
```

4. **Install Chrome Extension**

* Go to `chrome://extensions/`
* Enable "Developer Mode"
* Click "Load unpacked" and select the `chrome-extension/` folder

---

## ✅ Demo

> Coming soon: GIFs and video walkthrough showing Gmail integration and smart AI replies.

---

## ✍️ Author

**Ashutosh Raj** – [LinkedIn](https://www.linkedin.com/in/ashraj1/) | [GitHub](https://github.com/raj075512)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like to add badges, deployment info (like Docker), or video links!
