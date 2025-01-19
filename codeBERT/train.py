from transformers import RobertaTokenizer
from datasets import Dataset
import pandas as pd

# Load the tokenizer for CodeBERT (pre-trained on code)
tokenizer = RobertaTokenizer.from_pretrained('microsoft/codebert-base')

# Sample data structure for your task (code and time complexity)
data = {
    'code': ['for i in range(n):', 'for i in range(n): for j in range(n):'],
    'time_complexity': ['O(n)', 'O(n^2)']
}

# Convert into a pandas DataFrame (or load from your own source)
df = pd.DataFrame(data)

# Convert into Hugging Face Dataset
dataset = Dataset.from_pandas(df)

# Tokenizing function
def tokenize_function(examples):
    return tokenizer(examples['code'], truncation=True, padding='max_length', max_length=512)

# Tokenize the code column
tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Check the tokenized data
print(tokenized_datasets[0])
