import os

# from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import base64

# from career_tool.utils.file_utils import save_file_to_cloud
# from career_tool.utils.session_utils import SessionInfo
# from career_tool.resume import Resume
 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# load_dotenv(find_dotenv())

# session_info = SessionInfo(user="smttsp")


@app.route("/upload", methods=["POST"])
def upload_file():
    print("hi")

    file = request.files["resume_file"]
    if file:
        # user = session_info.user
        # session_id = session_info.session_id
        # bucket = session_info.default_gcp_bucket
        # file_path = os.path.join(bucket, user, session_id, file.filename)

        # save_file_to_cloud(
        #     session_info.storage_client,
        #     file,
        #     file_path
        # )

        # resume = Resume(file)
        image_path = 'word-cloud.png'
        # to check if the word_cloud image is in the file system
        # since we will have the image file , we dont need to check existance
        if os.path.exists(image_path):  
            with open(image_path, 'rb') as image_file:
                image_data = base64.b64encode(image_file.read()).decode('utf-8')

        data_dict = [
            {"id": 0, "name": "Naol"},
            {"id": 1, "name": "John"},
            {"id": 2, "name": "Alice"},
            {"id": 3, "name": "Bob"}
        ]

        response_data = {
            "image": image_data,
            "dict": data_dict
        }

        return jsonify({"message": response_data}), 200
    else:
        return jsonify({"error": "No file provided"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
