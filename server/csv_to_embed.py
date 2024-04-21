from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from langchain_community.document_loaders import CSVLoader

from dotenv import load_dotenv
load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
for i in range(1,11):
    loader = CSVLoader(f"/Users/ethanyuan/dev/lahacks-2024/server/data/Table{i}.csv")
    print(f"storing table{i} csv")
    data = loader.load()
    
    vector_store_directory = f"/Users/ethanyuan/dev/lahacks-2024/server/chroma_db/Table{i}"
    print(f"Storing data in {vector_store_directory}")
    vectorstore = Chroma.from_documents(
        documents=data,
        embedding=embeddings,
        persist_directory=vector_store_directory
    )

