from utils.file_utils import read_text_from_file
from utils.http_utils import get_text_from_html
from utils.string_utils import remove_extra_spaces
from utils.llm_utils import get_completion


class JobDescription:
    def __init__(self, jd_file, jd_link, jd_text):
        self.jd_file = jd_file
        self.jd_link = jd_link
        self.jd_text = jd_text
        # self.ori_content = self._get_jd_from_inputs()
        # self.content = self._remove_extra_wording_from_jd()
        self.content = self._get_jd_from_inputs()

    def convert_to_json_jd(self):
        pass

    def convert_to_pdf_jd(self, template_name):
        pass

    def _get_jd_from_inputs(self):
        """Process the JD (Job Description) based on the provided inputs.

        This function takes in the JD file, JD link, and JD text as inputs.
        It reads the text from the JD file if provided, otherwise, it tries to extract
        the text from the JD link if provided, and finally falls back to the JD text.
        The extracted or provided JD text is then processed to remove any extra spaces.

        Returns:
            str: Processed JD text with extra spaces removed.
        """

        jd = read_text_from_file(self.jd_file)
        jd = jd if jd is not None else get_text_from_html(self.jd_link)
        jd = jd if jd is not None else self.jd_text

        if isinstance(jd, str):
            jd = remove_extra_spaces(jd)

        return jd

    def _remove_extra_wording_from_jd(self):
        """Remove the common wording from the JD, such as equal opportunity employer,
        non-discrimination, benefits etc.
        """

        prompt = (
            f"Given the job description here: {self.content}."
            "Can you remove the common wording such as"
            "- equal opportunity employer"
            "- non-discrimination"
            "- benefits"
            " that are at the end of the from the JD?"
        )

        clean_content = get_completion(prompt)
        return clean_content
