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
    """
    Search for recent and reliable information on the given topic.
    
    Return only sources that are likely to be accessible and scrapeable by a standard HTTP/web scraping tool.
    
    Prioritize:
    
    * Government websites
    * Official organizations
    * Universities and research institutions
    * Reputable news websites with publicly accessible articles
    * Websites with article content available directly in the HTML
    
    Avoid:
    
    * Websites requiring login or subscription
    * Websites that require heavy JavaScript to display the content
    * Cloudflare or bot-protected websites
    * Social media pages
    * Search-result pages
    * Websites that block automated access
    * PDFs or downloadable files unless specifically requested
    * Pages that are only previews, summaries, or links to another source
    
    For each source, provide:
    
    1. Title
    2. URL
    3. A short snippet explaining why the source is relevant
    
    Prefer multiple independent sources rather than relying on a single website.
    
    The goal is to provide sources that another agent can directly access and scrape for deeper research.

    """
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
    """
    1. Identify several relevant URLs from the search results.
    2. Try to scrape the most relevant source first.
    3. If the website blocks access, fails, or cannot be scraped,
       move to the next URL.
    4. Try at least 3 different sources if necessary.
    5. Prefer reliable sources such as:
       - government websites
       - reputable news organizations
       - research institutions
       - official organizations
    6. Return the useful information you successfully retrieved.
    7. Clearly mention which sources were successfully accessed.
    """

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