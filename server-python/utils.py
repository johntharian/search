import requests
import io
from PIL import Image
import numpy as np

from model import Search
from vector_db import save_to_db, get_similar

search = Search()


def get_images(file, access_token):
    file_id = file["id"]
    file_name = file["name"]

    try:
        response = requests.get(
            f"https://www.googleapis.com/drive/v3/files/{file_id}?alt=media",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        if response.status_code == 200:
            image_data = response.content

            # Create a Pillow (PIL) Image from the image data
            pillow_image = Image.open(io.BytesIO(image_data))

            # Convert the PIL Image to a numpy array
            image = search.process_image(pillow_image)

            print(f"{file_name} converted and added to the list")

            return image, {file_id: file_name}
        else:
            print(f"Error downloading {file_name}: {response.status_code}")
    except Exception as error:
        print(f"Error downloading {file_name}: {error}")


def index_images(code):
    access_token = code.access_token

    image_array = []
    name_array = []

    nextPageToken = None
    counter = 1

    image_counter = 0
    total_images = 0

    Continue = True
    while Continue:
        print(f"Page {counter}")

        if counter == 1:
            url = "https://www.googleapis.com/drive/v3/files?q=mimeType='image/jpeg'"
        else:
            url = f"https://www.googleapis.com/drive/v3/files?q=mimeType='image/jpeg'&pageToken={nextPageToken}"

        try:
            # print(url)
            response = requests.get(
                url, headers={"Authorization": f"Bearer {access_token}"}
            )

            if response.status_code == 200:
                data = response.json()

                if "nextPageToken" in data:
                    counter += 1
                    files = data["files"]
                    nextPageToken = data["nextPageToken"]
                else:
                    nextPageToken = None
                    Continue = False
                    break

                files_test = files

                for file in files_test:
                    image, id = get_images(file, access_token)
                    image_array.append(image)
                    name_array.append(id)

                    image_counter += 1
                    total_images += 1

                    if image_counter == 64:
                        save_to_db(image_array, name_array)
                        image_array = []  # Clear the array
                        name_array = []  # Clear the names
                        image_counter = 0

                        # Continue =False
                        # break

            else:
                print(f"Error fetching files from Google Drive: {response.status_code}")
                return
                break

        except Exception as error:
            print(f"Error in fetching files: {error}")
            break

    if image_counter > 0:
        save_to_db(image_array, name_array)

    print(f"Download of {total_images} completed")
    return "done"


# def get_image_matches(images, access_token) :
#     data=[]
#     for _id in  images:
#         response  = requests.get(
#             f"https://www.googleapis.com/drive/v3/files/{_id}?alt=media",
#             headers={
#                 "Authorization": f"Bearer {access_token}"
#             }
#         )


def get_matches(query):
    query = search.process_query(query).tolist()
    res = get_similar(query)
    # images = get_image_matches(res, access_token)
    return res
