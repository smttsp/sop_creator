import base64
import io
import os

import openai
from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from career_tool.resume import Resume, ResumeAnalyzer
from career_tool.utils.file_utils import save_file_to_cloud
from career_tool.utils.session_utils import SessionInfo


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

load_dotenv(find_dotenv())

session_info = SessionInfo(user="smttsp")
openai.api_key = session_info.openai_api_key


def get_wc_as_binary(wc):
    image = wc.to_image()

    buffered = io.BytesIO()
    image.save(buffered, format="PNG")

    image_binary = buffered.getvalue()

    image_data = base64.b64encode(image_binary).decode("utf-8")
    return image_data


@app.route("/upload", methods=["POST"])
def get_word_cloud():
    print("hi")

    file = request.files["resume_file"]
    if file:
        user = session_info.user
        session_id = session_info.session_id
        bucket = session_info.default_gcp_bucket
        file_path = os.path.join(bucket, user, session_id, file.filename)

        # save_file_to_cloud(session_info.storage_client, file, file_path)

        resume = Resume(file)

        image_data = get_wc_as_binary(resume.wc)
        data_dict = resume.wf
        data_list = [
            {"id": k, "name": round(v, 2)} for k, v in data_dict.items()
        ]

        response_data = {"image": image_data, "dict": data_list}

        return jsonify({"message": response_data}), 200
    else:
        return jsonify({"error": "No file provided"}), 400


@app.route("/upload2", methods=["POST"])
def get_ai_recommendation():
    print("hi2")

    file = request.files["resume_file"]
    if file:
        # resume = Resume(file)
        # ra = ResumeAnalyzer(resume, session_info)
        # response_data = {"analysis": ra.recommendations}
        response_data=[{"id":1, "current":"this is current value", "recommendation":"this is recommendation value", "reason":"this is reason value"},
                       {"id":2, "current":"this is current value", "recommendation":"this is recommendation value", "reason":"this is reason value"},
                       {"id":3, "current":"this is current value", "recommendation":"this is recommendation value", "reason":"this is reason value"},
                       {"id":4, "current":"this is current value", "recommendation":"this is recommendation value", "reason":"this is reason value"},
                       {"id":5, "current":"this is current value", "recommendation":"this is recommendation value", "reason":"this is reason value"}]

        # return jsonify({"message": response_data}), 200
        return jsonify({"message": response_data}), 200
    else:
        return jsonify({"error": "No file provided"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
