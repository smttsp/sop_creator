import docx2txt
import matplotlib.pyplot as plt
from wordcloud import WordCloud


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except:
        text = None

    return text


def get_word_cloud(content):
    wordcloud_obj = WordCloud(width=1000, height=500, max_words=20, min_word_length=2)
    wordcloud = wordcloud_obj.generate(content)
    plt.figure(figsize=(15, 8))
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
    