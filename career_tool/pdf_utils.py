from PyPDF2 import PdfReader
from PyPDF2.errors import PdfReadError


def convert_pdf_to_txt(filename):
    """Converting a pdf file to plain text

    Args:
        filename:

    Returns:
        str: pdf file as plaintext
    """

    try:
        all_resume = ""

        reader = PdfReader(filename)
        for page in reader.pages:
            all_resume += page.extract_text() + "\n\n"

    except PdfReadError:
        all_resume = None
    return all_resume
