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
    #convert list to string and generate
    wordcloud = WordCloud(width=1000, height=500).generate(content)
    plt.figure(figsize=(15, 8))
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
    