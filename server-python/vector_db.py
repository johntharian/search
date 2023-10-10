import pinecone
import numpy as np
from decouple import config

from model import Search

search = Search()

pinecone_api_key = config('PINECONE_API_KEY')
pinecone.init(api_key=pinecone_api_key, environment="gcp-starter")

index = pinecone.Index("images")


def save_to_db(image, data):
    print("here")
    images = search.process_batch(image)

    _ids = [list(d.keys())[0] for d in data]
    names = [list(d.values())[0] for d in data]

    metadata = [{"name": name} for name in names]

    index.upsert(vectors=zip(_ids, images.tolist(), metadata))
    print("data inserted to db")


def get_similar(query):
    res = index.query(query, top_k=8, include_metadata=True)
    print(res)
    ids = [item["id"] for item in res["matches"]]
    print(ids)
    return ids
