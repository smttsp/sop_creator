import docx2txt
from wordcloud import WordCloud

from career_tool.utils.constants import STOPWORDS


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except Exception:
        text = None

    return text


def get_word_cloud(content, stopwords=None):
    if stopwords is None:
        stopwords = STOPWORDS

    wordcloud_obj = WordCloud(
        background_color="white",
        max_words=20,
        min_word_length=2,
        stopwords=stopwords,
    )
    wordcloud = wordcloud_obj.generate(content.lower())
    # visualize_word_cloud(wordcloud)
    return wordcloud


# def visualize_word_cloud(wordcloud):
#     plt.figure(figsize=(15, 8))
#     plt.imshow(wordcloud)
#     plt.axis("off")
#     plt.show()
