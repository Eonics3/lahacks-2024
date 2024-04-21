import os 
from flask import Flask, redirect, request, session, url_for, jsonify
from supabase_py import create_client, Client
from flask_cors import CORS
import pandas as pd
import requests

app = Flask(__name__)
app.secret_key = "your_very_secret_key_here"
# app.secret_key = os.getenv('FLASK_SECRET_KEY')

CORS(app)

# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")
url = "https://wdjsrmpodefhvmxbwfwe.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkanNybXBvZGVmaHZteGJ3ZndlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzU5OTM3NCwiZXhwIjoyMDI5MTc1Mzc0fQ.Lr78ePO9bfg-_8Z4AM4g7S0cPKYWuTJF-XjXGOXTRGE"
supabase: Client = create_client(url, key)

@app.route('/upload', methods=['POST'])
def upload_file():
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
            
        # for sheet_name, df in dfs.items():
            # df_filtered = df.iloc[:, 1:]
            # if df[0]
                
        
        return jsonify({'message': 'File processed', 'data': df.to_json()}), 200
    else:
        return jsonify({'error': 'Unsupported file type'}), 400
    
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv', 'xlsx'}

@app.route('/portal')
def portal():
    print(f"in app.py portal")
    error = request.args.get('error')
    error_description = request.args.get('error_description')
    if error:
        print("OAuth Error:", error)
        print("Error Description:", error_description)
        return f"Error: {error}, Description: {error_description}"
    
    print(f"request: {request}")
    code = request.args.get('code')
    print(f"code: {code}")
    if not code: 
        return 'No Authorization Code Provided', 400
    
    token_url = f"{url}/auth/v1/token"
    token_data = {
        'code': code,
        'client_id': 'your_client_id',
        'client_secret': 'your_client_secret',
        'redirect_uri': 'http://localhost:8080/portal',
        'grant_type': 'authorization_code'
    }
    
    token_response = requests.post(token_url, data=token_data)
    if token_response.status_code != 200:
        return 'Failed to obtain access token', 500
    access_token = token_response.json().get('access_token')
    
    user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
    headers = {'Authorization': f'Bearer {access_token}'}
    user_info_response = requests.get(user_info_url, headers=headers)
    user_info = user_info_response.json()
    email = user_info.get('email')
    
    session['email'] = email
    return redirect(f"http://localhost:3000/portal")

@app.route('/login')
def login():
    print(f"url: {url}")
    print(f"key: {key}")
    print(f"app.secret_key: {app.secret_key}")
    redirect_uri = f"http://127.0.0.1:8080/portal"
    provider = "google"
    
    oauth_url = f"{url}/auth/v1/authorize?provider={provider}&redirect_to={redirect_uri}"
    print(oauth_url)

    return redirect(oauth_url)

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
    