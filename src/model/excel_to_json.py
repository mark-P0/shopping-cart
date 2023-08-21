import pandas as pd


EXCEL_PATH = ''

pd.read_excel(EXCEL_PATH).to_json('./data.json', orient='records')
