import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pandas as pd
from supabase_py import create_client, Client
from dotenv import load_dotenv
from calc_emissions import dict_to_data

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
CORS(app)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

global_co2_val, global_co2_dict, global_ch4_val, global_ch4_dict, global_n2o_val, global_n2o_dict = None, None, None, None, None, None

@app.route('/data', methods=['GET'])
def data():
    global global_co2_val, global_co2_dict, global_ch4_val, global_ch4_dict, global_n2o_val, global_n2o_dict
    
    if None in [global_co2_val, global_co2_dict, global_ch4_val, global_ch4_dict, global_n2o_val, global_n2o_dict]:
        return jsonify({'error': 'Data not available'}), 404
    else:
        return jsonify({
            'co2_val': global_co2_val, 
            'co2_dict': global_co2_dict, 
            'ch4_val': global_ch4_val, 
            'ch4_dict': global_ch4_dict, 
            'n2o_val': global_n2o_val, 
            'n2o_dict': global_n2o_dict
        })

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv', 'xlsx'}

@app.route('/upload', methods=['POST'])
def upload_file():
    global global_co2_val, global_co2_dict, global_ch4_val, global_ch4_dict, global_n2o_val, global_n2o_dict
    
    print("uploading file")
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    print(f"file: {file}")
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)

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

        co2_val, co2_dict, ch4_val, ch4_dict, n2o_val, n2o_dict = dict_to_data(transformed_dfs)

        global_co2_val, global_co2_dict, global_ch4_val, global_ch4_dict, global_n2o_val, global_n2o_dict = co2_val, co2_dict, ch4_val, ch4_dict, n2o_val, n2o_dict
        
        return jsonify({'message': 'File processed', 'data': df.to_json(), 'redirectUrl': 'http://localhost:3000/dashboard'}), 200
    else:
        return jsonify({'error': 'Unsupported file type'}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # authentication logic here 
    response = supabase.table('users').select('*').eq('email', username).execute()
    app.config['USERNAME'] = username
    
    print(f"response: {response}")
    if response['data'] == []:
        app.config['USERNAME'] = username
        response = supabase.table('users').insert({'email': username, 'password': password}).execute()
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'redirectUrl': 'http://127.0.0.1:3000/uploadpage'
        })
    
    if password == response['password']:
        app.config['USERNAME'] = username
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'redirectUrl': 'http://127.0.0.1:3000/uploadpage'
        })
    else:
        return jsonify({'success': False, 'message': 'Login failed'})
    
@app.route('/enter', methods = ['POST'])
def enter():
    return jsonify({'success': True, 'redirectUrl': 'http://localhost:3000/signin'})

@app.route('/callback')
def callback():
    print("in callback")
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