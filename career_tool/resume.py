import json

from career_tool.utils.file_utils import read_text_from_file, anonymize_resume
from career_tool.utils.llm_utils import get_completion


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

    def convert_to_json_resume(self):
        """Creating ChatGPT prompt to convert resume to JSON format."""
        prompt = (
            f"Given the resume here: {self.content}."
            "Can you convert it to JSON format?"
            "The JSON format should be as follows:"
            "{"
            "name: <name>\n"
            "email: <email>\n"
            "linkedin: <linkedin>\n"
            "github: <github>\n"
            "skills: <skills>\n"
            "experience: <experience>\n"
            "education: <education>\n"
            "projects: <projects>\n"
            "awards: <awards>\n"
            "publications: <publications>\n"
            "certifications: <certifications>\n"
            "languages: <languages>\n"
            "interests: <interests>\n"
            "references: <references>\n"
            "}"
            "If there are other fields, please add them as well."
            "Some of the fields may be empty."
            "Some of the fields such as experience, education may be list."
            "Don't add any text before or after the JSON format."
        )
        content = get_completion(prompt)
        resume_as_dict = json.load(content)
        return resume_as_dict

    # def convert_to_pdf_resume(self, template_name):
    #     pass
