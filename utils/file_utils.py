from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import remove_extra_spaces, find_emails, find_phone_numbers, anonymize_text
from utils.word_utils import convert_docx_to_text


def read_text_from_file(filename):
    """Given a pdf or docx file (this can be extended), this code extracts a plain text

    Args:
        filename:

    Returns:

    """

    all_resume = convert_pdf_to_txt(filename)
    all_resume = convert_docx_to_text(filename) if all_resume is None else all_resume

    emails = find_emails(all_resume)
    phone_numbers, formatted_numbers = find_phone_numbers(all_resume)

    if isinstance(all_resume, str):
        all_resume = anonymize_text(all_resume, emails, "")
        all_resume = anonymize_text(all_resume, phone_numbers, "")
        all_resume = remove_extra_spaces(all_resume)

    return all_resume
