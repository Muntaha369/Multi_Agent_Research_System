from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agents import search_agent,scrape_agent,critic_chain,writer_chain

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def research(topic:str):

    state = {}

    print("Invoking search Agent")
    
    search_result = search_agent.invoke({"messages":[{
    "role": "user",
    "content": f"find latest and reliable information on {topic}"
    }]})
    
    state["search_result"] = search_result["messages"][-1].content

    print("Invoking scraping Agent")

    scrape_result = scrape_agent.invoke({"messages":[{
        "role":"user",
        "content":f"""
                    Based on the following search results about '{topic}'
                    pick the most relevant URL and scrape it for deeper content.\n\n
                    Search Results:\n{state['search_result'][:800]}
        """
    }]})

    state["scrape_result"] = scrape_result["messages"][-1].content

    research_string = (
        f"""
            Search_result : \n {state["search_result"]}\n
            Scrape_result : \n {state["scrape_result"]}\n
        """
    )

    print("Writing your content")
    
    state["report"] = writer_chain.invoke({
        "topic":topic,
        "research": research_string
    })

    print("Evaluating content")
    
    state["feedback"] = critic_chain.invoke({
        "report":state['report']
    })

    print("\n ========================================== \n")

    print("\n  Report\n",state['report'])
    print("\n Critic \n", state['feedback'])

    return {
            "topic": topic,
            "search_result": state["search_result"],
            "scrape_result": state["scrape_result"],
            "report": state["report"],
            "feedback": state["feedback"]
        }

@app.post("/research")
def run_research(request: dict):

    topic = request["topic"]

    return research(topic)
