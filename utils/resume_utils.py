from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import remove_extra_spaces
from utils.word_utils import convert_docx_to_text


def get_resume_as_text(file):
    all_resume = convert_pdf_to_txt(file)
    all_resume = convert_docx_to_text(file) if all_resume is None else all_resume

    if isinstance(all_resume, str):
        all_resume = remove_extra_spaces(all_resume)

    return all_resume
