import json

from google.cloud import secretmanager


def get_secret_value_dict(project_id ="818082405938", secret_id ="cover_letter", version_id ="latest"):

    client = secretmanager.SecretManagerServiceClient()

    secret_name = (
        f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    )

    response = client.access_secret_version(request={"name": secret_name})
    secret_value = json.loads(response.payload.data.decode("UTF-8"))

    return secret_value
