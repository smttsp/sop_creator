from flask import Flask, render_template, request

from main import get_content_from_inputs


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process():
    resume_file = request.files["resume"]
    jd_file = request.files["jd"]
    jd_link = request.form["jd_link"]
    jd_text = request.form["jd_text"]

    reply = "Resume filename: " + resume_file.filename + "<br>"
    reply += "JD filename: " + jd_file.filename + "<br>"
    reply += jd_link

    content = reply + "<br><br>" + get_content_from_inputs(resume_file, jd_file, jd_link, jd_text)
    return content


if __name__ == "__main__":
    app.run(debug=True)
