from utils.string_utils import remove_extra_spaces
from utils.http_utils import get_text_from_html
from utils.file_utils import read_text_from_file


def get_jd_from_inputs(jd_file, jd_link, jd_text):
    """Process the JD (Job Description) based on the provided inputs.

    This function takes in the JD file, JD link, and JD text as inputs.
    It reads the text from the JD file if provided, otherwise, it tries to extract
    the text from the JD link if provided, and finally falls back to the JD text.
    The extracted or provided JD text is then processed to remove any extra spaces.

    Args:
        jd_file (str): Path to the JD file.
        jd_link (str): Link to the JD.
        jd_text (str): Text of the JD.

    Returns:
        str: Processed JD text with extra spaces removed.
    """

    jd = read_text_from_file(jd_file)
    jd = jd if jd is not None else get_text_from_html(jd_link)
    jd = jd if jd is not None else jd_text

    if isinstance(jd, str):
        jd = remove_extra_spaces(jd)

    return jd
