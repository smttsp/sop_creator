import requests
from bs4 import BeautifulSoup


def get_text_from_html(link):
    html = requests.get(link).text
    soup = BeautifulSoup(html, features="html.parser")

    text = soup.get_text()

    return text
