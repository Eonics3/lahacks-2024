import os 
from flask import Flask, redirect, request, session, url_for, jsonify
from supabase_py import create_client, Client
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/login')
def login():
    redirect_uri = f"http://localhost:8080/callback"
    provider = "google"
    
    
    oauth_url = f"{url}/auth/v1/authorize?provider={provider}&redirect_to={redirect_uri}"

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
    