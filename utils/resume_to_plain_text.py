def convert_pdf_to_txt(file):

    all_resume = ""

    reader = PdfReader(file)

    for page in reader.pages:
        all_resume += page.extract_text()

    return all_resume

