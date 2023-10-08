import open_clip
import torch
from PIL import Image
import numpy as np
from open_clip import tokenizer

class Search:
    def __init__(self):
        self.model,_,self.preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='laion2b_e16')
        self.model.eval()
        self.batch_size=4
        self.images=[]
        self.image_features=[]

    @torch.no_grad()
    def process_image(self, image):
        print("Processsed")
        return self.preprocess(image)

    @torch.no_grad()
    def process_batch(self, batch):
        print("Processed batch")
        return self.model.encode_image(torch.tensor(np.stack(batch))).float()

    @torch.no_grad()
    def process_query(self, query):
        text_tokens = tokenizer.tokenize(query)
        text_features=self.model.encode_text(text_tokens).float()
        return text_features
    
    # @torch.no_grad()
    # def get_image_features(self, path_names):
    #     # self.images=[]
    #     self.path_names=path_names
    #     for i, name in enumerate(self.path_names):
    #         image=Image.open(name)
    #         self.images.append(self.preprocess(image))
    #     print(f"{i} images processed")

    #     # self.image_features=[]
        
    #     with torch.no_grad():
    #         for  i in range(0, len(self.path_names),self.batch_size):
    #             batch_images= self.images[i:i+self.batch_size]
    #             image_input= torch.tensor(np.stack(batch_images))
    #             batch_features =self.model.encode_image(image_input).float()
    #             self.image_features.append(batch_features)

    #     self.image_features = torch.cat(self.image_features)
    #     self.image_features /= self.image_features.norm(dim=-1,keepdim=True )
    #     print("features extracted")
    #     print(self.image_features.shape)
    #     return self.image_features
    
    # def get_text_features(self,query):
    #     self.query = query

    #     self.text_tokens = tokenizer.tokenize(self.query)
    #     with torch.no_grad():
    #         self.text_features=self.model.encode_text(self.text_tokens).float()

    #     self.text_features /= self.text_features.norm(dim=-1, keepdim=True)

    #     return self.text_features
        

    # def get_n_matches(self, image_features, text_features, path_names,n=4):
    #     self.n=n
    #     self.image_features=image_features
    #     self.text_features=text_features
    #     self.path_names=path_names
    #     self.similarity = self.text_features.numpy() @ self.image_features.numpy().T
    #     print(self.similarity.shape)
    #     sorted_items = sorted(zip(list(self.similarity.squeeze(),self.path_names),reverse=True))
    #     top_items_with_scores = [(item, score) for score, item in sorted_items[:self.n]]
    #     return top_items_with_scores