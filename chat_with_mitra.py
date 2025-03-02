from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import config  # Import API keys from config.py

# Initialize Together.AI-powered LLM
llm = ChatOpenAI(
    model="meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    openai_api_key=config.TOGETHER_API_KEY,
    openai_api_base="https://api.together.xyz/v1"
)

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

        messages = [
            SystemMessage(content="You are a mental health support chatbot. Be empathetic and supportive."),
            HumanMessage(content=user_message)
        ]
        
        response = llm(messages)
        return {"response": response.content}

    except Exception as e:
        return {"error": str(e)}

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
