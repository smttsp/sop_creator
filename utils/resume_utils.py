from utils.pdf_utils import convert_pdf_to_txt


def get_resume_as_text(file):
    all_resume = convert_pdf_to_txt(file)
    