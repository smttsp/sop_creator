from utils.resume_utils import get_resume_as_text
from utils.job_description_utils import jd_main
import os
import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

file = '/users/samettaspinar/desktop/resumes/Samet_resume.pdf'
jd_file = '/users/samettaspinar/desktop/jd/cellino_jd.pdf'

resume = get_resume_as_text(file)
jd = jd_main(jd_file)



# print()
# print()
content = (
    f"Given that my resume is: {resume} \n"
    f"and job description I am applying is {jd}." 
    "Can you write me a cover letter"
)


completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": content}
  ]
)

print(completion.choices[0].message.content)
pass