# Necessary built-in imports to be utilized later
import json
import urllib2
app_group_id = 'cccc646b-846c-42f2-bac8-296834b8a078'

# Determine which users you want to message
external_user_ids = ['56b23d6be4b02935e919bd5b']

# Define the content type as a dictionary
headers_params = {'Content-Type':'application/json'}

# MESSAGING ENDPOINT VARIABLES ONLY
request_url = 'https://api.appboy.com/users/export/segment'
# Store the request data as a dictionary
data = {'app_group_id': app_group_id,
        'segment_id': '8d268036-469d-44d2-a4e8-19a052da2b12',
		'fields_to_export' : ['push_tokens', 'external_id', 'appboy_id']
		}


# Convert the data into JSON format
JSONdata = json.dumps(data)
# Create the request
req = urllib2.Request(request_url, JSONdata, headers_params)
# Open the request
f = urllib2.urlopen(req)
# Get the response code
response = f.read()
# Close the opened request
f.close()
# Check that the request worked correctly
print response