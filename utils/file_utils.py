import os

import orjson

from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import (
    anonymize_text,
    find_emails,
    find_phone_numbers,
    remove_extra_spaces,
)
from utils.word_utils import convert_docx_to_text


def split_file_path(file_path):
    """Split a file path into its parent directory, base filename, and extension.

    Args:
        file_path (str): The path of the file.

    Returns:
        tuple: A tuple containing the parent directory, filename without extension,
            and file extension.
    """

    parent_dir = os.path.dirname(file_path)

    base_filename = os.path.basename(file_path)

    filename, file_extension = os.path.splitext(base_filename)
    return parent_dir, filename, file_extension


def save_orjson(file_path, data):
    """Save data as a JSON file using orjson.

    Args:
        data: The data to be saved as a JSON file.
        file_path (str): The path of the file where the JSON data will be saved.

    Raises:
        OSError: If there is an error while opening or writing to the file.
    """

    with open(file_path, "wb") as file:
        file.write(orjson.dumps(data))

    return None


def get_bucket_blobname_from_uri(gs_uri):
    splits = gs_uri.replace("gs://", "").split("/")
    assert len(splits), f"invalid {gs_uri=}"
    bucket_name = splits[0]
    blob_name = "/".join(splits[1:])
    return bucket_name, blob_name


def save_file_to_cloud(storage_client, file, gs_uri: str):
    bucket_name, blob_name = get_bucket_blobname_from_uri(gs_uri)
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(blob_name)
    # blob.upload_from_filename(file)
    blob.upload_from_string(file.read(), content_type=file.content_type)

    # shutil.rmtree(pdf_file_path)

    print(f"File uploaded to: gs://{gs_uri}")
    return None


def save_json_to_cloud(storage_client, data: dict, gs_uri: str):
    bucket_name, blob_name = get_bucket_blobname_from_uri(gs_uri)
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(blob_name)

    json_str = orjson.dumps(data).decode("utf-8")
    blob.upload_from_string(json_str)

    print(f"JSON file uploaded to: {gs_uri}")
    return None


def save_files_to_cloud(
    storage_client, gcp_folder, resume_file, jd_file, content_dict
):
    """Save files to a specified folder, including resume, job description, and content dictionary.

    Args:
        storage_client (google.cloud.storage.Client): The Google Cloud Storage client.
        gcp_folder (str): The path of the destination folder where the files will be saved.
        resume_file (FileStorage): The path of the resume file to be saved.
        jd_file (FileStorage): The path of the job description file to be saved.
        content_dict (dict): The content dictionary to be saved as a JSON file.

    Returns:
        None
    """

    *_, resume_extension = split_file_path(resume_file.filename)
    *_, jd_extension = split_file_path(jd_file.filename)

    resume_dst_path = os.path.join(gcp_folder, "resume" + resume_extension)
    jd_dst_path = os.path.join(gcp_folder, "jd" + resume_extension)
    content_dst_path = os.path.join(gcp_folder, "content.json")

    save_file_to_cloud(storage_client, resume_file, resume_dst_path)
    save_file_to_cloud(storage_client, jd_file, jd_dst_path)
    save_json_to_cloud(storage_client, content_dict, content_dst_path)

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
    all_resume = (
        convert_docx_to_text(filename) if all_resume is None else all_resume
    )

    emails = find_emails(all_resume)
    phone_numbers, formatted_numbers = find_phone_numbers(all_resume)

    if isinstance(all_resume, str):
        all_resume = anonymize_text(all_resume, emails, "")
        all_resume = anonymize_text(all_resume, phone_numbers, "")
        all_resume = remove_extra_spaces(all_resume)

    return all_resume
