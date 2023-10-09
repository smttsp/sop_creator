import docx2txt
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from utils.stop_word_list import STOPWORDS


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except:
        text = None

    return text


def get_word_cloud(content, stopwords=None):
    if stopwords is None:
        stopwords = STOPWORDS

    wordcloud_obj = WordCloud(
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
