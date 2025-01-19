from transformers import RobertaTokenizer
from datasets import Dataset
import pandas as pd

df = pd.read_csv("training_data.csv")

dataset = Dataset.from_pandas(df)

print(dataset[0])
