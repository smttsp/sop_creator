from utils.pdf_utils import convert_pdf_to_txt
from utils.string_utils import remove_extra_spaces
from utils.http_utils import get_text_from_html


def get_jd_as_text(file):
    all_resume = convert_pdf_to_txt(file)
    if all_resume is None:
        # try word
        pass

    return all_resume


def jd_main(input_info):
    if "http" in input_info:
        jd = get_text_from_html(input_info)
    else:
        jd = get_jd_as_text(input_info)

    if isinstance(jd, str):
        jd = remove_extra_spaces(jd)

    return jd
