from typing import List
from pydantic import BaseModel, Field
from langchain.utils.openai_functions import convert_pydantic_to_openai_function
import json
import re

from langchain.chat_models import ChatOpenAI, ChatVertexAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers.openai_functions import JsonOutputFunctionsParser
from json import JSONDecodeError

from typing import Optional


# self.name = info.get("name", "")
# self.email = info.get("email", "")
# self.phone_no = info.get("phone_no", "")
# self.location = info.get("location", "")
# self.github_address = info.get("github_address", "")
# self.linkedin_address = info.get("linkedin_address", "")
# self.fitting_job_title = info.get("fitting_job_title", "")
# self.top5_skills = info.get("top5_skills", [])
# self.total_industry_exp = info.get("total_industry_exp", 0)
# self.total_academic_exp = info.get("total_academic_exp", 0)
# self.management_score = info.get("management_score", 0)
# self.professional_summary = info.get("professional_summary", "")


class Recommendation(BaseModel):
    """Part of the input resume to be improved."""
    original: str = Field(description="text in resume to be improved")
    suggestion: str = Field(description="the recommended text")
    reason: str = Field(description="the reason for the recommendation")


class RecommendationList(BaseModel):
    """List of recommendations to be done to resume"""
    rec_list: List[Recommendation] = Field(description="List of `Recommendation` obj")


class ResumeAnalyzer_Pydantic:
    def __init__(self, resume, session_info, llm_model="gpt-3.5-turbo"):
        self.resume = resume
        self.session_info = session_info
        self.recommendations = self._get_ai_recommendations()

    # def _get_ai_recommendations_google(self):
    #     template_string2 = """Given a resume ```{resume}```
    #     Create a list of changes you recommend to the resume.
    #     You need to look into the following things such as
    #
    #     1. the usage of action verbs
    #     2. addition of more quantifiable achievements. You can put them as "***" in your
    #         suggestions. (add comment  what user should put there)
    #     3. highlight the leadership experience.
    #     4. the usage of numbers, ratios, improvements
    #     3. grammar, spelling, punctuation issues
    #     4. consistency of tense and other grammatical elements. Notice that current
    #         experience should be present tense, past experience should be past tense.
    #     5. if you think some sections are redundant, such as interests, references, etc,
    #         you can suggest to remove them.
    #
    #     take a deep breath and give me suggestions in JSON format where the suggestions
    #     are in a list of dictionaries with the following keys:
    #         - before:
    #         - after:
    #         - reason:
    #     """
    #     google_api_key = self.session_info.google_service_account
    #
    #     try:
    #         chat = ChatVertexAI(
    #             # temperature=0.0,
    #             google_api_key=google_api_key,
    #             model="text-bison",
    #             max_output_tokens=2048,
    #         )
    #
    #         prompt_template = ChatPromptTemplate.from_template(template_string2)
    #
    #         service_messages = prompt_template.format_messages(
    #             resume=self.resume.content
    #         )
    #         response = chat(service_messages)
    #         json_match = re.search(r'```JSON(.*?)```', response.content, re.DOTALL)
    #
    #         if json_match:
    #             json_data = json_match.group(1).strip()
    #             info = json.loads(json_data)
    #         else:
    #             info = []
    #             print("No JSON data found in the input string.")
    #
    #     except JSONDecodeError | Exception as e:
    #         print(e)
    #         info = []
    #     return info

    def _get_ai_recommendations(self, llm_model="gpt-3.5-turbo"):
        #
        # template_string2 = """Given a resume ```{resume}```
        # Create a list of changes you recommend to the resume.
        # You need to look into the following things such as
        #
        # 1. the usage of action verbs
        # 2. addition of more quantifiable achievements. You can put them as "***" in your
        #     suggestions. (add comment  what user should put there)
        # 3. highlight the leadership experience.
        # 4. the usage of numbers, ratios, improvements
        # 3. grammar, spelling, punctuation issues
        # 4. consistency of tense and other grammatical elements. Notice that current
        #     experience should be present tense, past experience should be past tense.
        # 5. if you think some sections are redundant, such as interests, references, etc,
        #     you can suggest to remove them.
        #
        # take a deep breath and give me suggestions in JSON format where the suggestions
        # are in a list of dictionaries with the following keys:
        #     - before:
        #     - after:
        #     - reason:
        # """

        system_string = (
            "You are a professional resume editor providing feedback on a resume. "
            "Focus on the following aspects: "
            "1. Evaluate the usage of action verbs throughout the resume."
            "2. Encourage the addition of more quantifiable achievements marked as "
            "`***` in your suggestions. Provide a comment indicating what the user "
            "should input in those sections."
            "3. Emphasize and enhance the highlighting of leadership experience."
            "4. Pay attention to the inclusion of numbers, ratios, and improvements "
            "to make the achievements more impactful."
            "5. Identify and correct any grammar, spelling, and punctuation issues "
            "in the resume."
            "6. Ensure consistency in the tense and other grammatical elements. "
            "Advise the user to use present tense for current experience and "
            "past tense for past experience."
            "7. Recommend the removal of redundant sections, such as interests, "
            "references, etc., if you think they are not necessary."
        )

        # system_string = (
        #     "You are an experienced HR professional providing feedback on a resume. "
        #     "Your goal is to help the user enhance their resume. Provide detailed "
        #     "and constructive suggestions to improve the resume, focusing on "
        #     "highlighting key achievements, skills, and any areas that can be further"
        #     "strengthened. Be specific in your recommendations."
        # )
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_string),
            ("user", "Given the resume here: ```{resume}```, can you provide a list of "
                "changes you recommend to the resume?"
                "Take a deep breath and give me suggestions"
            ),
        ])

        model = ChatOpenAI(
            temperature=0.0,
            openai_api_key=self.session_info.openai_api_key,
        )

        recommendation_functions = [
            convert_pydantic_to_openai_function(RecommendationList)
        ]

        model_with_functions = model.bind(
            functions=recommendation_functions,
            function_call={"name": "RecommendationList"}
        )

        recommendation_chain = (
            prompt | model_with_functions | JsonOutputFunctionsParser()
        )
        res = recommendation_chain.invoke({"resume": self.resume.content})

        return res
        # try:
        #     chat = ChatOpenAI(
        #         temperature=0.0,
        #         openai_api_key=self.session_info.openai_api_key,
        #         model=llm_model,
        #     )
        #
        #     prompt_template = ChatPromptTemplate.from_template(template_string2)
        #
        #     service_messages = prompt_template.format_messages(
        #         resume=self.resume.content
        #     )
        #     response = chat(service_messages)
        #     info = json.loads(response.content)
        #
        # except Exception as e:
        #     print(e)
        #     info = {}
        # return info

    def _get_resume_details(self, llm_model="gpt-3.5-turbo"):
        chat = ChatOpenAI(temperature=0.0, model=llm_model)

        template_string = """Given a resume ```{resume}```
            Can you extract the followings information
                name
                email
                phone no (as xxx-xxx-xxxx if it is USA number, or similar format) 
                location
                github_address
                linkedin_address
                fitting_job_title
                top5_skills looking at the entire resume
                total_industry_experience (in years)
                total_academic_experience (in years)
                management_score (out of 100)
                professional_summary: Can you come up with a professional_summary which
                    is at most 100 tokens? This is a concise, memorable statement that 
                    lets the reader know what you offer the company
            ---
            Take a deep breath and give me the answer. 
            Format the output as JSON with the following keys:
                name
                email
                phone_no 
                location
                github_address
                linkedin_address
                fitting_job_title
                top5_skills
                total_industry_exp
                total_academic_exp
                management_score
                professional_summary
        """

        prompt_template = ChatPromptTemplate.from_template(template_string)

        service_messages = prompt_template.format_messages(
            resume=self.resume.content
        )
        response = chat(service_messages)
        recommendations = json.loads(response.content)

        return recommendations
