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


def get_word_freq(wordcloud: WordCloud):
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


# def visualize_word_cloud(wordcloud):
#     plt.figure(figsize=(15, 8))
#     plt.imshow(wordcloud)
#     plt.axis("off")
#     plt.show()
