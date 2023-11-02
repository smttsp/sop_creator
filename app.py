# import os

from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from career_tool.utils.constants import DEFAULT_GCP_BUCKET
from career_tool.utils.file_utils import save_file_to_cloud
from career_tool.utils.session_utils import SessionInfo


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

load_dotenv(find_dotenv())

session_info = SessionInfo(user="smttsp")


@app.route("/upload", methods=["POST"])
def upload_file():
    print("hi")

    file = request.files["resume_file"]
    if file:
        # file_path = f'tmp/{file.filename}'  # Save the file temporarily
        # file.save(file_path)
        save_file_to_cloud(
            session_info.storage_client,
            file,
            f"{DEFAULT_GCP_BUCKET}/{file.filename}",
        )
        return jsonify({"message": "File uploaded successfully"}), 200
    else:
        return jsonify({"error": "No file provided"}), 400

    # return{"message" :"this is response from back end"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
