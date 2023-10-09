# import os
from datetime import datetime

import openai

from utils import JobDescription, Resume
from utils.file_utils import read_text_from_file, save_files_to_cloud


# from utils.secret_manager_utils import get_secret_value_dict
# from google.cloud.storage.client import Client as StorageClient
# from utils.constants import DEFAULT_GCP_BUCKET


def get_session_id():
    return datetime.now().strftime("%Y-%m-%d_%H%M%S")


def get_content_from_inputs(
    session_info,
    resume_file,
    jd_file,
    jd_link: str = None,
    jd_text: str = None,
):
    """Process the inputs and retrieve content from the resume and job description.
        The inputs and the content are, then, saved in gcp bucket

    Args:
        session_info (SessionInfo):
        resume_file (FileStorage): The path to the resume file.
        jd_file (FileStorage): The path to the job description file.
        jd_link (str, optional): The link to the job description. Defaults to None.
        jd_text (str, optional): The text of the job description. Defaults to None.

    Returns:
        str: A string containing the resume content and job description content.
    """

    resume = Resume(resume_file)
    jd = JobDescription(jd_file, jd_link, jd_text)

    results_dict = {
        "jd_link": jd_link or "",
        "jd_text": jd_text or "",
        "resume_content": resume.content,
        "jd_content": jd.content,
    }

    # save_files_to_cloud(
    #     session_info.storage_client,
    #     session_info.gcp_folder,
    #     resume_file,
    #     jd_file,
    #     content_dict=results_dict,
    # )

    content = (
        f"Given that my resume_file is: {resume.content} \n\n"
        f"and job description I am applying is {jd.content}.\n\n"
        "Can you write me a cover letter"
    )
    return content, resume, jd


def get_cover_letter(content):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": content,
                "session_id": "fjewhr984urjfewf",
            }
        ],
    )
    cover_letter = completion.choices[0].message.content
    # print(cover_letter)
    return cover_letter


if __name__ == "__main__":
    # USER = "smttsp"
    # SESSION = get_session()
    # GOOGLE_SERVICE_ACCOUNT = os.getenv("GOOGLE_SERVICE_ACCOUNT")
    # storage_client = StorageClient.from_service_account_json(
    #     GOOGLE_SERVICE_ACCOUNT
    # )
    #
    # secret_value_dict = get_secret_value_dict()
    # openai.api_key = secret_value_dict["OPENAI_API_KEY"]
    # db_login_info_dict = secret_value_dict["DATABASE_INFO"]
    # from utils.database_utils import connect_to_db
    # conn = connect_to_db(db_login_info_dict)

    resume_file = "/users/samet/desktop/sop_creator/resumes/Samet_resume.pdf"
    jd_file = "/users/samet/desktop/sop_creator/jd/cellino_jd.pdf"

    # gcp_folder = f"gs://{DEFAULT_GCP_BUCKET}/_files/user1"
    content, resume, jd = get_content_from_inputs(
        None,
        resume_file=resume_file,
        jd_file=jd_file,
    )
    from utils.word_utils import get_word_cloud

    get_word_cloud(resume.content)
    get_word_cloud(jd.content)
    cover_letter = get_cover_letter(content)

    pass
