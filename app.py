# import os
import os.path

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
        user = session_info.user
        session_id = session_info.session_id
        bucket = session_info.default_gcp_bucket
        file_path = os.path.join(bucket, user, session_id, file.filename)

        save_file_to_cloud(
            session_info.storage_client,
            file,
            file_path
        )
        return jsonify({"message": "File uploaded successfully"}), 200
    else:
        return jsonify({"error": "No file provided"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
