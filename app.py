from flask import Flask, request, render_template


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process():
    resume_file = request.files["resume"]
    jd_file = request.files["jd"]
    # Process the uploaded file here and generate a reply
    reply = "Resume filename: " + resume_file.filename + "<br>"
    reply += "JD filename: " + jd_file.filename
    return reply


if __name__ == "__main__":
    app.run(debug=True)
