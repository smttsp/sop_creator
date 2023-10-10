import sys

import docx2txt
import matplotlib.pyplot as plt
from wordcloud import WordCloud

from utils.stop_word_list import STOPWORDS


EPS = sys.float_info.epsilon


def convert_docx_to_text(file):
    try:
        text = docx2txt.process(file)
    except Exception as e:
        text = None

    return text


def get_word_cloud(content, stopwords=None):
    if stopwords is None:
        stopwords = STOPWORDS

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


def get_word_count_dict(wordcloud: "WordCloud"):
    """Extracts word frequencies from a WordCloud object and returns a dictionary
    where keys are words and values are their corresponding frequencies.

    Parameters:
        wordcloud (WordCloud): The input WordCloud object.

    Returns:
        dict: A dictionary containing words as keys and their frequencies as values.
    """

    word_count_dict = {}
    for a_tuple in wordcloud.layout_:
        word, freq = a_tuple[0]
        word_count_dict[word] = freq

    return word_count_dict


def get_weighted_jaccard(word_cloud_1: "WordCloud", word_cloud_2: "WordCloud"):
    """Calculate the weighted Jaccard similarity score between two word clouds.
    The weighted Jaccard similarity score is calculated as the intersection of
    the two word clouds divided by the union of the two word clouds.
    The intersection and union are calculated by taking the minimum and
    maximum of the weights of the words in the two word clouds, respectively.

    Parameters:
        word_cloud_1 (WordCloud): The first input WordCloud object.
        word_cloud_2 (WordCloud): The second input WordCloud object.

    Returns:
        float: The weighted Jaccard similarity score between the two word clouds.
    """

    wc1 = get_word_count_dict(word_cloud_1)
    wc2 = get_word_count_dict(word_cloud_2)

    intersection = 0
    union = 0

    keys = set(wc1.keys()).union(set(wc2.keys()))
    for key in keys:
        weight1 = wc1.get(key, 0)
        weight2 = wc2.get(key, 0)

        intersection += min(weight1, weight2)
        union += max(weight1, weight2)

    # Calculate similarity score
    return intersection / (union + EPS)
