# import os
import os
from datetime import datetime

import openai

from career_tool import (
    CareerFitAnalyzer,
    CoverLetter,
    JobDescription,
    Resume,
    ResumeAnalyzer,
)
from career_tool.utils.file_utils import (
    read_text_from_file,
    save_files_to_cloud,
)
from career_tool.utils.word_utils import get_word_cloud


openai.api_key = os.environ["OPENAI_API_KEY"]


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
    ra = ResumeAnalyzer(resume)

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

    cv_file = "/users/samet/desktop/sop_creator/resumes/Taspinar_Resume.docx"
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
