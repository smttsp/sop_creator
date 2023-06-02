from utils.resume_utils import get_resume_as_text
from utils.job_description_utils import jd_main
from utils.http_utils import get_text_from_html
import os
import openai


openai.api_key = os.getenv("OPENAI_API_KEY")


def get_content_from_inputs(resume_file, jd_file, jd_link):
    # resume_file = '/users/samettaspinar/desktop/resumes/Samet_resume.pdf'
    # resume_file = "/users/samettaspinar/desktop/resumes/resume2.doc"
    # jd_file = "/users/samettaspinar/desktop/jd/cellino_jd.pdf"

    # jd_link = "https://recruiterflow.com/db_74f6835629d4836e1f3120b2162e6337/jobs/79"
    # get_text_from_html(link)
    # jd = jd_main(jd_link)

    resume_content = get_resume_as_text(resume_file)
    jd_content = jd_main(jd_file)

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
pass
