from utils.file_utils import read_text_from_file


class Resume:
    def __init__(self, resume_file):
        self.resume_file = resume_file
        self.content = self.get_resume_content()

    def get_resume_content(self):
        return read_text_from_file(self.resume_file)

    def convert_to_json_resume(self):
        pass

    def convert_to_pdf_resume(self, template_name):
        pass
