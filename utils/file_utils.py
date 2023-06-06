import os
from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import remove_extra_spaces, find_emails, find_phone_numbers, anonymize_text
from utils.word_utils import convert_docx_to_text
import shutil
import orjson


def split_file_path(file_path):
    """Split a file path into its parent directory, base filename, and extension.

    Args:
        file_path (str): The path of the file.

    Returns:
        tuple: A tuple containing the parent directory, filename without extension, and file extension.
    """

    parent_dir = os.path.dirname(file_path)

    base_filename = os.path.basename(file_path)

    filename, file_extension = os.path.splitext(base_filename)
    return parent_dir, filename, file_extension


def save_orjson(filepath, data):
    """Save data as a JSON file using orjson.

    Args:
        data: The data to be saved as a JSON file.
        file_path (str): The path of the file where the JSON data will be saved.

    Raises:
        OSError: If there is an error while opening or writing to the file.
    """

    with open(filepath, "wb") as file:
        file.write(orjson.dumps(data))


def save_files(folder, resume_file, jd_file, content_dict):
    """Save files to a specified folder, including resume, job description, and content dictionary.

    Args:
        folder (str): The path of the destination folder where the files will be saved.
        resume_file (str): The path of the resume file to be saved.
        jd_file (str): The path of the job description file to be saved.
        content_dict (dict): The content dictionary to be saved as a JSON file.

    Returns:
        None
    """

    *_, resume_extension = split_file_path(resume_file)
    *_, jd_extension = split_file_path(jd_file)

    resume_dst_path = os.path.join(folder, "resume" + resume_extension)
    jd_dst_path = os.path.join(folder, "jd" + resume_extension)
    content_dst_path = os.path.join(folder, "content.json")

    shutil.copyfile(resume_file, resume_dst_path)
    shutil.copyfile(jd_file, jd_dst_path)
    save_orjson(content_dst_path, content_dict)

    return None


def read_text_from_file(filename):
    """Reads plain text content from a PDF or DOCX file and performs text processing operations.
    It finds the emails and phone numbers in the resumes, then deletes them. Then removes double spaces etc.

    Args:
        filename (str): The path of the PDF or DOCX file.

    Returns:
        str: Plain text content of the file with text processing operations applied.
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
