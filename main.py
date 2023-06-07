import os

import openai

from utils.file_utils import read_text_from_file, save_files_to_cloud
from utils.job_description_utils import get_jd_from_inputs


openai.api_key = os.getenv("OPENAI_API_KEY")
DEFAULT_GCP_BUCKET = "cover_letter_user_data"


def get_content_from_inputs(
    storage_client,
    gcp_folder: str,
    resume_file: str,
    jd_file: str,
    jd_link: str = None,
    jd_text: str = None,
):
    """Process the inputs and retrieve content from the resume and job description.
        The inputs and the content are, then, saved in gcp bucket

    Args:
        gcp_folder (str): The folder to save the files in.
        resume_file (str): The path to the resume file.
        jd_file (str): The path to the job description file.
        jd_link (str, optional): The link to the job description. Defaults to None.
        jd_text (str, optional): The text of the job description. Defaults to None.

    Returns:
        str: A string containing the resume content and job description content.
    """

    resume_content = read_text_from_file(resume_file)
    jd_content = get_jd_from_inputs(jd_file, jd_link, jd_text)

    results_dict = {
        "jd_link": jd_link or "",
        "jd_text": jd_text or "",
        "resume_content": resume_content,
        "jd_content": jd_content,
    }

    save_files_to_cloud(storage_client, gcp_folder, resume_file, jd_file, content_dict=results_dict)

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
    storage_client = StorageClient.from_service_account_json(GOOGLE_SERVICE_ACCOUNT)

    resume_file = "/users/samet/desktop/sop_creator/resumes/Samet_resume.pdf"
    jd_file = "/users/samet/desktop/sop_creator/jd/cellino_jd.pdf"

    gcp_folder = f"gs://{DEFAULT_GCP_BUCKET}/_files/user1"
    content = get_content_from_inputs(
        storage_client=storage_client, gcp_folder=gcp_folder, resume_file=resume_file, jd_file=jd_file
    )
    cover_letter = get_cover_letter(content)
