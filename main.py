import glob
import os
from pprint import pprint

import openai

from utils.file_utils import read_text_from_file
from utils.job_description_utils import get_jd_from_inputs


openai.api_key = os.getenv("OPENAI_API_KEY")


def get_content_from_inputs(resume_file, jd_file, jd_link=None, jd_text=None):
    # resume_file = '/users/samettaspinar/desktop/resumes/Samet_resume.pdf'
    # resume_file = "/users/samettaspinar/desktop/resumes/resume2.doc"
    # jd_file = "/users/samettaspinar/desktop/jd/cellino_jd.pdf"

    # jd_link = "https://recruiterflow.com/db_74f6835629d4836e1f3120b2162e6337/jobs/79"
    # get_text_from_html(link)
    # jd = jd_main(jd_link)

    resume_content = read_text_from_file(resume_file)
    jd_content = get_jd_from_inputs(jd_file, jd_link, jd_text)

    results_dict = {
        "jd_link": jd_link or "",
        "jd_text": jd_text or "",
        "resume_content": resume_content,
        "jd_content": jd_content,
    }
    save_files(folder, resume_file, jd_file, content_dict=results_dict)

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

    from utils.file_utils import save_files

    folder = "_files/user1"
    content = get_content_from_inputs(resume_file, jd_file, None, None)
    cover_letter = get_cover_letter(content)
