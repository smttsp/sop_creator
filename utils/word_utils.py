import docx2txt
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS

from utils.stop_word_list import STOPWORDS2


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except Exception as e:
        text = None

    return text


def get_word_cloud(content, stopwords=None):
    if stopwords is None:
        stopwords = STOPWORDS2

    wordcloud_obj = WordCloud(
        background_color="white",
        width=1000,
        height=500,
        max_words=20,
        min_word_length=2,
        stopwords=stopwords,
    )
    wordcloud = wordcloud_obj.generate(content.lower())
    plt.figure(figsize=(15, 8))
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
    return wordcloud
