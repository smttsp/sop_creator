

def remove_extra_spaces(string):
    double_space = "  "
    while double_space in string:
        string = string.replace(double_space, " ")

    return string