import os 
from flask import Flask, redirect, request, session, url_for, jsonify
from supabase_py import create_client, Client
from flask_cors import CORS
import pandas as pd
import requests

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')

CORS(app)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/upload', methods=['POST'])
def upload_file():
    print(f"uploading file")
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        df = None
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        
        # for idx, row in df.iterrows():
            
                
            # app.config[row[0]].append()
            
            # if row[0] == "Stationary Combustion":
            #     print("1")
            
            # elif row[0] == "Mobile Combustion CO2":
            #     print("2")
                
            # elif row[0] == "Mobile Combustion CH4 and N2O for On-Road Gasoline Vehicles":
            #     print("3")
            
            # elif row[0] == "Mobile Combustion CH4 and N2O for On-Road Diesel and Alternative Fuel Vehicles":
            #     print("4")
            
            # elif row[0] == "Mobile Combustion CH4 and N2O for Non-Road Vehicles":
            #     print("5")
            
            # elif row[0] == "Electricity":
            #     print("6")
            
        
            
        na_rows = df.isna().all(axis=1)
        na_indices = df.index[na_rows].tolist()
        
        split_indices = [0] + na_indices + [len(df)]
        
        dfs = []
        
        for start, end in zip(split_indices[:-1], split_indices[1:]):
            sub_df = df.iloc[start:end].dropna(how='all')
            if not sub_df.empty:
                dfs.append(sub_df)

            for i in range(1, len(dfs)):
                dfs[i].columns = dfs[i].iloc[0] 
                dfs[i] = dfs[i][1:]

            for i in range(len(dfs)):
                dfs[i] = dfs[i].dropna(axis=1, how='all')
            
        transformed_dfs = {}
        for df in dfs:
            if not df.empty:
                key = df.iloc[0, 0]
                inner_dict = {col: df[col].tolist() for col in df.columns[1:]}
                transformed_dfs[key] = inner_dict
                
        # print(f"transformed_dfs: {transformed_dfs}")
        
        return jsonify({'message': 'File processed', 'data': df.to_json()}), 200
    else:
        return jsonify({'error': 'Unsupported file type'}), 400
    
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv', 'xlsx'}

@app.route('/login', methods = ['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # authentication logic here 
    
    expected_username = username 
    expected_password = password 
    
    if username == expected_username and password == expected_password:
        app.config['USERNAME'] = username
        response = supabase.table('users').insert({'email': username, 'password': password}).execute()
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'redirectUrl': 'http://127.0.0.1:3000/portal'
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Login failed'
        })

@app.route('/callback')
def callback():
    print(f"in callback")

    error = request.args.get('error')
    if error:
        print("error in callback")
        return 'Login Failed: ' + error
    
    session['user'] = supabase.auth.user()
    return 'Login Successful'

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': 'Hello world!',
        'people': ['Jack', 'Harry', 'Barry']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
    