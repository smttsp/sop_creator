import os
from datetime import datetime

import openai
from google.cloud import storage

from career_tool import (
    CareerFitAnalyzer,
    CoverLetter,
    JobDescription,
    Resume,
    ResumeAnalyzer,
)
from career_tool.utils.secret_manager_utils import get_secret_value_dict


# from google.cloud.storage.client import Client as StorageClient
# from utils.constants import DEFAULT_GCP_BUCKET


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
    # ra = ResumeAnalyzer(resume)

    jd = JobDescription(jd_file, jd_link, jd_text)

    # results_dict = {
    #     "jd_link": jd_link or "",
    #     "jd_text": jd_text or "",
    #     "resume_content": resume.content,
    #     "jd_content": jd.content,
    # }

    # save_files_to_cloud(
    #     session_info.storage_client,
    #     session_info.gcp_folder,
    #     resume_file,
    #     jd_file,
    #     content_dict=results_dict,
    # )

    return resume, jd


if __name__ == "__main__":
    # USER = "smttsp"
    # SESSION = get_session()

    service_account_key_path = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
    storage_client = storage.Client.from_service_account_json(
        service_account_key_path
    )

    secret_value_dict = get_secret_value_dict(service_account_key_path)
    openai.api_key = secret_value_dict["OPENAI_API_KEY"]
    # db_login_info_dict = secret_value_dict["DATABASE_INFO"]
    # from utils.database_utils import connect_to_db
    # conn = connect_to_db(db_login_info_dict)

    cv_file = "/users/samet/desktop/sop_creator/resumes/Resume_Mariana_Queiroz_Velter_2023.pdf"
    jd_file = "/users/samet/desktop/sop_creator/resumes/cellino_simple2.docx"

    # gcp_folder = f"gs://{DEFAULT_GCP_BUCKET}/_files/user1"
    resume, jd = get_content_from_inputs(
        None,
        resume_file=cv_file,
        jd_file=jd_file,
    )
    ra = ResumeAnalyzer(resume)
    cfa = CareerFitAnalyzer(resume, jd)
    cfa.visualize_word_clouds()
    cfa.give_recommendations()

    # jaccard = ra.get_weighted_jaccard()
    cover_letter = CoverLetter(resume, jd)

    pass
