def remove_extra_spaces(a_str):
    double_space = "  "
    double_line = "\n\n"

    while double_space in a_str:
        a_str = a_str.replace(double_space, " ")

    while double_line in a_str:
        a_str = a_str.replace(double_line, "\n")

    return a_str
