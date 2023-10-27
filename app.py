import os

from flask_cors import CORS

from flask import Flask, request, jsonify
from career_tool.utils.file_utils import save_file_to_cloud
from career_tool.utils.constants import DEFAULT_GCP_BUCKET
from google.cloud import storage
from career_tool.utils.session_utils import SessionInfo


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
session_info = SessionInfo(user="smttsp")


@app.route('/upload', methods=['POST'])
def upload_file():
    print("hi")
    file = request.files['file']
    if file:
        # file_path = f'tmp/{file.filename}'  # Save the file temporarily
        # file.save(file_path)
        save_file_to_cloud(session_info.storage_client, file, f'{DEFAULT_GCP_BUCKET}/{file.filename}')
        return jsonify({'message': 'File uploaded successfully'}), 200
    else:
        return jsonify({'error': 'No file provided'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


# from career_tool.utils.constants import DEFAULT_GCP_BUCKET
# from career_tool.utils.secret_manager_utils import get_secret_value_dict
# from main import get_content_from_inputs, get_session_id
#
#
# app = Flask(__name__)
#
# entry_point_html = "index.html"
#
#

#
# @app.route("/")
# def index():
#     return render_template(entry_point_html)
#
#
# @app.route("/process", methods=["POST"])
# def process():
#     # USER = "smttsp"
#     # session_info = SessionInfo(user=USER)
#     session_info = None
#     resume_file = request.files["resume"]
#     jd_file = request.files["jd"]
#     jd_link = request.form["jd_link"]
#     jd_text = request.form["jd_text"]
#
#     reply = "Resume filename: " + resume_file.filename + "<br>"
#     reply += "JD filename: " + jd_file.filename + "<br>"
#     reply += jd_link
#
#     print(resume_file)
#
#     tmp_content, resume, jd = get_content_from_inputs(
#         session_info,
#         resume_file,
#         jd_file,
#         jd_link,
#         jd_text,
#     )
#
#     # content = get_cover_letter(tmp_content)
#     # content = reply + "<br><br>" + tmp_content
#     content = tmp_content
#     return content
#
#
# if __name__ == "__main__":
#     app.run(debug=True, port=8080)
