client<llm> OpenRouter {
  provider openai-generic
  options {
    base_url "https://openrouter.ai/api/v1"
    model "google/gemma-3-27b-it:free"
    api_key env.OPENROUTER_API_KEY
  }
}
