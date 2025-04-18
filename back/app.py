from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import jwt
import datetime
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)  # ✅ Initialize Flask
CORS(app, supports_credentials=True)  # ✅ Enable CORS for frontend access

app.config['SECRET_KEY'] = 'Anaswara'  # ✅ Secret key for JWT

# ✅ Database Configuration
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "anaswara638@",  # Change if needed
    "database": "travel",
    "cursorclass": pymysql.cursors.DictCursor  # ✅ Ensure dictionary cursor
}

# ✅ Function to connect to database
def get_db_connection():
    try:
        return pymysql.connect(**DB_CONFIG)
    except Exception as e:
        print(f"Database Connection Error: {e}")
        return None

# ✅ Token Authentication Middleware
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            bearer = request.headers['Authorization']
            if bearer.startswith('Bearer '):
                token = bearer.replace('Bearer ', '')

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(current_user_id, *args, **kwargs)
    return decorated

# ✅ User Registration
@app.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")

        if not name or not email or not phone or not password:
            return jsonify({"message": "Missing name, email, phone, or password"}), 400

        hashed_password = generate_password_hash(password)  # ✅ Fixed password hashing

        conn = get_db_connection()
        if conn is None:
            return jsonify({"message": "Database connection failed"}), 500

        cursor = conn.cursor()

        # ✅ Check if email or phone already exists
        cursor.execute("SELECT * FROM users WHERE email = %s OR phone = %s", (email, phone))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({"message": "Email or phone number already registered"}), 409

        # ✅ Insert user into database
        cursor.execute("""
            INSERT INTO users (name, email, phone, password, created_at, updated_at, is_blocked)
            VALUES (%s, %s, %s, %s, NOW(), NOW(), FALSE)
        """, (name, email, phone, hashed_password))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"message": "Registration failed", "error": str(e)}), 500

# ✅ User Login with JWT Token
@app.route('/userLogin', methods=['POST'])
def user_login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Missing email or password"}), 400

        conn = get_db_connection()
        if conn is None:
            return jsonify({"message": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("SELECT user_id, password FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if not user or not check_password_hash(user['password'], password):
            return jsonify({"message": "Invalid credentials"}), 401

        # ✅ Generate JWT Token
        token = jwt.encode({
            'user_id': user['user_id'],
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=2)  # ✅ Fixed datetime
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({"token": token, "user_id": user['user_id']}), 200

    except Exception as e:
        return jsonify({"message": "Login failed", "error": str(e)}), 500
    
    

# eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee


# New endpoint for destination planning
@app.route('/plan-destination', methods=['POST'])
@token_required
def plan_destination(current_user_id):
    try:
        data = request.get_json()
        location = data.get('location')
        type_ = data.get('type')
        budget = data.get('budget')
        climate = data.get('climate')

        if not all([location, type_, budget, climate]):
            return jsonify({"message": "All fields are required"}), 400

        conn = get_db_connection()
        if conn is None:
            return jsonify({"message": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO destination_plans (user_id, location, type, budget, climate, created_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """, (current_user_id, location, type_, budget, climate))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Destination plan saved successfully", "success": True}), 201

    except Exception as e:
        return jsonify({"message": "Failed to save destination plan", "error": str(e), "success": False}), 500



# ✅ Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
