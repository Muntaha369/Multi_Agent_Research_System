from dotenv import load_dotenv
from langchain.tools import tool
import os
import requests
from tavily import TavilyClient
from bs4 import BeautifulSoup

load_dotenv()

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

@tool
def scraper(url):
    """Scrape and return clean text content from a given URL for deeper reading."""

    response = requests.get(url, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
    try:
        soup = BeautifulSoup(response.text, "html.parser")
    
        dcomp_tags = ["script", "style", "nav", "footer"]
    
        for tag in soup:
            if tag in dcomp_tags:
                tag.decompose

        return soup.get_text(separator=" ", strip=True)[:3000]
    except Exception as e:
        print(f"Error in scraping \n ERROR: {e}")