import json
import csv
import pandas as pd

INFILE = 'data/data_bar_new.csv'
OUTFILE = 'data/data_bar_new.json'

"""Convert a csv file into a JSON file"""
df = pd.read_csv(INFILE, sep=';')
df.replace(':', '=')
df.to_json(OUTFILE)


f = open(OUTFILE)
data = json.load(f)
print(data)
f.close()
