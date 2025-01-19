import json
import csv

#print(data[0].get('codes').get('Python3').get('code')) 

def clean_data(data):
    training_data = []

    for item in data:
        #print('hi')
        # use only trusted data
        if item.get('trustable_time_complexity') == False or item.get('trustable_space_complexity') == False:
            continue
        
        time_complexity = item.get('time_complexity')
        space_complexity = item.get('space_complexity')

        codes = item.get('codes')

        '''
        print(type(codes))
        print(type(codes.get('Python3')))
        print(type(codes.get('Python3').get('code')))
        '''

        if codes is None:
            continue

        python_data = codes.get('Python3')

        if python_data is None:
            continue
            
        python_code  = python_data.get('code')

        if python_code is None:
            continue    
        
        # Check if both time and space complexities are present
        if python_code and time_complexity and space_complexity:
            training_data.append({
                'input': python_code,
                'time_complexity': time_complexity,
                'space_complexity': space_complexity
            })
    
    return training_data

if __name__ == '__main__':
    file_path = 'codeBERT\data.json'
    with open(file_path, 'r') as file:
        data = json.load(file) 

    cleaned_data = clean_data(data)

    with open('training_data.csv', 'w', newline='') as csvfile:
        fieldnames = ['input', 'time_complexity', 'space_complexity']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for entry in cleaned_data:
            try:
                writer.writerow(entry)
            except Exception as e:
                continue
    print('preprocessing running by itself')











'''

from transformers import Trainer, TrainingArguments

training_args = TrainingArguments(
    output_dir='./results',
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,  # The dataset should be in a suitable format
    eval_dataset=eval_dataset,
)

trainer.train()

'''