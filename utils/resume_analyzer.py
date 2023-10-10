import sys

from wordcloud import WordCloud
from utils.word_utils import get_word_cloud

EPS = sys.float_info.epsilon


def get_word_count_dict(wordcloud: WordCloud):
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


class ResumeAnalyzer:
    def __init__(self, resume: "Resume", jd: "JobDescription"):
        self.resume = resume
        self.jd = jd
        self.resume_wc, self.jd_wc = self.get_word_cloud()
        self.resume_wf, self.jd_wf = self.get_word_freq_dict()
        self.differences = self.get_differences()

    def get_word_cloud(self):
        """Generate a word cloud from the resume and jd.

        Returns:
            WordCloud: The word cloud generated from the resume and jd.
        """

        resume_wc = get_word_cloud(self.resume.content)
        jd_wc = get_word_cloud(self.jd.content)

        return resume_wc, jd_wc

    def get_word_freq_dict(self):
        """Extract word frequencies from the word clouds of the resume and jd."""

        resume_wf = get_word_count_dict(self.resume_wc)
        jd_wf = get_word_count_dict(self.jd_wc)

        return resume_wf, jd_wf

    def get_weighted_jaccard(self):
        """Calculate the weighted Jaccard similarity score between resume and jd.
        First, the word clouds of the resume and jd are generated.
        Then, the weighted Jaccard similarity score is calculated as the intersection of
        the two word clouds divided by the union of the two word clouds.
        The intersection and union are calculated by taking the minimum and
        maximum of the weights of the words in the two word clouds, respectively.

        Returns:
            float: The weighted Jaccard similarity score between the two word clouds.
        """

        intersection = 0
        union = 0

        keys = set(self.resume_wf.keys()).union(set(self.jd_wf.keys()))
        for key in keys:
            weight1 = self.resume_wf.get(key, 0)
            weight2 = self.jd_wf.get(key, 0)

            intersection += min(weight1, weight2)
            union += max(weight1, weight2)

        return intersection / (union + EPS)

    def get_differences(self):
        differences = {}
        keys = set(self.resume_wf.keys()).union(set(self.jd_wf.keys()))
        for key in keys:
            weight1 = self.resume_wf.get(key, 0)
            weight2 = self.jd_wf.get(key, 0)

            differences[keys] = weight1 - weight2
        return differences
    