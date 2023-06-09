import re


def remove_extra_spaces(a_str):
    replacement_dict = {
        " \n": "\n",
        "  ": " ",
        "\n\n": "\n",
    }

    for input_space, output_space in replacement_dict.items():
        while input_space in a_str:
            a_str = a_str.replace(input_space, output_space)

    return a_str


def anonymize_text(text, info_to_be_removed: list, replacement=""):
    for info in info_to_be_removed:
        text = text.replace(info, replacement)

    return text


def find_emails(text):
    """Finds email addresses in a given text using regular expressions.

    Args:
        text (str): The text to search for email addresses.

    Returns:
        list: A list of unique email addresses found in the text.
    """

    email_pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
    emails = list(set(re.findall(email_pattern, text)))

    return emails


def standardize_phone_numbers(phone_numbers):
    formatted_numbers = [re.sub(r"\D", "", num) for num in phone_numbers]
    formatted_numbers = [
        f"{num[:3]}-{num[3:6]}-{num[6:]}" for num in formatted_numbers
    ]
    return formatted_numbers


def find_phone_numbers(text):
    phone_patterns = [
        # r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',  # xxx-xxx-xxxx or xxxxxxxxxx
        # r'\b\(\d{3}\)[-.\s]\d{3}[-.\s]?\d{4}\b',  # (xxx) xxx-xxxx or (xxx)xxx-xxxx or (xxx) xxx xxxx
        # r'\b\d{3}\s\d{3}\s\d{4}\b',  # xxx xxx xxxx
        # r'\b\d{3}[-.]?\d{4}[-.]?\d{4}\b',  # xxx-xxxx-xxxx or xxxxxxxxxxxx
        # r'\b\(\d{3}\)\s\d{3}-\d{4}\b',  # (xxx) xxx-xxxx
        r"\(?\d{3}\)?-? *\d{3}-? *-?\d{4}",
    ]

    # phone_patterns = [
    #     r'\b\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b',  # with country code and various separators
    #     r'\b\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}\b',  # with country code and various separators, without extension
    #     r'\b\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,9}\b',  # with country code and various separators, without area code
    #     r'\b\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}\b',  # with country code and various separators, without area code and extension
    #     r'\b\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b',  # without country code, with various separators
    #     r'\b\d{1,4}[-.\s]?\d{1,4}\b',  # without country code, with various separators, without extension
    #     r'\b\d{1,9}\b'  # without country code, without area code or separators
    # ]

    phone_numbers = []
    for pattern in phone_patterns:
        phone_numbers += re.findall(pattern, text)

    formatted_numbers = standardize_phone_numbers(phone_numbers)
    unique_phone_numbers = list(set(formatted_numbers))
    return phone_numbers, unique_phone_numbers
