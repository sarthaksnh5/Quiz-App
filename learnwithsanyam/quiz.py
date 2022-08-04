import requests
import json
import csv

API_KEY = '4FWTaNwFwR1EPnyM+XLHWA==5yDzhzHSghzI99YJ'

excelData = []

category = 'mathematics'
api_url = 'https://api.api-ninjas.com/v1/trivia?category={}'.format(category)

for i in range(90):
    print(i)
    response = requests.get(api_url, headers={'X-Api-Key': API_KEY})
    if response.status_code == requests.codes.ok:
        data = json.loads(response.text)
        question = data[0]['question']
        answer = data[0]['answer']
        excelData.append((question, answer))
    else:
        print("Error:", response.status_code, response.text)

with open('test.csv', 'w', newline='\n') as csvFile:
    writer = csv.writer(csvFile)

    for row in excelData:
        writer.writerow(row)