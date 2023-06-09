import psycopg2


def connect_to_db(db_login_info_dict):
    conn = psycopg2.connect(
        host=db_login_info_dict["host"],
        port=db_login_info_dict["port"],
        database=db_login_info_dict["database"],
        user=db_login_info_dict["user"],
        password=db_login_info_dict["password"]
    )
    # cursor = conn.cursor()
    #
    # cursor.execute('SELECT * FROM "user";')
    # rows = cursor.fetchall()
    # for row in rows:
    #     print(row)
    #
    # cursor.close()
    # conn.close()
    return conn
