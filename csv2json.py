import json
import csv
import pandas as pd

INFILE = 'data_pie_bar.csv'
OUTFILE = 'data_pie_bar.json'

"""Convert a csv file into a JSON file"""
df = pd.read_csv(INFILE, sep=';')
df.replace(':', '=')
df.to_json(OUTFILE)


f = open(OUTFILE)
data = json.load(f)
print(data)
f.close()
