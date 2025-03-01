from flask import make_response, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from app.models import users_collection
from app.utils.mail import send_reset_email
import secrets
from app.routes import auth_routes
from datetime import datetime , timedelta , time
from datetime import datetime, timedelta, timezone
from app.utils.security import  *
from flask_jwt_extended import jwt_required, get_jwt_identity

# User Registration
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not is_valid_email(data["email"]):
        return jsonify({"msg": "Invalid email format"}), 400

    if not is_strong_password(data["password"]):
        return jsonify({"msg": "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character"}), 400

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"msg": "Email already registered"}), 409
    
    hashed_password = generate_hash_password(data["password"])

    new_user = {
        "full_name": data["full_name"],
        "email": data["email"],
        "username": data["username"],
        "password": hashed_password,
        "test_results": {},  
        "chatbot_preference": None
    }

    users_collection.insert_one(new_user)
    return jsonify({"msg": "User registered successfully"}), 201

# User Login
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = users_collection.find_one({"email": data["email"]})
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    if user.get("failed_attempts", 0) >= 5:
        return jsonify({"msg": "Account locked due to multiple failed login attempts. Try again later."}), 403
    


    if verify_password(data["password"], user["password"]):

        users_collection.update_one({"email": user["email"]}, {"$set": {"failed_attempts": 0}})
        access_token = generate_token(user["email"])

        response = make_response(jsonify({"msg": "Login successful" , "access_token" : access_token}) , 200)
        response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="Strict")

        return response
    
    
    users_collection.update_one({"email": user["email"]}, {"$inc": {"failed_attempts": 1}})
    return jsonify({"msg": "Incorrect password"}), 401

# Forgot Password
@auth_routes.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    user = users_collection.find_one({"email": data["email"]})

    if not user:
        return jsonify({"msg": "User not found"}), 404

    reset_token = secrets.token_urlsafe(32)
    hashed_reset_token = generate_hash_token(reset_token)
    
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=10) 


    # Store reset token and expiry time
    users_collection.update_one(
        {"email": data["email"]},
        {"$set": {"reset_token": hashed_reset_token, "reset_token_expiry": expiration_time}}
    )

    send_reset_email(data["email"], reset_token)
    return jsonify({"msg": "Password reset email sent"}), 200


@auth_routes.route("/reset-password/<token>", methods=["POST"])
# @jwt_required
def reset_password(token):
    # current_user = get_jwt_identity()
    hashed_token = generate_hash_token(token)
    data = request.get_json()
    user = users_collection.find_one({"reset_token": hashed_token})

    if not user:
        return jsonify({"msg": "Invalid or expired token"}), 400

    if "reset_token_expiry" in user:
        expiry = user["reset_token_expiry"]
        if expiry.tzinfo is None:
            expiry = expiry.replace(tzinfo=timezone.utc)

    if datetime.now(timezone.utc) > expiry:
        return jsonify({"msg": "Token expired"}), 400

    # Hash the new password
    if(is_strong_password(data["new_password"])):
        hashed_password = generate_hash_password(data["new_password"])

        users_collection.update_one(
        {"email": user["email"]},
        {"$set": {"password": hashed_password}, "$unset": {"reset_token": "", "reset_token_expiry": ""}}
    )

        return jsonify({"msg": "Password updated successfully"}), 200
    else:
        return jsonify({"msg": "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character"}), 400

    # Update password and remove reset token
    
