import csv
import requests

URL = "http://82.180.173.222/questions/registerQuestion"
# URL = "http://192.168.1.12:8001/questions/registerQuestion"
Headers = {
    "Authorization": "TOKEN 0c311bcbfe491e8710640a10af858886cbda5b54"
}

# Headers = {
#     "Authorization": "TOKEN 4f1194898a6d1ba57651769d23e366fb63589d88"
# }


questionArray = []

with open('special.csv', 'r') as csvFile:
    reader = csv.reader(csvFile)
    next(reader)
    for row in reader:
        questionArray.append(row)


def storeData(results):

    # results = json.loads(results)
    data = {
        "question": results[0],
        "correct_answer": results[1],
        "incorrect_answer": {
            '0': str(results[2]),
            '1': str(results[3]),
            '2': str(results[4]),
        },
        "category": "special",
        "difficulty": results[5],
    }
    status = requests.post(URL, json=data, headers=Headers, timeout=5)
    print(status.status_code)
    if status.status_code == 400:
        print(status.text)
    if int(status.status_code) != 201:
        print(results)
        return 0
    else:
        return 1


yes, no = 0, 0

for row in questionArray:
    try:
        check = storeData(row)
        if check == 1:
            yes += 1
        else:
            no += 1
    except Exception as e:
        print(row)
        print(e)
        no += 1

print(yes, no)