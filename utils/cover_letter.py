from utils.llm_utils import get_completion


class CoverLetter:
    def __init__(self, resume, jd):
        self.resume = resume
        self.jd = jd
        self.cover_letter = self.get_cover_letter()

    def get_cover_letter(self):
        content = (
            f"Given that my resume is: <{self.resume.content}> \n\n"
            f"and job description I am applying is <{self.jd.content}>.\n\n"
            "---\n\n"
            "Can you write me a cover letter? "
            "Don't use flowery language. Be professional."
            # "Don't be very generic. Be specific."
            "Try to keep the tone similar to the resume"
            "Limit the number of words to 500."
        )
        return get_completion(content)
