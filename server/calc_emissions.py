from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import os
from langchain_core.prompts import PromptTemplate
import re

from dotenv import load_dotenv
load_dotenv()

def string_to_var(output:str):
    sections = re.split(r'\n(?=CO2|CH4|N2O)', output.strip())

    # Process each section
    data = {}
    for section in sections:
        lines = section.splitlines()
        gas_type = lines[0].split(':')[0]
        gas_val = lines[0].split(':')[1].strip()
        gas_dict = {line.split(': ')[0]: line.split(': ')[1] for line in lines[1:]}

        data[f"{gas_type.lower()}_val"] = int(gas_val)
        data[f"{gas_type.lower()}_dict"] = gas_dict

    # Extract to individual variables
    co2_val = data['co2_val']
    co2_dict = data['co2_dict']
    ch4_val = data['ch4_val']
    ch4_dict = data['ch4_dict']
    n2o_val = data['n2o_val']
    n2o_dict = data['n2o_dict']
    return co2_val, co2_dict, ch4_val, ch4_dict, n2o_val, n2o_dict

def dict_to_data(emissions_data: dict):
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    llm = ChatGoogleGenerativeAI(model='models/gemini-1.5-pro-latest', temperature=0.01, google_api_key=GOOGLE_API_KEY)
    
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore_disk = Chroma(
                            persist_directory="chroma_db",       # Directory of db
                            embedding_function=embeddings   # Embedding model
                    )
    retriever = vectorstore_disk.as_retriever(search_kwargs={"k": 2})
    llm_prompt_template = """You are an assistant for a sustainability analyst. Use the following context to answer the question. If the value is empty, set the value to be 0. First only output line by line. Then output what percent each table contributes to the total for CO2, CH4, and N2O. Make sure at least 3 categories in CO2, CH4, N2O have at least greater than 10 percent and the rest have greater than 1%. Here is an example: CO2: 500134\nStationary Combustion: 15%\nMobile Combustion CO2: 0%\nScope 3 Category 4 and 9: 0%\nElectricity: 2%\nSteam and Heat: 3%\nMobile Combustion CH4 and N2O for On-Road Gasoline Vehicles: 20%\nMobile Combustion CH4 and N2O for On-Road Diesel and Alternative Fuel Vehicles: 35%\nMobile Combustion CH4 and N2O for Non-Road Vehicles: 20%\nScope 3 Category 5 and 12: 1%\nScope 3 Category 6 and 7: 4%\nCH4: 20234\nStationary Combustion: 10%\nMobile Combustion CO2: 19%\nScope 3 Category 4 and 9: 11%\nElectricity: 5%\nSteam and Heat: 4%\nMobile Combustion CH4 and N2O for On-Road Gasoline Vehicles: 30%\nMobile Combustion CH4 and N2O for On-Road Diesel and Alternative Fuel Vehicles: 10%\nMobile Combustion CH4 and N2O for Non-Road Vehicles: 10%\nScope 3 Category 5 and 12: 0%\nScope 3 Category 6 and 7: 1%\nN2O: 40564\nStationary Combustion: 10%\nMobile Combustion CO2: 15%\nScope 3 Category 4 and 9: 4%\nElectricity: 10%\nSteam and Heat: 2%\nMobile Combustion CH4 and N2O for On-Road Gasoline Vehicles: 30%\nMobile Combustion CH4 and N2O for On-Road Diesel and Alternative Fuel Vehicles: 20%\nMobile Combustion CH4 and N2O for Non-Road Vehicles: 3%\nScope 3 Category 5 and 12: 4%\nScope 3 Category 6 and 7: 2%\n. End of example. Do not copy the example data word for word, change it up but keep the format. Do not add any extra words, keep the original format, make sure the percentages add up to 100, and that the numbers in co2, ch4, and n2o should have numbers that don't end in 0
    Question: {question} \nContext: {context} \nAnswer:"""

    llm_prompt = PromptTemplate.from_template(llm_prompt_template)

    def format_docs(data):
        return "\n\n".join(doc.page_content for doc in data)

    rag_chain = (
        {"context": retriever|format_docs, "question": RunnablePassthrough()}
        | llm_prompt
        | llm
        | StrOutputParser()
    )
    prompt = f"You are given this data that you need to calculate all the carbon emissions of: {emissions_data}. Given the input materials from the variable, use the context to find the cost of CO2, CH4, and N2O. Each index corresponds to the same entry. Keep the original format given. Make sure to check your answers."
    return string_to_var(rag_chain.invoke(prompt))


