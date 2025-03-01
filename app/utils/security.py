import bcrypt
from flask_jwt_extended import create_access_token, decode_token

# Hash Password
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

# Verify Password
def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password)

# Generate JWT Token
def generate_token(identity):
    return create_access_token(identity=identity)

# Decode JWT Token
def decode_jwt(token):
    return decode_token(token)
