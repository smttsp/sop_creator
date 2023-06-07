from flask import Flask, render_template, request

from main import get_content_from_inputs
from google.cloud.storage.client import Client as StorageClient

app = Flask(__name__)


FOLDER = "_files/user1"


# storage_client = StorageClient()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process(folder=FOLDER):
    resume_file = request.files["resume"]
    jd_file = request.files["jd"]
    jd_link = request.form["jd_link"]
    jd_text = request.form["jd_text"]

    reply = "Resume filename: " + resume_file.filename + "<br>"
    reply += "JD filename: " + jd_file.filename + "<br>"
    reply += jd_link

    print(resume_file)

    tmp_content = get_content_from_inputs(
        storage_client, folder, resume_file.filename, jd_file.filename, jd_link, jd_text
    )
    content = reply + "<br><br>" + tmp_content

    return content


if __name__ == "__main__":
    app.run(debug=True, port=8080)
