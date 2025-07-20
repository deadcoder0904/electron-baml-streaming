client<llm> CerebrasClient {
  provider openai-generic
  options {
    base_url "https://api.cerebras.ai/v1"
    api_key env.CEREBRAS_API_KEY
    model "llama-3.3-70b"
		supports_streaming true
  }
}
