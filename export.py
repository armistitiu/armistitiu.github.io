import requests
import json

def segment_data_export(app_group_id, segment_id, fields_to_export=None):
	headers = {'Content-Type': 'application/json'}
	if fields_to_export != None:
		payload = {'app_group_id': app_group_id, 'segment_id': segment_id, "fields_to_export":fields_to_export}
	else:
		payload = {'app_group_id': app_group_id, 'segment_id': segment_id}
	r = requests.post('https://api.appboy.com/users/export/segment', headers=headers, data=json.dumps(payload))
	print(r.text)

# Add in the App_Group_id, segment_id, and optionally an array of fields to be queried in the report. Then run python segment_export.py from the command line.	
segment_data_export('cccc646b-846c-42f2-bac8-296834b8a078', '8d268036-469d-44d2-a4e8-19a052da2b12', ['push_tokens', 'external_id', 'appboy_id'])