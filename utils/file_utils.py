import os
from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import remove_extra_spaces, find_emails, find_phone_numbers, anonymize_text
from utils.word_utils import convert_docx_to_text
import shutil
import orjson


def split_file_path(file_path):
    parent_dir = os.path.dirname(file_path)

    # Get the base filename
    base_filename = os.path.basename(file_path)

    # Split the base filename and extension
    filename, file_extension = os.path.splitext(base_filename)
    return parent_dir, filename, file_extension


def save_orjson(filepath, data):
    with open(filepath, "wb") as file:
        file.write(orjson.dumps(data))


def save_files(folder, resume_file, jd_file, content_dict):
    *_, resume_extension = split_file_path(resume_file)
    *_, jd_extension = split_file_path(jd_file)
    resume_dst_path = os.path.join(folder, "resume" + resume_extension)
    jd_dst_path = os.path.join(folder, "jd" + resume_extension)
    content_dst_path = os.path.join(folder, "content.json")
    shutil.copyfile(resume_file, resume_dst_path)
    shutil.copyfile(jd_file, jd_dst_path)

    save_orjson(content_dst_path, content_dict)

    pass


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
