import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

from discovery_log import DiscoveryLog, DiscoveryRecord


class DiscoveryLogTests(unittest.TestCase):
    def setUp(self):
        self.tmp_dir = tempfile.TemporaryDirectory()
        self.log_path = Path(self.tmp_dir.name) / "discovery_log.json"
        self.log = DiscoveryLog(self.log_path)

    def tearDown(self):
        self.tmp_dir.cleanup()

    def _record(self, discovery_id: str, scope: str = "test scope") -> DiscoveryRecord:
        return DiscoveryRecord(discovery_id=discovery_id, timestamp=datetime.now(timezone.utc), scope=scope)

    def test_next_id_starts_at_0001(self):
        self.assertEqual(self.log.next_id(), "DISC-0001")

    def test_next_id_increments_after_append(self):
        self.log.append(self._record("DISC-0001"))
        self.assertEqual(self.log.next_id(), "DISC-0002")

    def test_append_rejects_reused_id(self):
        self.log.append(self._record("DISC-0001"))
        with self.assertRaises(ValueError):
            self.log.append(self._record("DISC-0001"))

    def test_save_and_reload_round_trips(self):
        self.log.append(self._record("DISC-0001", scope="original scope"))
        self.log.save()
        reloaded = DiscoveryLog(self.log_path)
        self.assertEqual(len(reloaded), 1)
        self.assertEqual(reloaded.get("DISC-0001").scope, "original scope")

    def test_no_update_method_exists(self):
        # Enforces rule 28 structurally, not just by convention.
        self.assertFalse(hasattr(self.log, "update"))
        self.assertFalse(hasattr(self.log, "delete"))


if __name__ == "__main__":
    unittest.main()
