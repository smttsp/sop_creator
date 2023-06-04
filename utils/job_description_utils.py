from utils.string_utils import remove_extra_spaces
from utils.http_utils import get_text_from_html
from utils.file_utils import read_text_from_file


def jd_main(jd_file, jd_link, jd_text):
    jd = read_text_from_file(jd_file)
    jd = jd if jd is not None else get_text_from_html(jd_link)
    jd = jd if jd is not None else jd_text

    if isinstance(jd, str):
        jd = remove_extra_spaces(jd)

    return jd
