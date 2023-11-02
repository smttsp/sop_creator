import os
from datetime import datetime

from google.cloud import storage

from .constants import DEFAULT_GCP_BUCKET
from .secret_manager_utils import get_secret_value_dict


def get_session_id():
    return datetime.now().strftime("%Y-%m-%d_%H%M%S")


class SessionInfo:
    def __init__(self, user, default_gcp_bucket=DEFAULT_GCP_BUCKET):
        self.user = user
        self.session_id = get_session_id()
        self.default_gcp_bucket = default_gcp_bucket

        self.google_service_account = os.environ["GOOGLE_SERVICE_ACCOUNT"]

        self.secret_value_dict = get_secret_value_dict(
            self.google_service_account
        )

        self._set_apis()

    def _set_apis(self):
        self.storage_client = storage.Client.from_service_account_json(
            self.google_service_account
        )
        self.openai_api_key = self.secret_value_dict["OPENAI_API_KEY"]
        # self.db_login_info_dict = self.secret_value_dict["DATABASE_INFO"]

        self.gcp_folder = os.path.join(
            self.default_gcp_bucket, self.user, self.session_id
        )

        return None
