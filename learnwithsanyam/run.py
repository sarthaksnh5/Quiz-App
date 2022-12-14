import json
import requests
# scp root@82.180.173.222:learnwithsanyam/mydatabase /home/sarthak/Downloads/mydatabase.sqlite
# API = "https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple"
API = "https://the-trivia-api.com/api/questions?categories=science&limit=20&difficulty=hard"
# API = "https://the-trivia-api.com/api/questions?categories=general_knowledge,history,geography&limit=20&region=IN&difficulty=hard"
URL = "http://82.180.173.222/questions/registerQuestion"
Headers = {
    "Authorization": "TOKEN 0c311bcbfe491e8710640a10af858886cbda5b54"
}

print('GET Reuqest')
response = requests.get(API)
print('Getting data')
jsonData = json.loads(response.text)
# jsonData = json.loads(response.text)['results']
# jsonData = json.loads(response.text)

print('Converting Data')
yes = 0
no = 0

def storeData(results):
    
    # results = json.loads(results)
    data = {
        "question" : results['question'],
        "correct_answer": results['correctAnswer'],
        "incorrect_answer": {
            '0': str(results['incorrectAnswers'][0]),
            '1': str(results['incorrectAnswers'][1]),
            '2': str(results['incorrectAnswers'][2]),
        },
        "category": "Science", 
        "difficulty" : "Hard",
    }

    status = requests.post(URL, json=data, headers=Headers).status_code
    print(status)
    if int(status) != 201:
        print(results)
        return 0
    else:
        return 1

storeData(jsonData[0])

i = 1
for results in jsonData:
    try:
        check = storeData(results)
        if check == 1:
            yes += 1
        else:
            no += 1
    except Exception as e:
        print(results)
        print(e)
    i = i + 1

print(yes, no)