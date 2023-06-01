from utils.pdf_utils import convert_pdf_to_txt


def get_jd_as_text(file):
    all_resume = convert_pdf_to_txt(file)
    if all_resume is None:
        # try word
        pass

    return all_resume


def jd_main(input_info):
    link = "https://recruiterflow.com/db_74f6835629d4836e1f3120b2162e6337/jobs/79"
    if input_info == "link":
        jd = ""
    else:
        jd = get_jd_as_text(input_info)

    return jd
