import os

from flask import Flask, render_template, request
from google.cloud.storage.client import Client as StorageClient

from main import get_content_from_inputs, get_session_id, get_cover_letter
from utils.constants import DEFAULT_GCP_BUCKET
from utils.secret_manager_utils import get_secret_value_dict

app = Flask(__name__)

entry_point_html = "index.html"


class SessionInfo:
    def __init__(self, user, default_gcp_bucket=DEFAULT_GCP_BUCKET):
        self.user = user
        self.session_id = get_session_id()
        self.default_gcp_bucket = default_gcp_bucket

        self.google_service_account = os.getenv("GOOGLE_SERVICE_ACCOUNT", None)

        self.secret_value_dict = get_secret_value_dict()

        # self.storage_client = None
        # self.openai_api_key = None
        # self.gcp_folder = None
        # self.db_login_info_dict = None

        self._set_apis()

    def _set_apis(self):
        self.storage_client = StorageClient.from_service_account_json(
            self.google_service_account
        )
        self.openai_api_key = self.secret_value_dict["OPENAI_API_KEY"]
        self.db_login_info_dict = self.secret_value_dict["DATABASE_INFO"]

        self.gcp_folder = os.path.join(
            self.default_gcp_bucket, self.user, self.session_id
        )

        return None


@app.route("/")
def index():
    return render_template(entry_point_html)


@app.route("/process", methods=["POST"])
def process():
    # USER = "smttsp"
    # session_info = SessionInfo(user=USER)
    session_info = None
    resume_file = request.files["resume"]
    jd_file = request.files["jd"]
    jd_link = request.form["jd_link"]
    jd_text = request.form["jd_text"]

    reply = "Resume filename: " + resume_file.filename + "<br>"
    reply += "JD filename: " + jd_file.filename + "<br>"
    reply += jd_link

    print(resume_file)

    tmp_content, resume, jd = get_content_from_inputs(
        session_info,
        resume_file,
        jd_file,
        jd_link,
        jd_text,
    )

    content = get_cover_letter(tmp_content)
    # content = reply + "<br><br>" + tmp_content

    return content


if __name__ == "__main__":
    app.run(debug=True, port=8080)
