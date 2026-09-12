from dotenv import load_dotenv
from langchain.tools import tool
import os
from tavily import TavilyClient
from bs4 import BeautifulSoup

client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])

# Search agent
@tool
def search_query(query:str):
    """Search for recent information on a given from reliable source and provide Titles , URLs and snippets."""
    response = client.search(
        query=query,
        max_results=5,
    )

    results = []

    for r in response['results']:
        results.append(
            f"Title: {r['title']}\nURL: {r['url']}\nSnippet: {r['content'][:300]}\n"
        )

        return "\n----\n".join(results)