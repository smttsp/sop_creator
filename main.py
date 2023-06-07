import os

import openai

from utils.file_utils import read_text_from_file, save_files
from utils.job_description_utils import get_jd_from_inputs


openai.api_key = os.getenv("OPENAI_API_KEY")
DEFAULT_GCP_BUCKET = "cover_letter_user_data"


def get_content_from_inputs(folder, resume_file, jd_file, jd_link=None, jd_text=None):
    resume_content = read_text_from_file(resume_file)
    jd_content = get_jd_from_inputs(jd_file, jd_link, jd_text)

    results_dict = {
        "jd_link": jd_link or "",
        "jd_text": jd_text or "",
        "resume_content": resume_content,
        "jd_content": jd_content,
    }
    # save_files(folder, resume_file, jd_file, content_dict=results_dict)

    content = (
        f"Given that my resume_file is: {resume_content} \n\n"
        f"and job description I am applying is {jd_content}.\n\n"
        "Can you write me a cover letter"
    )
    return content


def get_cover_letter(query):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": query}]
    )
    cover_letter = completion.choices[0].message.content
    print(completion.choices[0].message.content)
    return cover_letter


if __name__ == "__main__":
    from google.cloud.storage.client import Client as StorageClient
    GOOGLE_SERVICE_ACCOUNT = os.getenv("GOOGLE_SERVICE_ACCOUNT")
    # storage_client = StorageClient(project="CoverLetter")
    storage_client = StorageClient.from_service_account_json(GOOGLE_SERVICE_ACCOUNT)

    bucket = storage_client.get_bucket(DEFAULT_GCP_BUCKET)
    blobs = bucket.list_blobs()
    for blob in blobs:
        print(blob.name)

    # resume_folder = "/users/samettaspinar/desktop/resumes/"
    #
    # resume_files = glob.glob(resume_folder + "/*")
    #
    # for resume_file in resume_files:
    #     resume_content = read_text_from_file(resume_file)
    #     pprint(resume_content)
    #     print("#" * 100, "\n\n")

    resume_file = "/users/samettaspinar/desktop/resumes/Samet_resume.pdf"
    jd_file = "/users/samettaspinar/desktop/jd/cellino_jd.pdf"

    folder = "_files/user1"
    content = get_content_from_inputs(folder, resume_file, jd_file, None, None)
    cover_letter = get_cover_letter(content)
