import json
import csv
import pandas as pd

INFILE = # name of infile
OUTFILE = # name of outfile

"""Convert a csv file into a JSON file"""
data = pd.read_csv(INFILE, sep=';')
data.to_json(OUTFILE)

f = open(OUTFILE)
data = json.load(f)
f.close()
