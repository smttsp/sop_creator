import docx2txt


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except:
        text = None

    return text
