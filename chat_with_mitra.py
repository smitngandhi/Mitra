from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import uvicorn
import config  # Import API keys from config.py

# Initialize Together.AI-powered LLM
llm = ChatOpenAI(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    openai_api_key=config.TOGETHER_API_KEY,
    openai_api_base="https://api.together.xyz/v1"
)

# Initialize Sentiment Analyzer
analyzer = SentimentIntensityAnalyzer()

# FastAPI app setup
app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: dict):
    try:
        user_message = request.get("message")
        if not user_message:
            raise HTTPException(status_code=400, detail="Message is required")

        # Perform Sentiment Analysis
        scores = analyzer.polarity_scores(user_message)
        compound_score = scores['compound']

        # Normalize the sentiment score to the range (0,1)
        sentiment_score = (compound_score + 1) / 2  # Maps [-1,1] to [0,1]

        # Generate chatbot response
        messages = [
            SystemMessage(content="You are a mental health support chatbot. Be empathetic and supportive."),
            HumanMessage(content=user_message)
        ]
        response = llm(messages)

        return {
            "chatbot_response": response.content,
            "sentiment_score": round(sentiment_score, 2)  # Round to 2 decimal places
        }

    except Exception as e:
        return {"error": str(e)}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
