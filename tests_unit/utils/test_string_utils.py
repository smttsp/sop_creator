import pytest
from utils.string_utils import find_emails, find_phone_numbers


@pytest.mark.parametrize(
    "text, expected_emails",
    [
        ("Contact me at john@example.com or info@example.com", ['john@example.com', 'info@example.com']),
        ("Email us at support@example.com or sales@example.com", ['support@example.com', 'sales@example.com']),
        ("No emails to be found here.", []),
        ("Multiple: john@example.com, jane@example.com", ['john@example.com', 'jane@example.com']),
        ("  \ts.a.m.e.@example.com  ", ["s.a.m.e.@example.com"]),
        ("example@example", []),
        ("example@example.", []),
        (".@example.", []),
        ("@example.com", []),
        ("", []),
    ]
)
def test_find_emails(text, expected_emails):
    actual_emails = find_emails(text)
    assert sorted(actual_emails) == sorted(expected_emails)


@pytest.mark.parametrize("text, expected_phone_numbers", [
    (" 555-123-4567 or (123) 456-7890", ['555-123-4567', '123-456-7890']),
    ("Phone numbers: 123-456-7890, (555) 222 3333", ['123-456-7890', '555-222-3333']),
    ("No phone numbers in this text.", []),
    ("Multiple phone numbers: 123-456-7890, (111)-222 3333", ['123-456-7890', '111-222-3333']),
    ("Multiple phone numbers: 1234567890, (111)2223333", ['123-456-7890', '111-222-3333']),
    ("Multiple phone numbers: 123  456    7890, (111)- 222--3333", ['123-456-7890', '111-222-3333']),
])
def test_find_phone_numbers(text, expected_phone_numbers):
    actual_phone_numbers, formatted_numbers = find_phone_numbers(text)
    assert sorted(formatted_numbers) == sorted(expected_phone_numbers)
