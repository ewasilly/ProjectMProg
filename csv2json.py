import json
import csv
import pandas as pd


"""Convert a csv file into a JSON file"""
data = pd.read_csv('data2.csv')
data.to_json('data.json')

f = open('data.json')
data = json.load(f)
f.close()
