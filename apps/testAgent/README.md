
# Test AI Agent
 
> A tool-calling AI agent built with LangChain, powered by an OpenRouter-hosted LLM.

## Tech stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | JavaScript / TypeScript |
| AI framework | LangChain |
| Agent system | `createAgent()` — ReAct-based agent |
| Model provider | OpenRouter (OpenAI-compatible API) |
| LLM wrapper | `@langchain/openai` |
| Schema validation | Zod |
| Tools system | LangChain `tool()` API |

## Docker

### Pull the image
```bash
docker pull sujanthapa1212/agent:latest
```

### Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENROUTER_API_KEY` | ✅ yes | - | Get yours at https://openrouter.ai |
| `MODEL` | ❌ no | `mistralai/mistral-7b-instruct:free` | Any model from https://openrouter.ai/models |

### Run
```bash
docker run -p 8080:8080 \
  -e OPENROUTER_API_KEY=your-key \
  -e MODEL=mistralai/mistral-7b-instruct:free \
  sujanthapa1212/agent:latest
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/agent/status` | Health check |
| `POST` | `/agent/chat` | Send a message to the agent |

### Chat request
```json
{
  "message": "your message here"
}
```
 
### Configuration
 
Set your OpenRouter API key as an environment variable:
 
```bash
OPENROUTER_API_KEY=your_key_here
```
 
### Running the agent
 
```bash
node index.js
```
 
