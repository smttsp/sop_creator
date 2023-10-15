import json

from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

from career_tool.utils.file_utils import anonymize_resume, read_text_from_file


class Resume:
    def __init__(self, resume_file):
        self.resume_file = resume_file
        self.content = self.get_resume_content()
        # self.json_resume = self.convert_to_json_resume()
        self.anonymized_resume = self.get_anonymized_resume()

    def get_resume_content(self):
        return read_text_from_file(self.resume_file)

    def get_anonymized_resume(self):
        return anonymize_resume(self.content)

    # def convert_to_json_resume(self):
    #     """Creating ChatGPT prompt to convert resume to JSON format."""
    #     prompt = (
    #         f"Given the resume here: {self.content}."
    #         "Can you convert it to JSON format?"
    #         "The JSON format should be as follows:"
    #         "{"
    #         "name: <name>\n"
    #         "email: <email>\n"
    #         "linkedin: <linkedin>\n"
    #         "github: <github>\n"
    #         "skills: <skills>\n"
    #         "experience: <experience>\n"
    #         "education: <education>\n"
    #         "projects: <projects>\n"
    #         "awards: <awards>\n"
    #         "publications: <publications>\n"
    #         "certifications: <certifications>\n"
    #         "languages: <languages>\n"
    #         "interests: <interests>\n"
    #         "references: <references>\n"
    #         "}"
    #         "If there are other fields, please add them as well."
    #         "Some of the fields may be empty."
    #         "Some of the fields such as experience, education may be list."
    #         "Don't add any text before or after the JSON format."
    #     )
    #     content = get_completion(prompt)
    #     resume_as_dict = json.load(content)
    #     return resume_as_dict

    # def convert_to_pdf_resume(self, template_name):
    #     pass


class ResumeAnalyzer:
    def __init__(self, resume):
        self.resume = resume
        
        info = self._get_resume_details()

        self.name = info.get("name", "")
        self.email = info.get("email", "")
        self.phone_no = info.get("phone_no", "")
        self.location = info.get("location", "")
        self.github_address = info.get("github_address", "")
        self.linkedin_address = info.get("linkedin_address", "")
        self.fitting_job_title = info.get("fitting_job_title", "")
        self.top5_skills = info.get("top5_skills", [])
        self.total_industry_exp = info.get("total_industry_exp", 0)
        self.total_academic_exp = info.get("total_academic_exp", 0)
        self.management_score = info.get("management_score", 0)
        self.professional_summary = info.get("professional_summary", 0)

    def _get_resume_details(self, llm_model="gpt-3.5-turbo"):
        chat = ChatOpenAI(temperature=0.0, model=llm_model)

        template_string = """Given a resume ```{resume}```
            Can you extract the followings information
                name
                email
                phone no (as xxx-xxx-xxxx if it is USA number, or similar format) 
                location
                github_address
                linkedin_address
                fitting_job_title
                top5_skills looking at the entire resume
                total_industry_experience (in years)
                total_academic_experience (in years)
                management_score (out of 100)
            
            Can you also recommend a professional_summary which is at most 100 tokens?
            ---
            Format the output as JSON with the following keys:
                name
                email
                phone_no 
                location
                github_address
                linkedin_address
                fitting_job_title
                top5_skills
                total_industry_exp
                total_academic_exp
                management_score
                professional_summary
        """
        prompt_template = ChatPromptTemplate.from_template(template_string)

        service_messages = prompt_template.format_messages(
            resume=self.resume.content
        )
        response = chat(service_messages)
        info = json.loads(response.content)

        return info
