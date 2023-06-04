import glob
import os
from pprint import pprint

import openai

from utils.file_utils import read_text_from_file
from utils.job_description_utils import get_jd_from_inputs


openai.api_key = os.getenv("OPENAI_API_KEY")


def get_content_from_inputs(resume_file, jd_file, jd_link, jd_text):
    # resume_file = '/users/samettaspinar/desktop/resumes/Samet_resume.pdf'
    # resume_file = "/users/samettaspinar/desktop/resumes/resume2.doc"
    # jd_file = "/users/samettaspinar/desktop/jd/cellino_jd.pdf"

    # jd_link = "https://recruiterflow.com/db_74f6835629d4836e1f3120b2162e6337/jobs/79"
    # get_text_from_html(link)
    # jd = jd_main(jd_link)

    resume_content = read_text_from_file(resume_file)
    jd_content = get_jd_from_inputs(jd_file, jd_link, jd_text)

    content = (
        f"Given that my resume_file is: {resume_content} \n\n"
        f"and job description I am applying is {jd_content}.\n\n"
        "Can you write me a cover letter"
    )
    return content


# completion = openai.ChatCompletion.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {"role": "user", "content": content}
#   ]
# )
#
# print(completion.choices[0].message.content)


if __name__ == "__main__":
    resume_folder = "/users/samettaspinar/desktop/resumes/"

    resume_files = glob.glob(resume_folder + "/*")

    for resume_file in resume_files:
        resume_content = read_text_from_file(resume_file)
        pprint(resume_content)
        print("#" * 100, "\n\n")
