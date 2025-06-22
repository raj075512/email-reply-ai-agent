package com.email.writer.app;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
      private String geminiApiUrl;

     @Value("${gemini.api.key}")
      private String geminiApiKey;

      public EmailGeneratorService(WebClient.Builder webClientBuilder)
      {

          this.webClient= webClientBuilder.build();
      }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional version of the email content. ");
        prompt.append("Start the reply with: \"Thanks for reaching out.\" ");
        prompt.append("Do not include any opening greetings like 'Dear', 'Hi', or 'I hope this email finds you well'. ");
        prompt.append("Please don't generate a subject line. ");

        String tone = emailRequest.getTone();
        if (tone != null && !tone.isEmpty()) {
            prompt.append("Use a ").append(tone).append(" tone. ");
        }

        prompt.append("\nOriginal email:\n").append(emailRequest.getEmailContent());
        prompt.append("\n\nAlways end the email with:\nRegards,\nAshutosh Raj");

        return prompt.toString();

    }

    private String extractResponseContent(String response)
    {
        try
        {
            ObjectMapper mapper  = new ObjectMapper();
            JsonNode rootNode=mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e)
        {
            return "there is a error "+e.getMessage();
        }
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // build the prompt
        String newPrompt = buildPrompt(emailRequest);
        // craft the request

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of("parts", new Object[]{
                                Map.of("text", newPrompt)
                        })
                }
        );
        // do request and return the response of the content

       String response=webClient.post()
               .uri(geminiApiUrl+geminiApiKey)
               .header("content-type","application/json")
               .bodyValue(requestBody)
               .retrieve()
               .bodyToMono(String.class)
               .block();
        System.out.println("got response : " + response);
        return extractResponseContent(response);

      }


}
