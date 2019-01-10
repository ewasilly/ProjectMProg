import json
import csv
import pandas as pd

INFILE = 'data_pie_bar.csv'
OUTFILE = 'data_pie_bar.json'

"""Convert a csv file into a JSON file"""
df = pd.read_csv(INFILE, sep=';')
#df = df.apply(lambda x: x.str.replace(':','-') if type(x) is str else x)
df.to_csv('csv_check.csv')

df.to_json(OUTFILE)

f = open(OUTFILE)
data = json.load(f)
f.close()
