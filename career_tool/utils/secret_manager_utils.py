import json

from google.cloud import secretmanager


def get_secret_value_dict(
    service_account_key_path,
    project_id="984615452457",
    secret_id="secret1",
    version_id="latest",
):
    # client = secretmanager.SecretManagerServiceClient()
    client = secretmanager.SecretManagerServiceClient.from_service_account_json(
        service_account_key_path
    )

    secret_name = (
        f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    )

    response = client.access_secret_version(request={"name": secret_name})
    secret_value = json.loads(response.payload.data.decode("UTF-8"))

    return secret_value
