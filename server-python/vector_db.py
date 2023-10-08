import pinecone
import numpy as np

from model import Search

search=Search()

pinecone.init(
    api_key="24a1456c-b50b-45d2-b9eb-32721c6c3421", environment="gcp-starter"
    )

index = pinecone.Index("images")
# import torch

# Create a random tensor of shape (2, 512)
# tensor_shape = (2, 512)
# tensor = torch.rand(*tensor_shape)
# def test():
#     _ids=['1QKZAVbPydGs0sQdSpPr1u91P9P5Q0h14', '1TKtJ_ULjDKo5hFceAE3s-AFjsUrGij8v']
#     names=['IMG_5581.JPG', 'Volunteer Certificate_Data Set 9.jpg']
#     metadata= [{"name": name} for name in names]
#     tensor_shape = (2, 512)
#     tensor = torch.rand(*tensor_shape).tolist()
#     index.upsert(vectors=zip(_ids,tensor,metadata))

# test()

def save_to_db(image, data) :
    print("here")
    images=search.process_batch(image)

    _ids = [list(d.keys())[0] for d in data]
    names = [list(d.values())[0] for d in data]

    metadata= [{"name": name} for name in names]
    # print(_ids)
    # print(names)
    # # print(len(image))
    # print(images)
    index.upsert(vectors=zip(_ids,images.tolist(),metadata))
    print("data inserted to db")


def get_similar(query) :
    res = index.query(
        query,
        top_k=8,
        include_metadata=True
    )
    print(res)
    ids = [item['id'] for item in res['matches']]
    print(ids)
    return ids
# def test():
#     query="friends sitting"
#     print(search.process_query(query).tolist())

# test()