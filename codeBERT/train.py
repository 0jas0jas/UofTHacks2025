import datasets
import pandas as pd

from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, pipeline


df = pd.read_csv("training_data.csv")

dataset = datasets.Dataset.from_pandas(df)

print(dataset[0])


tokenizer = AutoTokenizer.from_pretrained("gpt2") 


def preprocess_function(examples):
    # tokenize input code and the output
    inputs = tokenizer(examples['input'], padding="max_length", truncation=True, max_length=512)
 
    outputs = tokenizer(examples['time_complexity'] + " " + examples['space_complexity'], padding="max_length", truncation=True, max_length=128)

    return {'input_ids': inputs['input_ids'], 'attention_mask': inputs['attention_mask'], 'labels': outputs['input_ids']}

# apply preprocessing
tokenized_datasets = dataset.map(preprocess_function, batched=True)


model = AutoModelForCausalLM.from_pretrained("gpt2")  



training_args = TrainingArguments(
    output_dir='./results',         
    evaluation_strategy="epoch",    
    learning_rate=2e-5,             
    per_device_train_batch_size=4,  
    per_device_eval_batch_size=8,   
    num_train_epochs=3,             
    weight_decay=0.01,              
    logging_dir='./logs',           
    logging_steps=10,               
)

from transformers import Trainer, TrainingArguments

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets,  
   # eval_dataset=tokenized_datasets,   
)


trainer.train()




model.save_pretrained('./custom_code_complexity_model')
tokenizer.save_pretrained('./custom_code_complexity_model')





# load the final model and tokenizer
model = AutoModelForCausalLM.from_pretrained('./custom_code_complexity_model')
tokenizer = AutoTokenizer.from_pretrained('./custom_code_complexity_model')

# make pipeline
generator = pipeline('text-generation', model=model, tokenizer=tokenizer)

# test model
input_code = "def factorial(n):\
    if n == 0:\
        return 1\
    else:\
        return n * factorial(n - 1)"

output = generator(input_code, max_length=100)
print(output[0]['generated_text'])